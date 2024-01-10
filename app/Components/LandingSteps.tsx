"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import {
  InfoStep,
  SelectedStep,
  StepImageContainer,
  StepsContainer,
  StepsList,
} from "../Styles/Components/LandingSteps";

const infoSteps = [
  {
    title: "1. Create a profile and sign in",
    src: "https://utfs.io/f/b5fe7428-937b-4734-afe7-39f7396ae766-4nvj7o.webp",
  },
  {
    title: "2. Get a random country and choose a recipe",
    src: "https://utfs.io/f/7dfa60ee-cfa1-414d-b554-a792a2f3ca6c-3007nx.webp",
  },
  {
    title: "3. Cook it, and enjoy time it with someone you like",
    src: "https://utfs.io/f/70f0a592-2233-4883-a2af-9058a5fdc63f-g01o96.webp",
  },
  {
    title: "4. See your stats and get ready for your next trip!",
    src: "https://utfs.io/f/665704ad-1194-4e43-9395-57918311c1e7-j54icj.png",
  },
];

const LandingSteps = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const container = useRef(null);
  const imageContainer = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: imageContainer.current,
      pin: true,
      start: "top-=200px",
      end: "+=1000px",
    });
  }, []);

  return (
    <StepsContainer ref={container}>
      <InfoStep>
        <StepImageContainer ref={imageContainer}>
          <Image
            src={`${infoSteps[selectedStep].src}`}
            fill={true}
            alt=""
            priority={true}
            objectFit="cover"
            sizes="full"
          />
        </StepImageContainer>

        <StepsList>
          {infoSteps.map((step, index) => {
            return (
              <SelectedStep
                key={index}
                onMouseOver={() => {
                  setSelectedStep(index);
                }}
              >
                <h2>{step.title}</h2>
              </SelectedStep>
            );
          })}
        </StepsList>
      </InfoStep>
    </StepsContainer>
  );
};

export default LandingSteps;
