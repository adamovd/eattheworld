import { Country } from "../Models/dbTypes";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/countries"
    : "https://www.eattheworld.se/api/v1/countries";

export const createNewCountry = async (data: Country) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getAllCountries = async () => {
  const response = await fetch(url, {
    cache: "reload",
  });

  return response.json();
};

export const deleteCountryById = async (id: string) => {};
