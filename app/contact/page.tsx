"use client";
import PageWrapper from "../Components/PageWrapper";
import { PageContainer, PageSection } from "../Styles/Components/Containers";
import Image from "next/image";
import { FormTitle } from "../Styles/Components/Fonts";
import Link from "next/link";

const ContactPage = () => {
  return (
    <PageWrapper>
      <PageContainer>
        <PageSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 1 } }}
          exit={{ opacity: 0, x: -50 }}
        >
          <Image
            src="https://utfs.io/f/7dfa60ee-cfa1-414d-b554-a792a2f3ca6c-3007nx.webp"
            alt="Hand sprinkeling sesame seeds on Edamame beans"
            width={400}
            height={650}
          />
        </PageSection>
        <PageSection
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 1.5 } }}
          exit={{ opacity: 0, x: 50 }}
        >
          <FormTitle>Contact us</FormTitle>
          <span>
            <h4>General Inquiries:</h4>
            For general inquiries, feedback, or any questions about Eat The
            World, feel free to reach out to us at:{" "}
            <Link
              href="mailto: info@eattheworld.se"
              style={{ color: "#46684c" }}
            >
              info@eattheworld.se
            </Link>
          </span>
          <span>
            <h4>Submit Your Recipes:</h4>
            Have a fantastic recipe you'd love to share with our community? We'd
            love to hear from you! Send your culinary creations to:
            <Link
              href="mailto: recipes@eattheworld.se"
              style={{ color: "#46684c" }}
            >
              recipes@eattheworld.se
            </Link>{" "}
            for a chance to be featured on Eat The World.
          </span>
          <span>
            <h4>We Love Hearing From You:</h4>
            At Eat The World, we value your thoughts and contributions. Whether
            it's a recipe idea, partnership proposal, or just to say hello, we
            look forward to hearing from you!
          </span>
        </PageSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default ContactPage;
