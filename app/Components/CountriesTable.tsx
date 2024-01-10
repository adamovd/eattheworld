"use client";
import { Country } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  deleteCountryById,
  getAllCountries,
} from "../Services/countryServices";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Styles/Components/Buttons";

const CountriesTable = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
      console.log(response);
    });
  }, []);

  return (
    <section className="my-5 w-full h-full overflow-y-scroll">
      <ul
        style={{ width: "80vw", height: "100vh" }}
        role="list"
        className="divide-y w-full max-h-5 pb-10 mb-16 "
      >
        {countries.map((country) => (
          <Link href={`/admin/edit/${country.id}`} key={country.id}>
            <li key={country.id} className="flex justify-around gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <Image
                  className="flex-none h-8 w-12"
                  src={country.flag as string}
                  alt="Image from country"
                  width={0}
                  height={0}
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
              <Button
                bgcolor="--Red"
                textcolor="--Light"
                fontSize="1rem"
                onClick={() => deleteCountryById(country.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default CountriesTable;
