"use client";
import { LogoutButton } from "@/app/Components/Auth";
import UserMap from "@/app/Components/UserMap";
import { getAllCountries } from "@/app/Services/countryServices";
import { getUserById } from "@/app/Services/userServices";
import {
  SingleContainer,
  TileContainer,
} from "@/app/Styles/Components/Containers";
import { InfoTile } from "@/app/Styles/Components/Tiles";
import { Country, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import getDistanceFromLatLonInKm from "@/helpers/calculate-distance";
import { TileTitle } from "@/app/Styles/Components/Fonts";
import { url } from "inspector";
import PageWrapper from "@/app/Components/PageWrapper";

const UserPage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [countries, setCountries] = useState<Country[]>();
  const [visitedCountries, setVisitedCountries] = useState<Country[]>();
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const params: params = useParams();
  type params = { slug: string };

  useEffect(() => {
    getUserById(params.slug).then((response: User) => {
      setUser(response);
    });
  }, []);

  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    if (countries && user) {
      const visited = countries.filter((country) =>
        user.countryIDs.includes(country.id)
      );
      setVisitedCountries(visited);
    }
  }, [countries, user]);
  useEffect(() => {
    // Calculate total distance when visitedCountries or user coordinates change
    if (visitedCountries && user) {
      let total = 0;
      const userLat = user.lat as number;
      const userLng = user.lng as number;

      visitedCountries.forEach((country) => {
        const countryLat = country.lat as number;
        const countryLng = country.lng as number;
        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLng,
          countryLat,
          countryLng
        );
        total += distance;
      });

      setTotalDistance(total);
    }
  }, [visitedCountries, user]);

  return (
    <PageWrapper>
      {session?.user?.id === params.slug ? (
        <>
          <SingleContainer>
            <Image
              style={{ borderRadius: 50, maxHeight: 100, objectFit: "cover" }}
              src={user?.image as string}
              width={100}
              height={100}
              alt={user?.firstname as string}
            />
            <p>
              {user?.firstname} {""} {user?.lastname}
            </p>
            <p>
              <FontAwesomeIcon icon={faLocationDot} /> {""} {user?.nationality}
            </p>
            <p>
              <FontAwesomeIcon icon={faCalendarDays} /> {""}Joined{" "}
              {user
                ? format(
                    new Date(user?.createdAt as Date),
                    "MMMM yyyy"
                  ).toString()
                : null}
            </p>
          </SingleContainer>
          <SingleContainer>
            {visitedCountries && <UserMap countries={visitedCountries} />}
          </SingleContainer>
          <TileContainer>
            <InfoTile>
              <span>Countries visited</span>
              <TileTitle>{user?.countryIDs?.length}</TileTitle>
            </InfoTile>
            <InfoTile>
              <span>Distance travelled</span>
              <TileTitle>{totalDistance.toFixed(0)} km</TileTitle>
            </InfoTile>
          </TileContainer>
          <LogoutButton />
        </>
      ) : null}
    </PageWrapper>
  );
};

export default UserPage;
