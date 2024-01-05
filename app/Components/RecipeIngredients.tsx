import { Ingredient } from "@prisma/client";
import { IngredientsList } from "../Styles/Components/Lists";
import { FormTitle } from "../Styles/Components/Fonts";

const RecipeIngredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <ul>
      <FormTitle>Ingredients</FormTitle>
      {ingredients.map((ingredient, index) => (
        <IngredientsList key={index}>
          {ingredient.value} {ingredient.unit} {ingredient.name}
        </IngredientsList>
      ))}
    </ul>
  );
};

export default RecipeIngredients;
