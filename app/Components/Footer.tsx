"use client";
import { PageFooter } from "@/app/Styles/Components/Footer";
import Link from "next/link";
import Newsletter from "./Newsletter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
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
      <section>
        <Link href="https://facebook.com">
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </Link>
        <Link href="https://instagram.com">
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </Link>
        <Link href="https://twitter.com">
          <FontAwesomeIcon icon={faXTwitter} /> X
        </Link>
      </section>
    </PageFooter>
  );
};

export default Footer;
