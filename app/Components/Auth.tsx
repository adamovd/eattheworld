"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { Button } from "../Styles/Components/Buttons";

export const LoginButton = () => {
  return (
    <Button
      bgColor="--DarkGreen"
      textColor="--Light"
      fontSize="1rem"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
};
export const LogoutButton = () => {
  return (
    <Button
      bgColor="--Red"
      textColor="--Light"
      fontSize="1rem"
      onClick={() => signOut({})}
    >
      Sign out
    </Button>
  );
};
