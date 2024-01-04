"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { Button } from "../Styles/Components/Buttons";
import { useRouter } from "next/navigation";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.eattheworld.se";

export const LoginButton = ({
  bgcolor,
  textcolor,
}: {
  bgcolor: string;
  textcolor: string;
}) => {
  return (
    <Button
      bgcolor={bgcolor}
      textcolor={textcolor}
      fontSize="1rem"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
};
export const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      bgcolor="--Red"
      textcolor="--Light"
      fontSize="1rem"
      onClick={() => signOut({ callbackUrl: url })}
    >
      Sign out
    </Button>
  );
};
