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
import SocialsContainer from "./SocialsContainer";
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
        <SocialsContainer />
      </section>
    </PageFooter>
  );
};

export default Footer;
