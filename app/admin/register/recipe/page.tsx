"use client";
import { Country, Recipe } from "@/app/Models/dbTypes";
import { createNewRecipe } from "@/app/Services/recipeServices";
import { countryList } from "@/helpers/country-list";
import { UploadButton } from "@/helpers/uploadthing";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSession } from "next-auth/react";
import { InputField } from "@/app/Styles/Components/InputFields";
import { Button } from "@/app/Styles/Components/Buttons";
import {
  DropdownOption,
  DropdownSelect,
} from "@/app/Styles/Components/Drowdown";
import { getAllCountries } from "@/app/Services/countryServices";

export default function RecipeForm() {
  const { data: session } = useSession();
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const defaultOption = "Select a country";
  const defaultValues = {
    instructions: "Step 1",
    ingredients: [{ name: "", value: 0, unit: "" }],
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<Recipe>();

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

  return (
    <section className="flex my-10 mx-10">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div>
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
                    <div className="flex sm:max-w-md gap-3 mb-5">
                      <InputField
                        {...register("title")}
                        bgColor="--Light"
                        textColor="--Dark"
                        fontSize="1rem"
                        width="350px"
                        placeholder="What's the name of the recipe"
                        id="title"
                        name="title"
                      />
                    </div>
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
                  <DropdownSelect
                    value={selectedCountry}
                    onChange={(e) => {
                      const selectedCountryValue = e.target.value;
                      setSelectedCountry(selectedCountryValue);
                      setValue("countryId", selectedCountryValue); // Update the hidden field value
                    }}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <DropdownOption value="" disabled>
                      {defaultOption}
                    </DropdownOption>
                    {countries.map((country, index) => (
                      <DropdownOption key={index} value={country.name}>
                        {country.name}
                      </DropdownOption>
                    ))}
                  </DropdownSelect>
                </div>
              </div>
              <input
                type="hidden"
                {...register("countryId")} // Register the field with react-hook-form
                value={selectedCountry} // Assign the value of selectedCountry
              />

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
              <section className="flex sm:max-w-md gap-3">
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Est. Time
                  </label>
                  <div className="mt-2">
                    <div className="flex sm:max-w-md gap-3 mb-5">
                      <InputField
                        {...register("time")}
                        bgColor="--Light"
                        textColor="--Dark"
                        fontSize="1rem"
                        width="350px"
                        placeholder="Time to make"
                        id="time"
                        name="time"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="servings"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No of servings
                  </label>
                  <div className="mt-2">
                    <div className="flex sm:max-w-md gap-3 mb-5">
                      <InputField
                        {...register("servings")}
                        bgColor="--Light"
                        textColor="--Dark"
                        fontSize="1rem"
                        width="350px"
                        placeholder="No of portions"
                        id="servings"
                        name="servings"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <div className="col-span-full">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-3"
                >
                  Instructions
                </label>
                {instructionFields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section
                        className="flex sm:max-w-md gap-3"
                        key={field.id}
                      >
                        <InputField
                          bgColor="--Light"
                          textColor="--Dark"
                          fontSize="1rem"
                          width="50vw"
                          placeholder="Instruction"
                          type="text"
                          {...register(`instructions.${index}` as const, {
                            required: true,
                          })}
                          className={
                            errors?.instructions?.[index] ? "error" : "mb-5"
                          }
                        />
                        <Button
                          bgColor="--Red"
                          textColor="--Light"
                          fontSize="1rem"
                          type="button"
                          onClick={() => removeInstruction(index)}
                        >
                          X
                        </Button>
                      </section>
                    </div>
                  );
                })}
                <Button
                  bgColor="--DarkGreen"
                  textColor="--Light"
                  fontSize="1rem"
                  type="button"
                  onClick={() =>
                    appendInstruction(
                      // @ts-ignore
                      "New instruction"
                    )
                  }
                >
                  Add more instructions
                </Button>

                <div className="col-span-full">
                  <label
                    htmlFor="ingredients"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-3"
                  >
                    Ingredients
                  </label>
                  {ingredientFields.map((field, index) => {
                    return (
                      <div key={field.id}>
                        <section
                          className="flex sm:max-w-md gap-2 mb-5"
                          key={field.id}
                        >
                          <InputField
                            bgColor="--Light"
                            textColor="--Dark"
                            fontSize="1rem"
                            width="20vw"
                            placeholder="Name"
                            type="text"
                            //@ts-ignore
                            {...register(`ingredients.${index}.name` as const, {
                              required: true,
                            })}
                            className={
                              errors?.ingredients?.[index]?.name ? "error" : ""
                            }
                          />

                          <InputField
                            bgColor="--Light"
                            textColor="--Dark"
                            fontSize="1rem"
                            width="5vw"
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
                              errors?.ingredients?.[index]?.value ? "error" : ""
                            }
                          />

                          <InputField
                            bgColor="--Light"
                            textColor="--Dark"
                            fontSize="1rem"
                            width="5vw"
                            placeholder="unit"
                            type="text"
                            //@ts-ignore
                            {...register(`ingredients.${index}.unit` as const, {
                              required: true,
                            })}
                            className={
                              errors?.ingredients?.[index]?.unit ? "error" : ""
                            }
                          />
                          <Button
                            bgColor="--Red"
                            textColor="--Light"
                            fontSize="1rem"
                            type="button"
                            onClick={() => removeIngredient(index)}
                          >
                            X
                          </Button>
                        </section>
                      </div>
                    );
                  })}
                  <Button
                    bgColor="--DarkGreen"
                    textColor="--Light"
                    fontSize="1rem"
                    type="button"
                    onClick={() =>
                      appendIngredient({ name: "", value: 0, unit: "" })
                    }
                  >
                    Add more ingredients
                  </Button>
                  <div className="sm:col-span-4 mt-5">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image
                    </label>
                    <div className="mt-2">
                      <div className="flex sm:max-w-md mb-5">
                        <Button
                          bgColor="--Yellow"
                          textColor="--Light"
                          fontSize="1rem"
                          type="button"
                        >
                          <UploadButton
                            endpoint="imageUploader"
                            onUploadBegin={() => setUploading(true)}
                            onClientUploadComplete={handleUploadComplete}
                            onUploadError={handleUploadError}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    bgColor="--DarkGreen"
                    textColor="--Light"
                    fontSize="1rem"
                    type="submit"
                    disabled={uploading === true}
                    className="mt-5"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
