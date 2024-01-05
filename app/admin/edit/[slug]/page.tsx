"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Country } from "@/app/Models/dbTypes";
import { getCountryById } from "@/app/Services/countryServices";
import Image from "next/image";

type params = { slug: string };

const EditCountry = () => {
  const params: params = useParams();
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    getCountryById(params.slug).then((country) => setCountry(country));
  }, []);
  return (
    <section className="flex flex-col my-5 mx-10 w-full h-full ">
      <h2>{country?.name}</h2>
      <span>{country?.description}</span>
      <Image
        src={country?.imageUrl as string}
        alt={"An image of" + country?.name}
        height={150}
        width={150}
      />
      <h3>Recipes</h3>
      {country?.recipes.map((recipe) => {
        return (
          <article key={recipe.id}>
            <Image
              src={recipe?.imageUrl as string}
              alt={"An image of" + recipe?.title}
              height={150}
              width={150}
            />
            <h4>{recipe.title}</h4>
            <span>{recipe.description}</span>
            <ol>
              {recipe.instructions.map((instruction, index) => {
                return <li key={index}>{instruction}</li>;
              })}
            </ol>
            <ol>
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <li key={index}>
                    {ingredient.value} {ingredient.unit} {ingredient.name}{" "}
                  </li>
                );
              })}
            </ol>
          </article>
        );
      })}
    </section>
  );
};

export default EditCountry;
