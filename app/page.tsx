"use client";

import { useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import DescriptionPage from "./Components/Description";

const Home = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  });
  return (
    <main style={{ minHeight: "100vh", width: "92vw" }}>
      <LandingPage />
      <DescriptionPage />
    </main>
  );
};

export default Home;
