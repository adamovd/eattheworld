import styled from "styled-components";
import { devices } from "../breakpoints";
import { motion } from "framer-motion";

interface CardProps {
  bgcolor: string;
  color: string;
}

export const CardContainer = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CardSection = styled(motion.section)<CardProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 60vh;
  width: 88vw;
  padding: 50px;
  transform-origin: top;
  border: 1px solid var(--Dark);
  border-radius: 1.5rem;
  box-shadow: 2px 5px 2px 0px rgba(0, 0, 0, 0.25);
  background: var(${(props: CardProps) => props.bgcolor || "--Light"});
  color: var(${(props: CardProps) => props.color || "--Dark"});

  h2 {
    text-align: center;
    margin: 0px;
    font-family: var(--Heading);
    font-size: 2rem;
  }
  @media ${devices.tablet} {
    height: 70vh;
    h2 {
      font-size: 2.5rem;
    }
  }
`;

export const CardBody = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 50px;
  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

export const CardDescription = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  a {
    font-family: var(--Heading);
    font-size: 1rem;
    text-decoration: none;
  }

  @media ${devices.tablet} {
    width: 50%;
    a {
      font-size: 2.5rem;
    }
  }
`;

export const CardImage = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid var(--Dark);
  box-shadow: 2px 5px 2px 0px rgba(0, 0, 0, 1);
  overflow: hidden;
  img {
    object-fit: cover;
    background-color: var(--Light);
  }
  @media ${devices.tablet} {
    width: 60%;
  }
`;

export const InnerCardImage = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export const Main = styled.section`
  position: relative;
  margin-top: 10vh;
`;
