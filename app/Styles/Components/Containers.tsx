"use client";
import styled from "styled-components";
import { devices } from "../breakpoints";
import { motion } from "framer-motion";

interface ImageProps {
  url: string;
}

export const Container = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 92vw;
  min-height: 96vh;
  margin-left: 4vw;
  border-left: 1px solid var(--Dark);
  border-right: 1px solid var(--Dark);
  background-color: var(--Light);
`;

export const ImageContainer = styled(motion.div)<ImageProps>`
  position: relative;
  width: 100%;
  height: 50vh;
  background-image: url(${(props: ImageProps) => props.url});
  background-size: cover;
  background-position: center;
  object-fit: fill;
  overflow: hidden;
  border-bottom: 1px solid var(--Dark);
  @media ${devices.tablet} {
    height: 75vh;
  }
`;

export const InfoContainer = styled(motion.section)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Dark);
  font-size: 0.8rem;

  @media ${devices.tablet} {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    font-size: 1rem;
    ol,
    ul {
      width: 50%;
    }
    ol {
      @media ${devices.tablet} {
        border-top: none;
        border-left: 1px solid var(--Dark);
      }
    }
  }
`;

export const SingleContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;

export const TileContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

export const TextContainer = styled(motion.section)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  font-size: 0.8rem;
  a {
    color: var(--DarkGreen);
    &:hover {
      color: var(--LightGreen);
    }
  }
  &:nth-child(2) {
    border-bottom: 1px solid var(--Dark);
  }
  &:nth-child(3) {
    padding-top: 2rem;
  }
  @media ${devices.tablet} {
    font-size: 1rem;
    &:nth-child(2) {
      border-right: 1px solid var(--Dark);
      width: 60%;
      border-bottom: none;
    }
    &:nth-child(3) {
      width: 40%;
      padding-top: 4rem;
    }
  }
`;

export const RecipeImageContainer = styled.article<ImageProps>`
  width: 100%;
  height: 40vh;
  background-image: url(${(props: ImageProps) => props.url});
  background-size: cover;
  background-position: center;
  object-fit: fill;
  overflow: hidden;
  border-bottom: 1px solid var(--Dark);
  @media ${devices.tablet} {
    border-bottom: none;
    border-right: 1px solid var(--Dark);
    width: 50%;
    height: 60vh;
  }
`;

export const RecipeTextContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  gap: 1rem;
  > h2 {
    font-size: 2rem;
  }
  @media ${devices.tablet} {
    width: 70%;
  }
`;

export const ButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  position: absolute;
  top: -10px;
  right: 40px;

  @media ${devices.tablet} {
    top: -15px;
    right: 10px;
    gap: 1rem;
  }
`;

export const MapContainer = styled.section`
  width: 100%;
  height: 70vh;
  overflow: hidden;
  border-bottom: 1px solid var(--Dark);

  @media ${devices.tablet} {
    height: 50vh;
  }
`;

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 0.5rem, 1.5rem;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;

export const PostReviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: fit-content;
  justify-content: space-around;
  align-items: center;
`;

export const PostReviewSection = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  justify-content: space-around;
  align-items: center;
  @media ${devices.tablet} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ReviewContainer = styled(motion.section)`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: 1rem;
  width: 80vw;
  padding: 1rem 1.5rem 1rem 1.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1.5rem;
  border: 1px solid var(--Dark);
  background: var(--Light);
  box-shadow: 2px 5px 2px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  @media ${devices.tablet} {
    width: 70vw;
  }
  @media ${devices.laptop} {
    width: 40vw;
  }
`;

export const ReviewTopSection = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  justify-content: start;
  align-items: center;
  border-bottom: 1px dashed var(--Dark);
  padding-bottom: 0.5rem;

  p {
    font-weight: 900;
  }

  @media ${devices.tablet} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ReviewBottomSection = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0.5rem;
`;

export const VideoContainer = styled.video`
  right: 0;
  bottom: 0;
  width: 92vw;
  height: 75vh;
  object-fit: cover;
  object-position: center;
  border-top: 1px solid var(--Dark);
  border-bottom: 1px solid var(--Dark);
`;

export const CountryMap = styled.section`
  width: 92vw;
  height: 70vh;
  overflow: hidden;
  padding: 0;
  border-left: 1px solid var(--Dark);
  border-right: 1px solid var(--Dark);
  border-bottom: 1px solid var(--Dark);

  @media ${devices.tablet} {
    height: 50vh;
    width: 52vw;
    border-bottom: none;
  }
  @media ${devices.laptop} {
    width: 62vw;
  }
`;

export const SpotifyContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 92vw;
  height: 50vh;
  overflow: hidden;
  padding-top: 2rem;

  @media ${devices.tablet} {
    width: 40vw;
    padding-top: 0;
  }
  @media ${devices.laptop} {
    width: 30vw;
  }
`;
