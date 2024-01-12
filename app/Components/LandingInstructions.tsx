"use client";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import InstructionsCard from "./InstructionCard";
import { Card } from "../Models/TCard";
import { Main } from "../Styles/Components/LandingInstructions";
import { FormTitle } from "../Styles/Components/Fonts";

const infoCards: Card[] = [
  {
    title: "#1",
    description: "Sign up and log in",
    url: "/sign-in",
    src: "https://utfs.io/f/b9a2195c-3a8c-47a6-8cca-741a20779410-1exksd.jpg",
    color: "--Red",
  },
  {
    title: "#2",
    description: "Get a random country",
    url: "/",
    src: "https://utfs.io/f/8dd1fd70-faee-483e-906a-9a7654434d7a-wir9iz.jpg",
    color: "--Yellow",
  },
  {
    title: "#3",
    description: "Choose a recipe",
    url: "/sign-in",
    src: "https://utfs.io/f/ed3d6283-897a-4ed3-a5aa-a2f619b28f43-kg2th.jpg",
    color: "--Blue",
  },
  {
    title: "#4",
    description: "Cook it and share it with people you love",
    url: "/sign-in",
    src: "https://utfs.io/f/08a9ea82-ff1c-4f48-b6e8-1a6a309abdca-75c6oh.jpg",
    color: "--LightGreen",
  },
];

const LandingInstructions = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <Main ref={container}>
      <FormTitle>So let&apos;s start!</FormTitle>
      {infoCards.map((card, i) => {
        const targetScale = 1 - (infoCards.length - i) * 0.05;
        return (
          <InstructionsCard
            key={`p_${i}`}
            i={i}
            {...card}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </Main>
  );
};

export default LandingInstructions;
