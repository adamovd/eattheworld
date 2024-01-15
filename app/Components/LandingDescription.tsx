import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Description, DescriptionContainer } from "../Styles/Components/Heroes";
import RandomizeButton from "./RandomizeButton";

const phrases = [
  "Embark on a global culinary journey",
  "right from your kitchen,",
  "with recipes and cultural insights",
  "from across the globe.",
];

const DescriptionPage = () => {
  const button = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(button.current, {
        scrollTrigger: {
          trigger: button.current,
          scrub: true,
          start: "0px bottom",
          end: "bottom+=200px bottom",
        },
        opacity: 0,
        right: "-200px",
        ease: "power3.Out",
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <Description className="container">
      <DescriptionContainer>
        {phrases.map((phrase, index) => {
          return <AnimatedText key={index}>{phrase}</AnimatedText>;
        })}
      </DescriptionContainer>
      <section ref={button}>
        <RandomizeButton />
      </section>
    </Description>
  );
};

function AnimatedText({ children }: { children: React.ReactNode }) {
  const text = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(text.current, {
        scrollTrigger: {
          trigger: text.current,
          scrub: true,
          start: "0px bottom",
          end: "bottom+=400px bottom",
        },
        opacity: 0,
        left: "-200px",
        ease: "power3.Out",
      });
    });
    return () => ctx.revert();
  }, []);

  return <h2 ref={text}>{children}</h2>;
}

export default DescriptionPage;
