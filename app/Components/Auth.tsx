"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className="flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign in
    </button>
  );
};
export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({})}
      className="flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign out
    </button>
  );
};
