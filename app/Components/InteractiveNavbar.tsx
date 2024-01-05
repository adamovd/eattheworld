"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  RightContainer,
  NavbarLinkContainer,
  NavbarLink,
  OpenLinksButton,
  NavbarExtendedContainer,
  NavbarLinkExtended,
} from "../Styles/Components/Header";
import open from "../../public/menu.svg";
import close from "../../public/close.svg";

type Link = {
  href: string;
  label: string;
};
const InteractiveNavbar = () => {
  const { data: session } = useSession();
  const path = usePathname();
  const [extendNavbar, setExtendNavbar] = useState(false);
  let links: Link[];

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
    <>
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

      {links.map((link, index) => (
        <NavbarExtendedContainer key={index}>
          {extendNavbar && (
            <>
              <NavbarLinkExtended href={link.href}>
                {link.label}
              </NavbarLinkExtended>
            </>
          )}
        </NavbarExtendedContainer>
      ))}
    </>
  );
};

export default InteractiveNavbar;
