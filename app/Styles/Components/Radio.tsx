import styled from "styled-components";
import { devices } from "../breakpoints";

export const RadioPlayer = styled.section`
  display: flex;
  width: fit-content;
  height: 15vh;
  padding: 1rem 1.5rem 1rem 1.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1.5rem;
  border: 1px solid var(--Dark);
  background: var(--Light);
  box-shadow: 2px 5px 2px 0px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devices.tablet} {
    flex-direction: row;
    justify-content: space-around;
  }
`;
