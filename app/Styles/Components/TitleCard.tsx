import styled from "styled-components";
import { devices } from "../breakpoints";
import { motion } from "framer-motion";
export const TitleCard = styled(motion.section)`
  position: absolute;
  top: -10vh;
  left: 1rem;
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
  font-family: var(--Heading);
  font-size: 1.5rem;
  z-index: 50;
  @media ${devices.tablet} {
    font-size: 2rem;
    padding: 1.5 1.5rem 1.5 2rem;
  }
  @media ${devices.laptop} {
    font-size: 3rem;
    padding: 2.5rem 1.75rem 2.5rem 2rem;
  }
`;

export const RecipeCategoryCard = styled.section`
  position: absolute;
  top: -5vh;
  right: 2rem;
  display: flex;
  padding: 2rem;
  width: fit-content;
  height: 5vh;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1.5rem;
  border: 1px solid var(--Dark);
  background: var(--Light);
  box-shadow: 2px 0px 5px 0px rgba(0, 0, 0, 0.25);
  font-family: var(--Heading);
  font-size: 0.8rem;
  z-index: 0;
  @media ${devices.tablet} {
    font-size: 1rem;
  }
`;
