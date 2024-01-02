"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { Button } from "../Styles/Components/Buttons";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  return (
    <Button
      bgcolor="--DarkGreen"
      textcolor="--Light"
      fontSize="1rem"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
};
export const LogoutButton = () => {
  const router = useRouter();
  const signOutToHome = () => {
    router.push("/");
    signOut();
  };

  return (
    <Button
      bgcolor="--Red"
      textcolor="--Light"
      fontSize="1rem"
      onClick={() => signOutToHome()}
    >
      Sign out
    </Button>
  );
};
