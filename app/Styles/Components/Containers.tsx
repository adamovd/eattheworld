"use client";
import styled from "styled-components";
import { devices } from "../breakpoints";

interface ImageProps {
  url: string;
}

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 92vw;
  margin-left: 4vw;
  border-left: 1px solid var(--Dark);
  border-right: 1px solid var(--Dark);
  background-color: var(--Light);
`;

export const ImageContainer = styled.article<ImageProps>`
  position: relative;
  width: 100%;
  height: 50vh;
  background-image: url(${(props: ImageProps) => props.url});
  background-size: cover;
  object-fit: fill;
  overflow: hidden;
  border-bottom: 1px solid var(--Dark);
  @media ${devices.tablet} {
    height: 75vh;
  }
`;

export const InfoContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--Dark);
  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

export const TextContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  padding-top: 4rem;
  &:nth-child(2) {
    border-bottom: 1px solid var(--Dark);
  }
  &:nth-child(3) {
    padding-top: 2rem;
  }
  @media ${devices.tablet} {
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
  object-fit: fill;
  overflow: hidden;
  border-bottom: 1px solid var(--Dark);
  @media ${devices.tablet} {
    width: 30%;
    height: auto;
    border-bottom: none;
    border-right: 1px solid var(--Dark);
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
  top: -5px;
  right: 30px;

  @media ${devices.tablet} {
    top: -15px;
    right: 10px;
    gap: 1rem;
  }
`;
