import {
  BackgroundImage,
  IntroContainer,
  LandingContainer,
} from "../Styles/Components/Heroes";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useMemo, useRef } from "react";
import { LoginButton } from "./Auth";
import { Button } from "../Styles/Components/Buttons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RandomizeButton from "./RandomizeButton";
import { useWindowSize } from "../hooks/useWindowSize";

const LandingPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const background = useRef(null);
  const landingContainer = useRef(null);
  const windowSize = useWindowSize();
  const isPortrait = useMemo(
    () => windowSize.width < windowSize.height,
    [windowSize]
  );
  const imageUrl = useMemo(
    () =>
      isPortrait ? "/images/background_mobile.webp" : "/images/background.webp",
    [isPortrait]
  );

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: true,
          start: "top",
          end: "+=500px",
        },
      });

      timeline.from(background.current, {
        clipPath: `inset(35%)`,
        backgroundPosition: "0px 0px",
      });
    });
    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    router.push("/register");
  };
  return (
    <LandingContainer ref={landingContainer} className="container">
      <BackgroundImage ref={background}>
        <Image
          src={imageUrl}
          alt="Image of fruits on a market"
          fill={true}
          priority={true}
        />
      </BackgroundImage>
      <IntroContainer>
        {session ? (
          <h1 data-scroll data-scroll-speed="0.7">
            Hi {session?.user?.firstname}, welcome back!
          </h1>
        ) : (
          <h1 data-scroll data-scroll-speed="0.7">
            Welcome to Eat The World
          </h1>
        )}
        {session ? (
          <section className="Buttons">
            <RandomizeButton />
          </section>
        ) : (
          <section className="Buttons">
            <LoginButton bgcolor="--Light" textcolor="--Dark" />{" "}
            <Button
              bgcolor="--Light"
              textcolor="--Dark"
              fontSize="1rem"
              onClick={() => handleClick()}
            >
              Register
            </Button>
          </section>
        )}
      </IntroContainer>
    </LandingContainer>
  );
};

export default LandingPage;
