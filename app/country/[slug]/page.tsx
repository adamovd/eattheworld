"use client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Country } from "@/app/Models/dbTypes";
import { getCountryById } from "@/app/Services/countryServices";
import Image from "next/image";
import { TitleCard } from "@/app/Styles/Components/TitleCard";
import {
  ImageContainer,
  InfoContainer,
  TextContainer,
} from "@/app/Styles/Components/Containers";
import { Spotify } from "react-spotify-embed";
import { NodeNextResponse } from "next/dist/server/base-http/node";

type params = { slug: string };

const PresentCountry = () => {
  const params: params = useParams();
  const [country, setCountry] = useState<Country>();
  useEffect(() => {
    getCountryById(params.slug).then((country) => setCountry(country));
  }, []);

  return (
    <>
      <ImageContainer url={country?.imageUrl as string}></ImageContainer>
      <InfoContainer>
        <TitleCard>{`Welcome to ${country?.name}`}</TitleCard>
        <TextContainer>
          <span>{country?.description}</span>
        </TextContainer>
        <TextContainer>
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
            {country?.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            km&sup2;
          </p>
          <p>
            <b>Continent:</b> {country?.continent}
          </p>
        </TextContainer>
      </InfoContainer>

      {country?.playlistUrl && (
        <Spotify
          style={{ borderRadius: 0 }}
          wide
          link={country?.playlistUrl as string}
        />
      )}
    </>
  );
};

export default PresentCountry;
