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

export const getRecipe = async (id: string) => {
  const url = `${recipeUrl}?id=${encodeURIComponent(id)}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "reload",
  });

  return response.json();
};

export const getRecipeById = async (id: string) => {
  const response = await fetch(`${recipeUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe by ID");
  }

  return response.json();
};

export const deleteRecipesById = async (id: string) => {};
