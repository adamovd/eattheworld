"use client";
import { Recipe } from "@/app/Models/dbTypes";
import { createNewRecipe } from "@/app/Services/recipeServices";
import { countryList } from "@/helpers/country-list";
import { UploadButton } from "@/helpers/uploadthing";
import { ChangeEvent, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSession } from "next-auth/react";

export default function RecipeForm() {
  const { data: session } = useSession();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [uploading, setUploading] = useState(false);
  const defaultOption = "Select a country";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<Recipe>({});

  // Create separate instances for instructions and ingredients
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray<Recipe>({
    //@ts-ignore
    name: "instructions",
    control,
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    try {
      await createNewRecipe(data);
      reset();
    } catch (error) {
      console.error("Error creating new recipe:", error);
    }
  });

  const handleUploadComplete = (res: any[]) => {
    const url = res.map((image) => {
      return image.url;
    });
    setValue("imageUrl", url.toString());
    setUploading(false);
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryValue = e.target.value;

    setSelectedCountry((prevState) => {
      console.log(selectedCountryValue);
      setValue("countryId", selectedCountryValue);
      return selectedCountryValue;
    });
    setValue("countryId", selectedCountry);
    console.log(selectedCountry);
    console.log(session?.user?.id);

    await setValue("userId", session?.user?.id);
  };

  return (
    <section className="flex my-10 mx-10">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name of recipe
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        {...register("title")}
                        placeholder="What's the name of the recipe"
                        id="title"
                        name="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description")}
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    placeholder="Short description of the recipe"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Instructions
                </label>
                {instructionFields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section
                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                        key={field.id}
                      >
                        <input
                          placeholder="Instruction"
                          type="text"
                          {...register(`instructions.${index}` as const, {
                            required: true,
                          })}
                          className={
                            errors?.instructions?.[index]
                              ? "error"
                              : "" +
                                "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeInstruction(index)}
                        >
                          X
                        </button>
                      </section>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() =>
                    appendInstruction({
                      // @ts-ignore
                      instruction: "New instruction content",
                    })
                  }
                >
                  Add more instructions
                </button>

                <div className="col-span-full">
                  <label
                    htmlFor="ingredients"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ingredients
                  </label>
                  {ingredientFields.map((field, index) => {
                    return (
                      <div key={field.id}>
                        <section
                          className="flex rounded-md shadow-sm gap-3 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                          key={field.id}
                        >
                          <input
                            placeholder="Name"
                            type="text"
                            //@ts-ignore
                            {...register(`ingredients.${index}.name` as const, {
                              required: true,
                            })}
                            className={
                              errors?.ingredients?.[index]?.name
                                ? "error"
                                : "" +
                                  "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            }
                          />

                          <input
                            placeholder="Value"
                            type="number"
                            {...register(
                              //@ts-ignore
                              `ingredients.${index}.value` as const,
                              {
                                valueAsNumber: true,
                                required: true,
                              }
                            )}
                            className={
                              errors?.ingredients?.[index]?.value
                                ? "error"
                                : "" +
                                  "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            }
                          />

                          <input
                            placeholder="unit"
                            type="text"
                            //@ts-ignore
                            {...register(`ingredients.${index}.unit` as const, {
                              required: true,
                            })}
                            className={
                              errors?.ingredients?.[index]?.unit
                                ? "error"
                                : "" +
                                  "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            }
                          />
                        </section>
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() =>
                      appendIngredient({ name: "", value: 0, unit: "" })
                    }
                  >
                    Add more ingredients
                  </button>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image
                    </label>
                    <div className="mt-2">
                      <div className="flex sm:max-w-md">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={() => setUploading(true)}
                          onClientUploadComplete={handleUploadComplete}
                          onUploadError={handleUploadError}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Select a country
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled>
                          {defaultOption}
                        </option>
                        {countryList.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading === true}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
