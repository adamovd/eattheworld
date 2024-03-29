import styled from "@emotion/styled";
import { devices } from "../breakpoints";

interface ButtonProps {
  bgcolor: string;
  textcolor: string;
  fontSize: string;
  isselected?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: var(${(props: ButtonProps) => props.bgcolor || "--Yellow"});
  color: var(${(props: ButtonProps) => props.textcolor || "--Dark"});
  font-size: 1rem;
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
  &:disabled {
    box-shadow: none;
    fill-opacity: 0.7;
    background-color: var(--LightGreen);
  }
  svg {
    padding-top: 4px;
  }
  div {
    line-height: 2rem;
  }
  @media ${devices.tablet} {
    font-size: 1.1rem;
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
  display: flex;
  width: fit-content;
  height: 3rem;
  padding: 1rem 1rem 1rem 1rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1rem;
  border: 1px solid var(--Dark);
  box-shadow: 2px 5px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;

  ${(props: ButtonProps) =>
    props.isselected &&
    `
    font-weight: bold;
    text-decoration: underline; 
    border-radius: 2px;
  `}

  @media ${devices.tablet} {
    font-size: 1rem;
    height: 3rem;
    padding: 1rem;
  }
`;
