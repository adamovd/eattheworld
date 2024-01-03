"use client";
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
import { useState } from "react";
import { LoginButton } from "./Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/logo.png";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer extendnavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link href="/">
            <Logo src={logo} alt="Eat the World logo" />
          </Link>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            {session?.user?.role === "admin" ? (
              <>
                <NavbarLink href="/admin/dashboard"> Dashboard</NavbarLink>
                <NavbarLink href="/admin/register/country">
                  {" "}
                  Add country
                </NavbarLink>
                <NavbarLink href="/admin/register/recipe">
                  Add recipe
                </NavbarLink>
                {session ? (
                  <NavbarLink href={`/user/${session?.user?.id as string}`}>
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
                  </NavbarLink>
                ) : (
                  <LoginButton bgcolor="--DarkGreen" textcolor="--Light" />
                )}
              </>
            ) : (
              <>
                <NavbarLink href="/contact"> Contact</NavbarLink>
                <NavbarLink href="/about"> About</NavbarLink>
                {session ? (
                  <NavbarLink href={`/user/${session?.user?.id as string}`}>
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
                  </NavbarLink>
                ) : (
                  <LoginButton bgcolor="--DarkGreen" textcolor="--Light" />
                )}
              </>
            )}

            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? (
                <FontAwesomeIcon fontSize="2rem" icon={faXmark} />
              ) : (
                <FontAwesomeIcon fontSize="2rem" icon={faBars} />
              )}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </RightContainer>
      </NavbarInnerContainer>
      <NavbarExtendedContainer>
        {extendNavbar && (
          <>
            {session?.user?.role === "admin" ? (
              <>
                <NavbarLinkExtended
                  href="/admin/dashboard"
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                >
                  {" "}
                  Dashboard
                </NavbarLinkExtended>
                <NavbarLinkExtended
                  href="/admin/register/country"
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                >
                  {" "}
                  Add country
                </NavbarLinkExtended>
                <NavbarLinkExtended
                  href="/admin/register/recipe"
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                >
                  Add recipe
                </NavbarLinkExtended>
                {session ? (
                  <NavbarLinkExtended
                    href={`/user/${session?.user?.id as string}`}
                    onClick={() => {
                      setExtendNavbar((curr) => !curr);
                    }}
                  >
                    My pages
                  </NavbarLinkExtended>
                ) : (
                  <NavbarLinkExtended href="/sign-in">
                    Sign in
                  </NavbarLinkExtended>
                )}
              </>
            ) : (
              <>
                <NavbarLinkExtended
                  href="/contact"
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                >
                  {" "}
                  Contact
                </NavbarLinkExtended>
                <NavbarLinkExtended
                  href="/about"
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                >
                  {" "}
                  About
                </NavbarLinkExtended>
                {session ? (
                  <NavbarLinkExtended
                    href={`/user/${session?.user?.id as string}`}
                    onClick={() => {
                      setExtendNavbar((curr) => !curr);
                    }}
                  >
                    My pages
                  </NavbarLinkExtended>
                ) : (
                  <NavbarLinkExtended href="/sign-in">
                    Sign in
                  </NavbarLinkExtended>
                )}
              </>
            )}
          </>
        )}
      </NavbarExtendedContainer>
    </NavbarContainer>
  );
};

export default Navbar;
