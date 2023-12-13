"use client";
import { Country } from "@prisma/client";
import { useState, useEffect } from "react";
import { getAllCountries } from "../Services/countryServices";
import Image from "next/image";
import { format } from "date-fns";

const CountriesTable = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
      console.log(response);
    });
  }, []);
  return (
    <section className="my-10 mx-10">
      <h2>Added countries</h2>
      <ul role="list" className="divide-y divide-gray-100 max-h-5">
        {countries.map((country) => (
          <li key={country.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={country.imageUrl}
                alt="Image from country"
                width={100}
                height={100}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {country.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  ID: {country.id}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Created:{" "}
                {format(
                  new Date(country.createdAt),
                  "dd/MM/yyyy - HH:mm"
                ).toString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CountriesTable;
