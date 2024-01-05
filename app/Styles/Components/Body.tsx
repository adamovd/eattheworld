import styled from "styled-components";
import { motion } from "framer-motion";

interface BodyProps {
  bgcolor: string;
}

export const StyledBody = styled(motion.section)<BodyProps>`
  background: var(${(props: BodyProps) => props.bgcolor || "--Light"});
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: -5;
`;
