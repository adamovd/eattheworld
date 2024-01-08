import { Country, User } from "../Models/dbTypes";

const registerUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/register"
    : "https://www.eattheworld.se/api/v1/register";

const userUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/users"
    : "https://www.eattheworld.se/api/v1/users";

export const registerNewUser = async (data: User) => {
  fetch(registerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getAllUsers = async () => {
  const response = await fetch(registerUrl, {
    cache: "reload",
  });

  return response.json();
};

export const addCountryToUser = async (userId: string, countryId: string) => {
  try {
    const response = await fetch(userUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, countryId }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(`Could not associate country with user`);
  }
};

export const getUserById = async (id: string) => {
  const response = await fetch(`${userUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user by ID");
  }

  return response.json();
};

export const addRecipeToUser = async (userId: string, recipeId: string) => {
  try {
    const response = await fetch(`${userUrl}/${userId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(`Could not associate recipe with user`);
  }
};
