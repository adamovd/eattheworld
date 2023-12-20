import styled from "styled-components";

interface ButtonProps {
  bgColor: string;
  textColor: string;
  fontSize: string;
  isDropdown?: boolean;
  hasArrow?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: var(${(props: ButtonProps) => props.bgColor || "--Yellow"});
  color: var(${(props: ButtonProps) => props.textColor || "--Dark"});
  font-size: ${(props: ButtonProps) => props.fontSize || "1rem"};
  display: flex;
  padding: 0.625rem 1.25rem;
  align-items: flex-start;
  gap: 0.625rem;
  height: 45px;
  width: auto;
  border-radius: 3.125rem;
  box-shadow: 3px 3px 0px 0px var(--Dark);
  font-family: var(--Heading);
  &:hover {
    box-shadow: 5px 5px 0px 0px var(--Dark);
  }
`;
