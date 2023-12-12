"use client";
import User from "./Components/User";
import { LoginButton, LogoutButton } from "./Components/Auth";
import React from "react";
import PresentCountries from "./Components/PresentCountries";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-row gap-3 my-4">
        {session ? <LogoutButton /> : <LoginButton />}

        <Link
          href="/admin/dashboard"
          className="flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Dashboard
        </Link>
      </section>
      <User />
      <PresentCountries />
    </main>
  );
}
