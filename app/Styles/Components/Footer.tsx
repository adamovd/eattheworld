import styled from "styled-components";
import { devices } from "../breakpoints";

export const PageFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid var(--Dark);
  background: var(--Yellow);
  width: 100%;
  height: auto;
  min-height: 25rem;
  padding: 5rem;
  gap: 2rem;

  @media ${devices.tablet} {
    flex-direction: row;
  }
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: start;
    width: 100%;
    font-family: var(--Heading);
    gap: 2rem;
    a {
      font-family: var(--Text);
      font-size: 0.8rem;
    }
    @media ${devices.tablet} {
      width: 33%;
    }
  }
`;
