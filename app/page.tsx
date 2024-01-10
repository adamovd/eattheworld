"use client";
import { useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import DescriptionPage from "./Components/LandingDescription";
import PageWrapper from "./Components/PageWrapper";
import LandingVideo from "./Components/LandingVideo";
import LandingSteps from "./Components/LandingSteps";

const Home = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  });
  return (
    <PageWrapper>
      <LandingPage />
      <DescriptionPage />
      <LandingVideo />
      {/* <LandingSteps /> */}
    </PageWrapper>
  );
};

export default Home;
