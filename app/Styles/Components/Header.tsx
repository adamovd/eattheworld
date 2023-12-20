import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid var(--Dark);
  background: var(--Light);
  height: 4rem;
  width: 100%;
  position: fixed;
  z-index: 999;
  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 33%;
    font-family: var(--Heading);
    a {
      font-family: var(--Text);
      font-size: 0.8rem;
    }
    button > a {
      font-family: var(--Header);
      font-size: 1rem;
    }
  }
`;
