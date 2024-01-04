"use client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Country, Recipe } from "@/app/Models/dbTypes";
import { getCountryById } from "@/app/Services/countryServices";
import { TitleCard } from "@/app/Styles/Components/TitleCard";
import {
  ImageContainer,
  InfoContainer,
  TextContainer,
} from "@/app/Styles/Components/Containers";
import { Spotify } from "react-spotify-embed";
import RecipeCard from "@/app/Components/RecipeCard";
import RadioButton from "@/app/Components/RadioButton";
import PageWrapper from "@/app/Components/PageWrapper";

type params = { slug: string };

const PresentCountry = () => {
  const params: params = useParams();
  const [country, setCountry] = useState<Country>();
  const [recipeId, setRecipeId] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [filteredRecipe, setFilteredRecipe] = useState<Recipe | null>(null);
  const categories = [
    {
      label: "Meat",
      value: "MEAT",
    },
    {
      label: "Fish",
      value: "FISH",
    },
    {
      label: "Vegetarian",
      value: "VEGETARIAN",
    },
  ];

  const handleOptionSelect = (value: string | null) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    getCountryById(params.slug).then((country) => setCountry(country));
  }, []);

  useEffect(() => {
    if (selectedOption && country) {
      const filtered = country.recipes.find(
        (recipe) => recipe.category === selectedOption
      );
      setFilteredRecipe(filtered || null);
    } else {
      setFilteredRecipe(null);
    }
  }, [country, selectedOption]);

  useEffect(() => {
    if (!selectedOption && categories.length > 0) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)].value;
      setSelectedOption(randomCategory);
    }
  }, [categories, selectedOption]);

  useMemo(async () => {
    await country?.recipes.map((recipe) => {
      //@ts-ignore
      setRecipeId(recipe.id);
    });
  }, [country]);

  const filteredRecipes = useMemo(() => {
    if (!selectedOption) {
      return country?.recipes || [];
    }

    return (
      country?.recipes.filter((recipe) => {
        return recipe.category === selectedOption;
      }) || []
    );
  }, [country, selectedOption]);

  return (
    <PageWrapper>
      <ImageContainer
        url={country?.imageUrl as string}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 1.5 } }}
        exit={{ opacity: 0, x: 20 }}
      ></ImageContainer>
      <InfoContainer>
        <TitleCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 2 } }}
          exit={{ opacity: 0, x: -20 }}
        >{`Welcome to ${country?.name}`}</TitleCard>
        <TextContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 2.5 } }}
          exit={{ opacity: 0, y: 20 }}
        >
          <span>{country?.description}</span>
        </TextContainer>
        <TextContainer
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 2.5 } }}
          exit={{ opacity: 0, y: -20 }}
        >
          <p>
            <b>Capital:</b> {country?.capital}
          </p>
          <p>
            <b>Population:</b>{" "}
            {country?.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          </p>
          <p>
            <b>Size:</b>{" "}
            {country?.area
              ? country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              : "N/A"}{" "}
            km&sup2;
          </p>

          <p>
            <b>Continent:</b> {country?.continent}
          </p>
        </TextContainer>
      </InfoContainer>
      <InfoContainer style={{ position: "relative" }}>
        <RadioButton options={categories} onSelect={handleOptionSelect} />

        {filteredRecipe && <RecipeCard {...filteredRecipe} />}
      </InfoContainer>
      <InfoContainer>
        {country?.playlistUrl && (
          <Spotify
            style={{ borderRadius: 0 }}
            wide
            link={country?.playlistUrl as string}
          />
        )}
      </InfoContainer>
    </PageWrapper>
  );
};

export default PresentCountry;
