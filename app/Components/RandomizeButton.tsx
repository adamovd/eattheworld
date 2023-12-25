import React, { useEffect, useState } from "react";
import { Button } from "../Styles/Components/Buttons";
import { Country } from "../Models/dbTypes";
import { getAllCountries } from "../Services/countryServices";

const RandomizeButton = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country>();
  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);
  const randomizeCountry = () => {
    setCountry(countries[Math.floor(Math.random() * countries.length)]);
    console.log(country?.name);
  };
  return (
    <Button
      bgColor="--Yellow"
      textColor="--Dark"
      fontSize="1rem"
      onClick={randomizeCountry}
    >
      Randomize Country
    </Button>
  );
};

export default RandomizeButton;
