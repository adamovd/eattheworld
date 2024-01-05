import { FormTitle } from "../Styles/Components/Fonts";
import { InstructionList } from "../Styles/Components/Lists";

const RecipeInstructions = ({ instructions }: { instructions: string[] }) => {
  return (
    <ol>
      <FormTitle>Instructions</FormTitle>
      {instructions.map((instruction, index) => (
        <InstructionList key={index}>
          {" "}
          <h4>Step {index + 1}</h4> <li>{instruction}</li>
        </InstructionList>
      ))}
    </ol>
  );
};

export default RecipeInstructions;
