import { Ingredient } from "@prisma/client";
import { IngredientsList } from "../Styles/Components/Lists";

const RecipeIngredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <>
      <ul>
        {ingredients.map((ingredient, index) => (
          <IngredientsList key={index}>
            {ingredient.value} {ingredient.unit} {ingredient.name}
          </IngredientsList>
        ))}
      </ul>
    </>
  );
};

export default RecipeIngredients;
