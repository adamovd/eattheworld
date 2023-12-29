import { useEffect, useState, ChangeEvent } from "react";
import { ButtonContainer } from "../Styles/Components/Containers";
import { CategoryButton, CategoryLabel } from "../Styles/Components/Buttons";

const RadioButton = ({
  options,
  onSelect,
}: {
  options: { label: string; value: string }[];
  onSelect: (value: string | null) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value === selectedOption ? null : value);
  };

  useEffect(() => {
    setSelectedOption(null);
  }, [options]);

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
          >
            {option.label}
          </CategoryLabel>
        </div>
      ))}
    </ButtonContainer>
  );
};

export default RadioButton;
