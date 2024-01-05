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
import { Button } from "@/app/Styles/Components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type params = { id: string };

const PresentRecipe = () => {
  const params: params = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  useEffect(() => {
    getRecipe(params.id).then((recipe) => setRecipe(recipe));
  }, []);

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
                <Button
                  bgcolor="--LightGreen"
                  textcolor="--Light"
                  fontSize="1rem"
                >
                  Save Recipe <FontAwesomeIcon icon={faHeart} />
                </Button>
              </TextContainer>
            </InfoContainer>
            <InfoContainer>
              <RecipeIngredients ingredients={recipe?.ingredients || []} />

              <RecipeInstructions instructions={recipe?.instructions || []} />
            </InfoContainer>
          </PageWrapper>
        </StyledBody>
      )}
    </>
  );
};

export default PresentRecipe;
