import styled from "styled-components";

export const UserMenu = styled.details`
  margin-top: 1rem;
  width: 100vw;
  height: auto;
  background-color: var(--Light);
  border: 1px solid var(--Dark);
  & > summary {
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
`;
