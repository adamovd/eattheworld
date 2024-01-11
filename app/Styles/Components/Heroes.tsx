import styled from "styled-components";
import { devices } from "../breakpoints";

export const LandingContainer = styled.section`
  position: relative;
  min-width: 92vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--DarkGreen);
  border-left: 1px solid var(--Dark);
  border-right: 1px solid var(--Dark);
`;
export const IntroContainer = styled.article`
  margin-top: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: white;
    font-size: 7.5vw;
    z-index: 3;
    text-align: center;
    white-space: nowrap;
    @media ${devices.tablet} {
      font-size: 7vw;
    }
  }

  .Buttons {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    gap: 2rem;
    z-index: 500;

    @media ${devices.tablet} {
      margin-top: 4rem;
    }
  }
`;

export const BackgroundImage = styled.section`
  position: absolute;
  height: 115vh;
  width: 100%;
  border-bottom: 1px solid var(--Dark);
  filter: brightness(80%);
  img {
    object-fit: cover;
  }
  @media ${devices.laptop} {
    height: 140vh;
  }
`;

export const IntroImage = styled.section`
  display: none;
  position: absolute;
  height: 400px;
  width: 230px;
  filter: brightness(80%);

  img {
    object-fit: cover;
    object-position: top;
  }
  @media ${devices.tablet} {
    height: 425px;
    width: 250px;
  }
  @media ${devices.laptop} {
    height: 475px;
    width: 350px;
  }
`;

export const Description = styled.section`
  min-width: 92vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  background-color: var(--DarkGreen);
  border-left: 1px solid var(--Dark);
  border-right: 1px solid var(--Dark);
  overflow-x: hidden;
  button {
    margin-bottom: 5rem;
  }
`;

export const DescriptionContainer = styled.article`
  position: relative;
  width: 100%;
  color: white;
  font-size: 5vw;
  margin-top: 30vw;
  margin-left: 5vw;
  padding-bottom: 2rem;
  h4 {
    margin: 0px;
    position: relative;
  }
  @media ${devices.laptop} {
    font-size: 3vw;
    margin-left: 10vw;
  }
`;
