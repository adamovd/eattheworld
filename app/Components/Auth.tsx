"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { Button } from "../Styles/Components/Buttons";

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
  return (
    <Button
      bgcolor="--Red"
      textcolor="--Light"
      fontSize="1rem"
      onClick={() => signOut({})}
    >
      Sign out
    </Button>
  );
};
