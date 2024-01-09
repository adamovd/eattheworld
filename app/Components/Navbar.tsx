"use client";
import { motion } from "framer-motion";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "@/app/Styles/Components/Header";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../public/logo.png";
import open from "../../public/menu.svg";
import close from "../../public/close.svg";
import { useSessionData } from "@/helpers/session-utils";
import UserAvatar from "./UserAvatar";

type Link = {
  href: string;
  label: string;
};
const Navbar = () => {
  const path = usePathname();
  const [extendNavbar, setExtendNavbar] = useState(false);
  const links = useSessionData();

  return (
    <NavbarContainer extendnavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link href="/">
            <Logo
              src={logo}
              alt="Eat the World logo"
              priority
              width={120}
              height={70}
            />
          </Link>
        </LeftContainer>
        <RightContainer>
          {links.map((link, index) => (
            <NavbarLinkContainer key={index}>
              <NavbarLink href={link.href}>
                {link.href === path && (
                  <motion.span
                    layoutId="underline"
                    className={`absolute left-0 top-full block h-[1px] w-full ${
                      link.label !== "my pages" ? "bg-black" : ""
                    }`}
                  />
                )}
                {link.label === "my pages" ? (
                  <UserAvatar width={50} height={50} />
                ) : (
                  link.label
                )}
              </NavbarLink>
            </NavbarLinkContainer>
          ))}
          <OpenLinksButton
            onClick={() => {
              setExtendNavbar((curr) => !curr);
            }}
          >
            {extendNavbar ? (
              <Image src={close} alt="Close menu" width={50} height={50} />
            ) : (
              <Image src={open} alt="Open menu" width={50} height={50} />
            )}
          </OpenLinksButton>
        </RightContainer>
      </NavbarInnerContainer>
      {links.map((link, index) => (
        <NavbarExtendedContainer key={index}>
          {extendNavbar ? (
            <>
              <NavbarLinkExtended
                href={link.href}
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                {link.label}
              </NavbarLinkExtended>
            </>
          ) : null}
        </NavbarExtendedContainer>
      ))}
    </NavbarContainer>
  );
};

export default Navbar;
