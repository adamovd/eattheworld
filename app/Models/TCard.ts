import { MotionValue } from "framer-motion";

export type Card = {
  i?: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress?: MotionValue<number>;
  range?: number[];
  targetScale?: number;
};
