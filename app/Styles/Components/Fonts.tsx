import styled from "styled-components";
import { devices } from "../breakpoints";

export const TileTitle = styled.h3`
  font-size: 3rem;
`;

export const FormTitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
`;

export const FormRegisterLink = styled.p`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > a {
    color: var(--LightGreen);
  }
`;
