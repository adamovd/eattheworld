"use client";

import { useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import DescriptionPage from "./Components/Description";
import PageWrapper from "./Components/PageWrapper";

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
    </PageWrapper>
  );
};

export default Home;
