"use client";
import { Country, Diet, Recipe } from "@/app/Models/dbTypes";
import { createNewRecipe } from "@/app/Services/recipeServices";
import { countryList } from "@/helpers/country-list";
import { UploadButton } from "@/helpers/uploadthing";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSession } from "next-auth/react";
import {
  InputContainer,
  InputField,
  InputLabel,
  RecipeFieldContainer,
  RecipeInput,
  TextArea,
} from "@/app/Styles/Components/InputFields";
import { Button } from "@/app/Styles/Components/Buttons";
import {
  DropdownOption,
  DropdownSelect,
} from "@/app/Styles/Components/Dropdown";
import { getAllCountries } from "@/app/Services/countryServices";
import Custom403 from "@/app/error/403/page";
import { FormContainer } from "@/app/Styles/Components/Containers";
import { FormTitle } from "@/app/Styles/Components/Fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "@/app/Components/PageWrapper";

export default function RecipeForm() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  //@ts-ignore
  const [selectedDiet, setSelectedDiet] = useState<Diet>("");
  const [uploading, setUploading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

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
  if (session?.user?.role === "admin") {
    return (
      <PageWrapper>
        <FormContainer>
          <FormTitle>Register Recipe</FormTitle>
          <form onSubmit={onSubmit}>
            <InputContainer>
              <InputLabel htmlFor="title">Name of recipe</InputLabel>

              <InputField
                {...register("title")}
                bgcolor="--Light"
                textcolor="--Dark"
                fontSize="1rem"
                placeholder="What's the name of the recipe"
                id="title"
                name="title"
              />
            </InputContainer>

            <InputContainer>
              <InputLabel htmlFor="name">Select a country</InputLabel>
              <DropdownSelect
                value={selectedCountry}
                onChange={(e) => {
                  const selectedCountryValue = e.target.value;
                  setSelectedCountry(selectedCountryValue);
                  setValue("countryId", selectedCountryValue);
                }}
                id="name"
              >
                <DropdownOption value="" disabled>
                  -- Select a country --
                </DropdownOption>
                {countries.map((country, index) => (
                  <DropdownOption key={index} value={country.name}>
                    {country.name}
                  </DropdownOption>
                ))}
              </DropdownSelect>
            </InputContainer>
            <input
              type="hidden"
              {...register("countryId")}
              value={selectedCountry}
            />

            <InputContainer>
              <InputLabel htmlFor="category">Select a diet</InputLabel>
              <DropdownSelect
                value={selectedDiet}
                onChange={(e) => {
                  const selectedDietValue = e.target.value as unknown as Diet;
                  setSelectedDiet(selectedDietValue);
                  setValue("category", selectedDietValue);
                }}
                id="category"
              >
                <DropdownOption value="" disabled>
                  -- Select a diet --
                </DropdownOption>
                {Object.values(Diet).map((diet) => (
                  <DropdownOption key={diet} value={diet}>
                    {diet}
                  </DropdownOption>
                ))}
              </DropdownSelect>
            </InputContainer>

            <InputContainer>
              <InputLabel htmlFor="about">Description</InputLabel>

              <TextArea
                {...register("description")}
                id="description"
                name="description"
                rows={3}
                defaultValue={""}
                placeholder="Short description of the recipe"
              />
            </InputContainer>

            <InputContainer>
              <InputLabel htmlFor="time">Est. Time</InputLabel>

              <InputField
                {...register("time")}
                bgcolor="--Light"
                textcolor="--Dark"
                fontSize="1rem"
                width="350px"
                placeholder="Time to make"
                id="time"
                name="time"
              />
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor="servings">No of servings</InputLabel>

              <InputField
                {...register("servings")}
                bgcolor="--Light"
                textcolor="--Dark"
                fontSize="1rem"
                placeholder="No of portions"
                id="servings"
                name="servings"
              />
            </InputContainer>

            <InputContainer>
              <InputLabel htmlFor="instructions">Instructions</InputLabel>
              {instructionFields.map((field, index) => {
                return (
                  <section className="flex sm:max-w-md gap-3" key={field.id}>
                    <InputField
                      bgcolor="--Light"
                      textcolor="--Dark"
                      fontSize="1rem"
                      placeholder="New instruction"
                      type="text"
                      {...register(`instructions.${index}` as const, {
                        required: true,
                      })}
                      className={
                        errors?.instructions?.[index] ? "error" : "mb-5"
                      }
                    />
                    <Button
                      bgcolor="--Red"
                      textcolor="--Light"
                      fontSize="1rem"
                      type="button"
                      onClick={() => removeInstruction(index)}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </Button>
                  </section>
                );
              })}
              <Button
                bgcolor="--DarkGreen"
                textcolor="--Light"
                fontSize="1rem"
                type="button"
                onClick={() =>
                  appendInstruction(
                    // @ts-ignore
                    ""
                  )
                }
              >
                Add instruction
              </Button>
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor="ingredients">Ingredients</InputLabel>
              {ingredientFields.map((field, index) => {
                return (
                  <RecipeFieldContainer key={field.id}>
                    <RecipeInput
                      placeholder="Name"
                      type="text"
                      {...register(
                        //@ts-ignore
                        `ingredients.${index}.name` as const,
                        {
                          required: true,
                        }
                      )}
                      className={
                        errors?.ingredients?.[index]?.name ? "error" : ""
                      }
                    />

                    <RecipeInput
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

                    <RecipeInput
                      placeholder="unit"
                      type="text"
                      {...register(
                        //@ts-ignore
                        `ingredients.${index}.unit` as const,
                        {
                          required: true,
                        }
                      )}
                      className={
                        errors?.ingredients?.[index]?.unit ? "error" : ""
                      }
                    />
                    <Button
                      bgcolor="--Red"
                      textcolor="--Light"
                      fontSize="1rem"
                      type="button"
                      onClick={() => removeIngredient(index)}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </Button>
                  </RecipeFieldContainer>
                );
              })}
              <Button
                bgcolor="--DarkGreen"
                textcolor="--Light"
                fontSize="1rem"
                type="button"
                onClick={() =>
                  appendIngredient({
                    name: "",
                    value: 0,
                    unit: "",
                    id: "",
                    recipeId: "",
                  })
                }
              >
                Add ingredient
              </Button>
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor="imageUrl">Image</InputLabel>

              <Button
                bgcolor="--Yellow"
                textcolor="--Dark"
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
            </InputContainer>
            <InputContainer>
              <Button
                bgcolor="--DarkGreen"
                textcolor="--Light"
                fontSize="1rem"
                type="submit"
                disabled={uploading === true}
              >
                Save
              </Button>
            </InputContainer>
          </form>
        </FormContainer>
      </PageWrapper>
    );
  } else {
    return <Custom403 />;
  }
}
