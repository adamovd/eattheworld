"use client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Country, Recipe } from "@/app/Models/dbTypes";
import { getCountryById } from "@/app/Services/countryServices";
import { TitleCard } from "@/app/Styles/Components/TitleCard";
import {
  CountryMap,
  ImageContainer,
  InfoContainer,
  MapContainer,
  SpotifyContainer,
  TextContainer,
} from "@/app/Styles/Components/Containers";
import { Spotify } from "react-spotify-embed";
import RecipeCard from "@/app/Components/RecipeCard";
import RadioButton from "@/app/Components/RadioButton";
import PageWrapper from "@/app/Components/PageWrapper";
import { LoadingContainer } from "@/app/Styles/Components/LoadingContainer";
import getRadioStations from "@/helpers/radio-api";
import { IRadio } from "@/app/Models/IRadio";
import { RadioPlayer } from "@/app/Styles/Components/Radio";
import Flickity from "react-flickity-component";
import Map, { Marker, ViewStateChangeEvent } from "react-map-gl";
import Image from "next/image";

type params = { slug: string };

const PresentCountry = () => {
  const params: params = useParams();
  const [country, setCountry] = useState<Country>();
  const [recipeId, setRecipeId] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [filteredRecipe, setFilteredRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [radioStations, setRadioStations] = useState<IRadio[]>();
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
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getCountryById(params.slug).then((country) => {
      setCountry(country);
    });
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

  // useEffect(() => {
  //   getRadioStations(country?.name as string).then((response) => {
  //     console.log(response);
  //     setRadioStations(response);
  //   });
  // }, [country]);

  // const Carousel = () => {
  //   if (radioStations !== undefined && radioStations?.length > 0) {
  //     return (
  //       <Flickity
  //         className={"carousel"} // default ''
  //         elementType={"section"} // default 'div'
  //         disableImagesLoaded={false} // default false
  //         reloadOnUpdate // default false
  //         static // default false
  //       >
  //         {radioStations?.map((station, index) => (
  //           <RadioPlayer key={index}>
  //             <p>{station.name}</p>
  //             <audio controls>
  //               <source src={station.url_resolved} type="audio/mp3" />
  //               <p>{station.name}</p>
  //             </audio>
  //           </RadioPlayer>
  //         ))}
  //       </Flickity>
  //     );
  //   }
  // };

  return (
    <>
      <PageWrapper>
        {loading ? (
          <LoadingContainer />
        ) : (
          <>
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
                    ? country.area
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : "N/A"}{" "}
                  km&sup2;
                </p>

                <p>
                  <b>Continent:</b> {country?.continent}
                </p>
              </TextContainer>
            </InfoContainer>
            <InfoContainer
              style={{ position: "relative" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 3 } }}
              exit={{ opacity: 0, y: 30 }}
            >
              <RadioButton options={categories} onSelect={handleOptionSelect} />

              {filteredRecipe && <RecipeCard {...filteredRecipe} />}
            </InfoContainer>
            <InfoContainer style={{ borderBottom: 0 }}>
              <CountryMap>
                <Map
                  initialViewState={{
                    longitude: country?.lng,
                    latitude: country?.lat,
                    zoom: 4,
                  }}
                  mapboxAccessToken="pk.eyJ1IjoiYWRtb3ZkIiwiYSI6ImNscXc1ZHdqazNzdDEyanA5NHAybnp2cGEifQ.2PO4qpYX1CYEYqUawGcioQ"
                  mapStyle="mapbox://styles/admovd/clr65ygz801id01qr8tyycw4f"
                  minZoom={2}
                  style={{ borderRight: 1 }}
                />
              </CountryMap>
              <SpotifyContainer>
                {country?.playlistUrl && (
                  <Spotify link={country?.playlistUrl as string} />
                )}
              </SpotifyContainer>
            </InfoContainer>
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default PresentCountry;
