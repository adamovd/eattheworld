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
import { Country, Recipe, Review, User } from "@prisma/client";
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
import { FormTitle, TileTitle } from "@/app/Styles/Components/Fonts";
import PageWrapper from "@/app/Components/PageWrapper";
import { getReviewsOnUser } from "@/app/Services/reviewServices";
import UserAvatar from "@/app/Components/UserAvatar";
import VisitedCountries from "@/app/Components/VisitedCountries";
import { getRecipeById } from "@/app/Services/recipeServices";
import RecipeCard from "@/app/Components/RecipeCard";
import SavedRecipes from "@/app/Components/SavedRecipes";

const UserPage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [countries, setCountries] = useState<Country[]>();
  const [visitedCountries, setVisitedCountries] = useState<Country[]>();
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const params: params = useParams();
  type params = { slug: string };

  useEffect(() => {
    getUserById(params.slug).then((response: User) => {
      setUser(response);
    });
  }, []);

  useEffect(() => {
    if (user?.likedRecipeIds && user.likedRecipeIds.length > 0) {
      const fetchLikedRecipes = async () => {
        const promises = user.likedRecipeIds.map((recipeId) =>
          getRecipeById(recipeId)
        );
        const fetchedRecipes = await Promise.all(promises);
        setRecipes(fetchedRecipes);
      };

      fetchLikedRecipes();
    }
  }, [user]);

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

  useEffect(() => {
    getReviewsOnUser(user?.id as string).then((response) => {
      setReviews(response);
    });
  }, [user]);

  return (
    <PageWrapper>
      <>
        <SingleContainer>
          <Image
            src={user?.image as string}
            alt={`Profile picture of ${user?.firstname} ${user?.lastname}`}
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
          />

          <p>
            <b>
              {user?.firstname} {""} {user?.lastname}
            </b>
          </p>
          <section
            style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}
          >
            <p>
              <FontAwesomeIcon icon={faLocationDot} /> {user?.nationality}
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
          </section>
          <section
            style={{ width: "70vw", padding: "1rem", textAlign: "center" }}
          >
            <span>{user?.bio}</span>
          </section>
          {session?.user?.id === params.slug ? <LogoutButton /> : null}
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
        <TileContainer>
          <InfoTile>
            <span>Saved recipes</span>
            <TileTitle>{user?.likedRecipeIds?.length}</TileTitle>
          </InfoTile>
          <InfoTile>
            <span>Reviews written</span>
            <TileTitle>{reviews?.length}</TileTitle>
          </InfoTile>
        </TileContainer>
        <SingleContainer style={{ marginTop: 0 }}>
          <FormTitle>Visited countries</FormTitle>
          {visitedCountries ? (
            <VisitedCountries countries={visitedCountries} />
          ) : null}
        </SingleContainer>
        <SingleContainer style={{ marginTop: 0 }}>
          <FormTitle>Saved recipes</FormTitle>
          {recipes ? <SavedRecipes recipes={recipes} /> : null}
        </SingleContainer>
      </>
    </PageWrapper>
  );
};

export default UserPage;
