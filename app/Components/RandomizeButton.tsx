import React, { useEffect, useState } from "react";
import { Button } from "../Styles/Components/Buttons";
import { getAllCountries } from "../Services/countryServices";
import { useRouter } from "next/navigation";
import { Country } from "@prisma/client";
import { useSession } from "next-auth/react";
import { addCountryToUser, getAllUsers } from "../Services/userServices";

const RandomizeButton = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country>();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const randomizeCountry = () => {
    setCountry(countries[Math.floor(Math.random() * countries.length)]);
  };

  useEffect(() => {
    if (country) {
      addCountryToUser(session?.user?.id as string, country.id);

      router.push(`/country/${country.id}`);
    }
  }, [country, router]);

  return (
    <Button
      bgcolor="--Yellow"
      textcolor="--Dark"
      fontSize="1rem"
      onClick={randomizeCountry}
    >
      Randomize Country
    </Button>
  );
};

export default RandomizeButton;
