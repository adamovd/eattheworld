import styled from "styled-components";
import { devices } from "../breakpoints";

export const StepsContainer = styled.aside`
  position: relative;
  margin-top: 5vh;
  padding: 10%;
`;

export const InfoStep = styled.section`
  display: flex;
  height: 700px;
  justify-content: space-between;
  gap: 5%;
`;
export const StepImageContainer = styled.article`
  position: absolute;
  height: 60vh;
  width: 40vw;

  img {
    object-fit: cover;
  }
`;

export const InfoText = styled.div`
  display: flex;
  height: 100%;
  width: 20%;
  font-size: 1.2rem;

  &:last-of-type {
    align-items: flex-end;
    font-size: 1rem;
  }
`;

export const StepsList = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 2rem;
`;

export const SelectedStep = styled.article`
  width: 100%;
  text-transform: uppercase;
  font-size: 1.5rem;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: flex-end;

  h2 {
    margin: 0px;
    margin-top: 40px;
    margin-bottom: 20px;
    cursor: pointer;
  }
`;
