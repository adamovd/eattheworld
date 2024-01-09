"use client";
import { PageFooter } from "@/app/Styles/Components/Footer";
import Link from "next/link";
import Newsletter from "./Newsletter";
const Footer = () => {
  return (
    <PageFooter>
      <section>
        <Link href="/">Homepage</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </section>
      <section>
        <Newsletter />
      </section>
      <section></section>
    </PageFooter>
  );
};

export default Footer;
