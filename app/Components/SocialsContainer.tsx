import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const SocialsContainer = () => {
  return (
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
  );
};

export default SocialsContainer;
