import styled from "styled-components";
import { devices } from "../breakpoints";

export const InfoTile = styled.article`
  width: 92vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:nth-child(1) {
    border-bottom: 1px solid var(--Dark);
  }
  @media ${devices.tablet} {
    width: 50vw;
    height: width;
    &:nth-child(1) {
      border-right: 1px solid var(--Dark);
      border-bottom: none;
    }
  }
`;
