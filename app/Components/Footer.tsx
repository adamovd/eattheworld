"use client";
import { PageFooter } from "@/app/Styles/Components/Footer";
import { InputField } from "../Styles/Components/InputFields";
import Link from "next/link";
const Footer = () => {
  return (
    <PageFooter>
      <section>
        <Link href="/">Homepage</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </section>
      <section>
        Join our newsletter:
        <InputField
          bgcolor="--Light"
          textcolor="--Dark"
          fontSize="1rem"
          width="300px"
          type="email"
          placeholder="Your email..."
        />
      </section>
      <section></section>
    </PageFooter>
  );
};

export default Footer;
