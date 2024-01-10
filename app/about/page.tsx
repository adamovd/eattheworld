"use client";
import PageWrapper from "../Components/PageWrapper";
import { PageContainer, PageSection } from "../Styles/Components/Containers";
import Image from "next/image";
import { FormTitle } from "../Styles/Components/Fonts";

const AboutPage = () => {
  return (
    <PageWrapper>
      <PageContainer>
        <PageSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 1 } }}
          exit={{ opacity: 0, x: -50 }}
        >
          <Image
            src="https://utfs.io/f/70f0a592-2233-4883-a2af-9058a5fdc63f-g01o96.webp"
            alt="Two women cooking together"
            width={400}
            height={650}
          />
        </PageSection>
        <PageSection
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 1.5 } }}
          exit={{ opacity: 0, x: 50 }}
        >
          <FormTitle>About Eat The World</FormTitle>
          <span>
            Welcome to Eat The World, where we invite you to embark on a global
            culinary journey right from your kitchen.
          </span>
          <span>
            Eat The World is not just a website its a celebration of flavors,
            cultures, and the joy of discovering new cuisines. Explore recipes
            that suit your taste,skill level, and time constraints. Our platform
            is a space where culinary enthusiasts, families, and friends can
            come together to share in the joy of diverse cuisines.
          </span>
          <span>
            Thank you for joining us on this flavorful journey. Let's Eat The
            World together, one recipe at a time!
          </span>
        </PageSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default AboutPage;
