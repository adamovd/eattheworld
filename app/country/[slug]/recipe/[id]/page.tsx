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
import { addRecipeToUser } from "@/app/Services/userServices";

type params = { id: string };

const PresentRecipe = () => {
  const params: params = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const { data: session } = useSession();
  const [updateReviews, setReviewUpdate] = useState(false);

  useEffect(() => {
    getRecipe(params.id).then((recipe) => setRecipe(recipe));
  }, []);
  const handleSubmittedReview = () => {
    setReviewUpdate((prev) => !prev);
  };
  const ratings = recipe?.reviews.map((review) => review.rating) || [];
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
      : 0;

  const saveRecipe = async () => {
    await addRecipeToUser(session?.user?.id as string, recipe?.id as string);
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
            <ImageContainer url={recipe?.imageUrl as string}></ImageContainer>
            <InfoContainer>
              <TitleCard>{recipe?.title}</TitleCard>
              <TextContainer>
                <span>{recipe?.description}</span>
              </TextContainer>
              <TextContainer>
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
                  >
                    Save recipe <FontAwesomeIcon icon={faHeart} />
                  </Button>
                ) : (
                  <Link href={`/sign-in`}>Log in to save recipe</Link>
                )}
              </TextContainer>
            </InfoContainer>
            <InfoContainer>
              <RecipeIngredients ingredients={recipe?.ingredients || []} />

              <RecipeInstructions instructions={recipe?.instructions || []} />
            </InfoContainer>
            {session ? (
              <ReviewForm
                userId={session?.user?.id as string}
                recipeId={recipe.id}
                onReviewSubmit={handleSubmittedReview}
              />
            ) : (
              <div>Log in to write a review</div>
            )}
            <PresentReviews
              recipeId={recipe.id}
              updateReviews={updateReviews}
            />
          </PageWrapper>
        </StyledBody>
      )}
    </>
  );
};

export default PresentRecipe;
