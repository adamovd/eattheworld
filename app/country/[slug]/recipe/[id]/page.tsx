"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Recipe } from "@/app/Models/dbTypes";
import { TitleCard } from "@/app/Styles/Components/TitleCard";
import {
  ImageContainer,
  InfoContainer,
  TextContainer,
} from "@/app/Styles/Components/Containers";
import { getRecipe } from "@/app/Services/recipeServices";
import RecipeInstructions from "@/app/Components/RecipeInstructions";
import RecipeIngredients from "@/app/Components/RecipeIngredients";
import Link from "next/link";
import PageWrapper from "@/app/Components/PageWrapper";
import { StyledBody } from "@/app/Styles/Components/Body";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import ReviewForm from "@/app/Components/ReviewForm";
import { useSession } from "next-auth/react";
import PresentReviews from "@/app/Components/PresentReviews";
import { Button } from "@/app/Styles/Components/Buttons";
import { addRecipeToUser, getUserById } from "@/app/Services/userServices";
import { User } from "@prisma/client";
import { LoadingContainer } from "@/app/Styles/Components/LoadingContainer";
import Image from "next/image";

type params = { id: string };

const PresentRecipe = () => {
  const params: params = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const { data: session } = useSession();
  const [updateReviews, setReviewUpdate] = useState(false);
  const [user, setUser] = useState<User>();
  const [recipeSaved, setRecipeSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipe(params.id).then((recipe) => {
      setRecipe(recipe);
      setLoading(false);
    });
  }, []);
  const handleSubmittedReview = () => {
    setReviewUpdate((prev) => !prev);
  };
  const ratings = recipe?.reviews.map((review) => review.rating) || [];
  const averageRating =
    ratings.length > 0
      ? Math.round(
          ratings.reduce((total, rating) => total + rating, 0) / ratings.length
        )
      : 0;

  useEffect(() => {
    if (session) {
      getUserById(session?.user?.id as string).then((response) => {
        setUser(response);
      });
    }
  }, [session]);

  useEffect(() => {
    if (user?.likedRecipeIds?.includes(recipe?.id as string)) {
      setRecipeSaved(true);
    }
  }, [user]);

  const saveRecipe = async () => {
    if (recipeSaved === false) {
      await addRecipeToUser(session?.user?.id as string, recipe?.id as string);
      setRecipeSaved(true);
    } else {
      console.log("Recipe already saved");
    }
  };

  return (
    <>
      {recipe && (
        <StyledBody
          bgcolor={
            //@ts-ignore
            recipe.category === "MEAT"
              ? "--Red"
              : //@ts-ignore
              recipe.category === "FISH"
              ? "--Blue"
              : "--DarkGreen"
          }
        >
          <PageWrapper>
            {loading ? (
              <LoadingContainer>
                <Image
                  src="https://utfs.io/f/6eedf646-a7bf-42a7-be22-f6c7ca634338-1zbfv.svg"
                  width={100}
                  height={100}
                  alt="Logo"
                />
              </LoadingContainer>
            ) : (
              <>
                <ImageContainer
                  url={recipe?.imageUrl as string}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 1.5 } }}
                  exit={{ opacity: 0, x: -20 }}
                ></ImageContainer>
                <InfoContainer>
                  <TitleCard
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 2 } }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {recipe?.title}
                  </TitleCard>
                  <TextContainer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 2.5 } }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <span>{recipe?.description}</span>
                  </TextContainer>
                  <TextContainer
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 2.5 } }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <p>
                      <b>Cooking time:</b> {recipe?.time}
                    </p>
                    <p>
                      <b>Servings:</b> {recipe?.servings}
                    </p>
                    <p>
                      <b>Recipe from:</b>{" "}
                      {recipe?.link && (
                        <Link href={recipe?.link as string} target="_blank">
                          {recipe?.from as string}
                        </Link>
                      )}
                    </p>
                    <p>
                      <b>Rating:</b> {averageRating}{" "}
                      <FontAwesomeIcon icon={faStar} />
                      <small>({ratings.length})</small>
                    </p>
                    {session ? (
                      <Button
                        bgcolor="--Red"
                        textcolor="--Light"
                        fontSize="1rem"
                        onClick={saveRecipe}
                        disabled={recipeSaved ? true : false}
                      >
                        {recipeSaved ? "Recipe saved" : "Save recipe"}
                        <FontAwesomeIcon icon={faHeart} />
                      </Button>
                    ) : (
                      <Link href={`/sign-in`}>Log in to save recipe</Link>
                    )}
                  </TextContainer>
                </InfoContainer>
                <InfoContainer>
                  <RecipeIngredients ingredients={recipe?.ingredients || []} />

                  <RecipeInstructions
                    instructions={recipe?.instructions || []}
                  />
                </InfoContainer>
                {session ? (
                  <ReviewForm
                    userId={session?.user?.id as string}
                    recipeId={recipe.id}
                    onReviewSubmit={handleSubmittedReview}
                  />
                ) : (
                  <Link href={`/sign-in`}>
                    <h4>Log in to write a review</h4>
                  </Link>
                )}
                <PresentReviews
                  recipeId={recipe.id}
                  updateReviews={updateReviews}
                />
              </>
            )}
          </PageWrapper>
        </StyledBody>
      )}
    </>
  );
};

export default PresentRecipe;
