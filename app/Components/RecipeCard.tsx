import { Recipe } from "../Models/dbTypes";
import { Button } from "../Styles/Components/Buttons";
import {
  InfoContainer,
  RecipeImageContainer,
  RecipeTextContainer,
} from "../Styles/Components/Containers";
import { RecipeCategoryCard } from "../Styles/Components/TitleCard";

const RecipeCard = ({
  title,
  description,
  imageUrl,
  servings,
  time,
  category,
}: Recipe) => {
  return (
    <>
      <InfoContainer>
        <RecipeImageContainer url={imageUrl} />
        <RecipeTextContainer>
          <h2>{title}</h2>
          <section className="flex gap-5">
            <small>Servings: {servings}</small> <small>Time: {time}</small>
          </section>
          <span>{description}</span>
          <section className="flex flex-row-reverse w-full mt-3">
            <Button bgColor="--Red" textColor="--Light" fontSize="1rem">
              Start cooking
            </Button>
          </section>
        </RecipeTextContainer>
        <RecipeCategoryCard>{category}</RecipeCategoryCard>
      </InfoContainer>
    </>
  );
};

export default RecipeCard;
