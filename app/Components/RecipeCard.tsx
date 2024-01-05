import { Recipe } from "../Models/dbTypes";
import { Button } from "../Styles/Components/Buttons";
import {
  RecipeImageContainer,
  RecipeTextContainer,
} from "../Styles/Components/Containers";
import { useRouter } from "next/navigation";

const RecipeCard = ({
  //@ts-ignore
  id,
  title,
  description,
  imageUrl,
  servings,
  time,
  category,
  countryId,
}: Recipe) => {
  const router = useRouter();

  const toCountry = () => {
    router.push(`/country/${countryId}/recipe/${id}`);
  };
  return (
    <>
      <RecipeImageContainer url={imageUrl} />
      <RecipeTextContainer>
        <h2>{title}</h2>
        <section className="flex gap-5">
          <small>Servings: {servings}</small> <small>Time: {time}</small>
        </section>
        <span>{description}</span>
        <section className="flex flex-row-reverse w-full mt-3">
          <Button
            bgcolor={
              //@ts-ignore
              category === "MEAT"
                ? "--Red"
                : //@ts-ignore
                category === "FISH"
                ? "--Blue"
                : "--DarkGreen"
            }
            //@ts-ignore
            textcolor={category === "FISH" ? "--Dark" : "--Light"}
            fontSize="1rem"
            onClick={toCountry}
          >
            Start cooking
          </Button>
        </section>
      </RecipeTextContainer>
    </>
  );
};

export default RecipeCard;
