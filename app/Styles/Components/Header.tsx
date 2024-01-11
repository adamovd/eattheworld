import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { devices } from "../breakpoints";

interface NavProps {
  extendnavbar: boolean;
}

export const NavbarContainer = styled.nav<NavProps>`
  width: 100%;
  height: ${(props: NavProps) => (props.extendnavbar ? "100vh" : "4rem")};
  border-bottom: 1px solid var(--Dark);
  background: var(--Light);
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 999;

  @media ${devices.tablet} {
    height: 4rem;
    flex-direction: row;
  }
`;

export const LeftContainer = styled.article`
  flex: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  @media ${devices.tablet} {
    padding-left: 4vw;
  }
`;

export const RightContainer = styled.ul`
  flex: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media ${devices.tablet} {
    padding-right: 4vw;
  }
`;

export const NavbarInnerContainer = styled.section`
  width: 100%;
  height: 4rem;
  display: flex;
`;

export const NavbarLinkContainer = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const NavbarLink = styled(Link)`
  position: relative;
  color: var(--Dark);
  font-size: 1rem;
  font-family: var(--Heading);
  text-decoration: none;
  margin: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: var(--Dark);
  font-size: 1rem;
  font-family: var(--Text);
  text-decoration: none;
  margin: 10px;
  margin-bottom: 1px solid var(--Dark);
`;

export const Logo = styled(Image)`
  margin: 10px;
  max-width: 100px;
  width: auto;
  height: auto;
  @media ${devices.tablet} {
    max-width: 150px;
  }
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: var(--Dark);
  cursor: pointer;
  padding-top: 5px;

  @media ${devices.tablet} {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1px solid var(--Dark);

  @media ${devices.tablet} {
    display: none;
  }
`;
