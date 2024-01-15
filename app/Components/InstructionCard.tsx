"use client";
import Image from "next/image";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Card } from "../Models/TCard";
import {
  CardBody,
  CardContainer,
  CardDescription,
  CardImage,
  CardSection,
  InnerCardImage,
} from "../Styles/Components/LandingInstructions";
import Link from "next/link";

const InstructionsCard = ({
  i,
  title,
  description,
  src,
  url,
  bgcolor,
  color,
  progress,
  range,
  targetScale,
}: Card) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(
    progress as MotionValue<number>,
    range as number[],
    [1, targetScale]
  );

  return (
    <CardContainer ref={container}>
      <CardSection
        bgcolor={bgcolor}
        color={color}
        style={{
          scale,
          top: `calc(-5vh + ${(i as number) * 25}px)`,
        }}
      >
        <h2>{title}</h2>
        <CardBody>
          <CardDescription>
            <Link href={url}>{description}</Link>
          </CardDescription>

          <CardImage>
            <InnerCardImage style={{ scale: imageScale }}>
              <Image fill src={src} alt="image" />
            </InnerCardImage>
          </CardImage>
        </CardBody>
      </CardSection>
    </CardContainer>
  );
};

export default InstructionsCard;
