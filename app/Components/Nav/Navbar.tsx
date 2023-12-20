"use client";
import { Header } from "@/app/Styles/Components/Header";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoutButton, LoginButton } from "../Auth";
import { Button } from "@/app/Styles/Components/Buttons";
import Logo from "@/public/logo.svg";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <Header>
      <section>
        {session?.user?.role === "admin" ? (
          <Button
            bgColor="--Yellow"
            textColor="--Dark"
            fontSize="1rem"
            hasArrow
          >
            <Link href="/admin/dashboard">Dashboard</Link>
          </Button>
        ) : (
          ""
        )}
      </section>
      <section>
        <h1>eat the world</h1>
      </section>
      <section>
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>
        {session ? <LogoutButton /> : <LoginButton />}
      </section>
    </Header>
  );
};

export default Navbar;
