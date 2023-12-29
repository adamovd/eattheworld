import styled from "styled-components";

interface BodyProps {
  bgcolor: string;
}

export const StyledBody = styled.body<BodyProps>`
  background: var(${(props: BodyProps) => props.bgcolor || "--Light"});
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
