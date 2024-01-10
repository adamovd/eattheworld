import styled from "styled-components";
import { devices } from "../breakpoints";

export const InstructionList = styled.li`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: start;
  padding-left: 2rem;
  padding-right: 1rem;
  padding-bottom: 1rem;

  gap: 1rem;
  width: 100%;
  > h4 {
    margin-bottom: 0.2rem;
    font-size: 1rem;
    align-self: self-start;
    font-weight: 900;
  }
`;

export const IngredientsList = styled.li`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: start;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
`;

export const CountryList = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  width: 92vw;
  border-bottom: 1px solid var(--Dark);
  text-align: center;
  section {
    justify-content: start;
    &:nth-last-child() {
      justify-content: center;
    }
  }
`;
