"use client";
import LandingPage from "./Components/LandingPage";
import DescriptionPage from "./Components/LandingDescription";
import PageWrapper from "./Components/PageWrapper";
import LandingVideo from "./Components/LandingVideo";
import LandingInstructions from "./Components/LandingInstructions";

const Home = () => {
  return (
    <PageWrapper>
      <LandingPage />
      <DescriptionPage />
      <LandingVideo />
      <LandingInstructions />
    </PageWrapper>
  );
};

export default Home;
