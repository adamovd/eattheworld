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
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import logo from "../../public/logo.png";
import open from "../../public/menu.svg";
import close from "../../public/close.svg";
import { LoginButton } from "./Auth";
import { useWindowSize } from "../hooks/useWindowSize";

type Link = {
  href: string;
  label: string;
};
const Navbar = () => {
  const { data: session } = useSession();
  const path = usePathname();
  const [extendNavbar, setExtendNavbar] = useState(false);
  let links: Link[];
  const windowSize = useWindowSize();
  const isPortrait = useMemo(
    () => windowSize.width < windowSize.height,
    [windowSize]
  );
  const signInButton = useMemo(
    () =>
      isPortrait ? (
        <NavbarLink href="/sign-in">sign in</NavbarLink>
      ) : (
        <LoginButton bgcolor="--DarkGreen" textcolor="--Light" />
      ),
    [isPortrait]
  );

  if (session) {
    links = [
      { href: "/", label: "home" },
      { href: "/about", label: "about" },
      { href: "/contact", label: "contact" },
      { href: `/user/${session?.user?.id as string}`, label: "my pages" },
    ];
    if (session?.user?.role === "admin") {
      links = [
        { href: "/", label: "home" },
        { href: "/admin/dashboard", label: "dashboard" },
        { href: "/admin/register/country", label: "add country" },
        { href: "/admin/register/recipe", label: "add recipe" },
        { href: `/user/${session?.user?.id as string}`, label: "my pages" },
      ];
    }
  } else {
    links = [
      { href: "/", label: "home" },
      { href: "/about", label: "about" },
      { href: "/contact", label: "contact" },
      { href: "/sign-in", label: "sign in" },
    ];
  }

  return (
    <NavbarContainer extendnavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link href="/">
            <Logo src={logo} alt="Eat the World logo" />
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
                  <Image
                    style={{
                      borderRadius: 50,
                      maxHeight: 50,
                      objectFit: "cover",
                    }}
                    src={session?.user?.image as string}
                    width={50}
                    height={50}
                    alt={session?.user?.firstname as string}
                  />
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
          {extendNavbar && (
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
          )}
        </NavbarExtendedContainer>
      ))}
    </NavbarContainer>
  );
};

export default Navbar;
