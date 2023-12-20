import styled from "styled-components";

export const PageFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid var(--Dark);
  background: var(--Yellow);
  width: 100%;
  height: 25rem;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 33%;
    font-family: var(--Heading);
    gap: 2rem;
    a {
      font-family: var(--Text);
      font-size: 0.8rem;
    }
  }
`;
