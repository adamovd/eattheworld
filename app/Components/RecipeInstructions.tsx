import {
  RecipeInstructionsContainer,
  TextContainer,
} from "../Styles/Components/Containers";
import { FormTitle } from "../Styles/Components/Fonts";
import { InstructionList } from "../Styles/Components/Lists";

const RecipeInstructions = ({ instructions }: { instructions: string[] }) => {
  return (
    <RecipeInstructionsContainer>
      <FormTitle>Instructions</FormTitle>
      {instructions.map((instruction, index) => (
        <InstructionList key={index}>
          {" "}
          <h4>Step {index + 1}</h4> <li>{instruction}</li>
        </InstructionList>
      ))}
    </RecipeInstructionsContainer>
  );
};

export default RecipeInstructions;
