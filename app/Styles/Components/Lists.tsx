import styled from "styled-components";
import { devices } from "../breakpoints";

export const InstructionList = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 70%;
  > h4 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

export const IngredientsList = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
`;
