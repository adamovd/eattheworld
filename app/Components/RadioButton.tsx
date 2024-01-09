import { useEffect, useState, ChangeEvent } from "react";
import { ButtonContainer } from "../Styles/Components/Containers";
import { CategoryButton, CategoryLabel } from "../Styles/Components/Buttons";

const RadioButton = ({
  options,
  onSelect,
  initialSelectedOption,
}: {
  options: { label: any; value: any }[];
  onSelect: (value: any | null) => void;
  initialSelectedOption: string | null;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    initialSelectedOption
  );

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value === selectedOption ? null : value);
  };

  useEffect(() => {
    onSelect(selectedOption);
  }, [selectedOption, onSelect]);

  useEffect(() => {
    setSelectedOption(initialSelectedOption);
  }, [initialSelectedOption]);

  return (
    <ButtonContainer>
      {options.map((option) => (
        <div key={option.value}>
          <CategoryButton
            type="radio"
            id={option.value}
            name="dynamicRadio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
          <CategoryLabel
            bgcolor={
              option.value === "MEAT"
                ? "--Red"
                : option.value === "FISH"
                ? "--Blue"
                : "--DarkGreen"
            }
            textcolor={option.value === "FISH" ? "--Dark" : "--Light"}
            fontSize="1rem"
            htmlFor={option.value}
            isselected={selectedOption === option.value}
          >
            {option.label}
          </CategoryLabel>
        </div>
      ))}
    </ButtonContainer>
  );
};

export default RadioButton;
