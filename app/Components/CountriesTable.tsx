"use client";
import { Country } from "@prisma/client";
import { useState, useEffect } from "react";
import { getAllCountries } from "../Services/countryServices";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

const CountriesTable = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
      console.log(response);
    });
  }, []);
  return (
    <section className="my-5 mx-5 h-full overflow-y-scroll">
      <ul role="list" className="divide-y divide-gray-100 max-h-5 pb-10 mb-16 ">
        {countries.map((country) => (
          <Link href={`/admin/edit/${country.id}`} key={country.id}>
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
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default CountriesTable;
