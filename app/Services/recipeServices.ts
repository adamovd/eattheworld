import { Recipe } from "../Models/dbTypes";

const recipeUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/recipes"
    : "https://www.eattheworld.se/api/v1/recipes";

export const createNewRecipe = async (data: Recipe) => {
  fetch(recipeUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getRecipe = async (id: number) => {
  const response = await fetch(recipeUrl, {
    body: JSON.stringify(id),
    cache: "reload",
  });

  return response.json();
};

export const deleteRecipesById = async (id: string) => {};
