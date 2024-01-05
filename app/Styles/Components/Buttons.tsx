import styled from "styled-components";
import { devices } from "../breakpoints";
interface ButtonProps {
  bgcolor: string;
  textcolor: string;
  fontSize: string;
}

export const Button = styled.button<ButtonProps>`
  background: var(${(props: ButtonProps) => props.bgcolor || "--Yellow"});
  color: var(${(props: ButtonProps) => props.textcolor || "--Dark"});
  font-size: 0.8rem;
  display: flex;
  padding: 0.5rem 1rem;
  align-items: flex-start;
  gap: 0.625rem;
  height: 40px;
  width: auto;
  border-radius: 3.125rem;
  box-shadow: 3px 3px 0px 0px var(--Dark);
  font-family: var(--Heading);
  &:hover {
    box-shadow: 5px 5px 0px 0px var(--Dark);
  }
  svg {
    padding-top: 4px;
  }
  div {
    line-height: 2rem;
  }
  @media ${devices.tablet} {
    font-size: 1rem;
  }
`;

export const CategoryButton = styled.input`
  visibility: hidden;
  position: absolute;
`;

export const CategoryLabel = styled.label<ButtonProps>`
  background: var(${(props: ButtonProps) => props.bgcolor || "--Light"});
  color: var(${(props: ButtonProps) => props.textcolor || "--Dark"});
  font-size: ${(props: ButtonProps) => props.fontSize || "1rem"};
  padding: 0.5rem;
  border: 1px solid var(--Dark);
  font-size: 0.8rem;
  cursor: pointer;
  @media ${devices.tablet} {
    font-size: 1rem;
    padding: 1rem;
  }
`;
