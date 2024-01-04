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

type params = { id: string };

const PresentRecipe = () => {
  const params: params = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  useEffect(() => {
    getRecipe(params.id).then((recipe) => setRecipe(recipe));
  }, []);

  return (
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
            <b>Category:</b> {recipe?.category}
          </p>
          {/* <Link href={recipe?.link as string}>{recipe?.from as string}</Link> */}
        </TextContainer>
      </InfoContainer>
      <InfoContainer className="flex-col">
        <h4>Instructions</h4>
        <RecipeInstructions instructions={recipe?.instructions || []} />
      </InfoContainer>
      <InfoContainer>
        <h4>Ingredients</h4>
        <RecipeIngredients ingredients={recipe?.ingredients || []} />
      </InfoContainer>
    </PageWrapper>
  );
};

export default PresentRecipe;
