"use client";
import { PageFooter } from "@/app/Styles/Components/Footer";
import { InputField } from "../Styles/Components/InputFields";
import Link from "next/link";
const Footer = () => {
  return (
    <PageFooter>
      <section>
        <Link href="/">Homepage</Link>
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>
      </section>
      <section>
        Join our newsletter:
        <InputField
          bgColor="--Light"
          textColor="--Dark"
          fontSize="1rem"
          type="email"
          placeholder="Your email..."
        />
      </section>
      <section></section>
    </PageFooter>
  );
};

export default Footer;
