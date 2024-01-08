import styled from "styled-components";
import { devices } from "../breakpoints";

export const InfoTile = styled.article`
  width: 92vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--Dark);
  &:hover {
    background-color: var(--Red);
    color: var(--Light);
  }

  @media ${devices.tablet} {
    width: 46vw;
    height: width;
    border-bottom: 1px solid var(--Dark);
    &:nth-child(1) {
      border-right: 1px solid var(--Dark);
    }
  }
`;
