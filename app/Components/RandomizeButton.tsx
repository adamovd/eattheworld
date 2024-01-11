import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../Styles/Components/Buttons";
import { getAllCountries } from "../Services/countryServices";
import { useRouter } from "next/navigation";
import { Country, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { addCountryToUser, getUserById } from "../Services/userServices";

const RandomizeButton = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [userCountries, setUserCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country>();
  const [user, setUser] = useState<User>();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    if (session) {
      getUserById(session?.user?.id as string).then((response) => {
        setUser(response);
      });
    }
  }, [session]);

  useMemo(() => {
    if (user?.countryIDs && user.countryIDs.length > 0) {
      const filteredCountries = countries.filter(
        (country) => !user.countryIDs.includes(country.id)
      );
      setUserCountries(filteredCountries);
    } else {
      setUserCountries(countries);
    }
  }, [user, countries]);

  const randomizeCountry = () => {
    if (session) {
      setCountry(
        userCountries[Math.floor(Math.random() * userCountries.length)]
      );
    } else {
      setCountry(countries[Math.floor(Math.random() * countries.length)]);
    }
  };

  useEffect(() => {
    if (country) {
      addCountryToUser(session?.user?.id as string, country.id);
      router.push(`/country/${country.id}`);
    }
  }, [country, session, router]);

  return (
    <Button
      bgcolor="--Light"
      textcolor="--Dark"
      fontSize="1rem"
      onClick={randomizeCountry}
    >
      Randomize Country
    </Button>
  );
};

export default RandomizeButton;
