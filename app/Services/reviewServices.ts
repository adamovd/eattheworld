import { Review } from "../Models/dbTypes";
const reviewUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/reviews"
    : "https://www.eattheworld.se/api/v1/reviews";

export const createNewReview = async (
  data: Review,
  userId: string,
  recipeId: string
) => {
  try {
    const response = await fetch(reviewUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, userId, recipeId }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(`Could not create new review`);
  }
};

export const getReviewsOnRecipe = async (id: string) => {
  const url = `${reviewUrl}?id=${encodeURIComponent(id)}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "reload",
  });

  return response.json();
};
export const getReviewsOnUser = async (id: string) => {
  const url = `${reviewUrl}/user/${id}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "reload",
  });

  return response.json();
};
