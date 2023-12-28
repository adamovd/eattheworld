import { Country, User } from "../Models/dbTypes";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/register"
    : "https://www.eattheworld.se/api/v1/register";

export const registerNewUser = async (data: User) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getAllUsers = async () => {
  const response = await fetch(url, {
    cache: "reload",
  });

  return response.json();
};

export const addCountryToUser = async (userId: string, countryId: string) => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/v1/users"
      : "https://www.eattheworld.se/api/v1/users";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, countryId }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error("Failed to associate country with user");
  } catch (error) {
    throw new Error(`Could not associate country with user`);
  }
};
