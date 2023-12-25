"use client";

import PresentCountries from "./Components/PresentCountries";

import { useSession } from "next-auth/react";
import RandomizeButton from "./Components/RandomizeButton";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RandomizeButton />
    </main>
  );
}
