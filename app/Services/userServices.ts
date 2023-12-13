import { User } from "../Models/dbTypes";

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
