import { Recipe } from "@prisma/client";
import React from "react";
import { CountryList } from "../Styles/Components/Lists";
import Link from "next/link";
import Image from "next/image";

const SavedRecipes = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <ul>
      {recipes.map((recipe, index) => (
        <Link
          key={index}
          href={`/country/${recipe.countryId}/recipe/${recipe.id}`}
        >
          <CountryList>
            <section>
              <h2>{recipe.title}</h2>
            </section>
          </CountryList>
        </Link>
      ))}
    </ul>
  );
};

export default SavedRecipes;
