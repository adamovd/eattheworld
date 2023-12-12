import { Recipe } from "../Models/dbTypes";
import { Ingredient } from "../Models/dbTypes";

const recipeUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/recipes"
    : "https://eattheworld.vercel.app/api/v1/recipes";

const ingredientUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/ingredients"
    : "https://eattheworld.vercel.app/api/v1/ingredients";

export const createNewRecipe = async (data: Recipe) => {
  fetch(recipeUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getAllRecipes = async () => {
  const response = await fetch(recipeUrl, {
    cache: "reload",
  });

  return response.json();
};

export const deleteRecipesById = async (id: string) => {};

export const createNewIngredient = async (data: Ingredient) => {
  fetch(ingredientUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  console.log("Post to " + ingredientUrl + data);
};
