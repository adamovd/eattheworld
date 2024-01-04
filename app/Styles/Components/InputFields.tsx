import styled from "styled-components";
import { devices } from "../breakpoints";

interface InputProps {
  bgcolor: string;
  textcolor: string;
  fontSize: string;
}

export const InputContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
`;

export const InputLabel = styled.label`
  display: block;
  line-height: 1.5rem;
  font-weight: 500;
`;

export const InputField = styled.input<InputProps>`
  display: flex;
  height: 40px;
  width: 250px;
  padding: 0.5625rem 0.625rem 0.375rem 0.9375rem;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1.25rem;
  background: var(${(props: InputProps) => props.bgcolor || "--Light"});
  color: var(${(props: InputProps) => props.textcolor || "--Dark"});
  font-family: var(--Heading);
  font-size: ${(props: InputProps) => props.fontSize || "1rem"};
  border: 1px solid var(--Dark);
  box-shadow: 2px 4px 0px 0px var(--Dark);
  &:focus {
    border: 2px solid var(--DarkGreen);
  }
  @media ${devices.tablet} {
    width: 350px;
  }
  @media ${devices.laptop} {
    width: 400px;
  }
`;

export const RecipeFieldContainer = styled.section`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const RecipeInput = styled.input`
  display: flex;
  height: 40px;
  width: 100px;
  padding: 0.5625rem 0.625rem 0.375rem 0.9375rem;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1.25rem;
  background: var(--Light);
  color: var(--Dark);
  font-family: var(--Heading);
  font-size: 1rem;
  border: 1px solid var(--Dark);
  box-shadow: 2px 4px 0px 0px var(--Dark);
  &:focus {
    border: 2px solid var(--DarkGreen);
  }
  @media ${devices.tablet} {
    width: 120px;
  }
  @media ${devices.laptop} {
    width: 150px;
  }
`;

export const TextArea = styled.textarea`
  display: flex;
  width: 250px;
  padding: 0.5625rem 0.625rem 0.375rem 0.9375rem;
  align-items: flex-start;
  border-radius: 0.375rem;
  background: var(--Light);
  color: var(--Dark);
  font-family: var(--Text);
  font-size: 0.8rem;
  line-height: 1.5rem;
  border: 1px solid var(--Dark);
  box-shadow: 2px 4px 0px 0px var(--Dark);
  &:focus {
    border: 2px solid var(--DarkGreen);
  }
  @media ${devices.tablet} {
    width: 350px;
  }
  @media ${devices.laptop} {
    width: 400px;
  }
`;
