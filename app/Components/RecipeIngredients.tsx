import { Ingredient } from "@prisma/client";
import { IngredientsList } from "../Styles/Components/Lists";
import { FormTitle } from "../Styles/Components/Fonts";
import {
  RecipeInstructionsContainer,
  TextContainer,
} from "../Styles/Components/Containers";

const RecipeIngredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <RecipeInstructionsContainer>
      <FormTitle>Ingredients</FormTitle>
      {ingredients.map((ingredient, index) => (
        <IngredientsList key={index}>
          {ingredient.value} {ingredient.unit} {ingredient.name}
        </IngredientsList>
      ))}
    </RecipeInstructionsContainer>
  );
};

export default RecipeIngredients;
