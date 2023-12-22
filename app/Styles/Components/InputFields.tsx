import styled from "styled-components";

interface InputProps {
  bgColor: string;
  textColor: string;
  fontSize: string;
  width: string;
}

export const InputField = styled.input<InputProps>`
  display: flex;
  height: 45px;
  min-width: ${(props: InputProps) => props.width || "200px"};
  width: auto;
  padding: 0.5625rem 0.625rem 0.375rem 0.9375rem;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1.25rem;
  background: var(${(props: InputProps) => props.bgColor || "--Light"});
  color: var(${(props: InputProps) => props.textColor || "--Dark"});
  font-family: var(--Heading);
  font-size: ${(props: InputProps) => props.fontSize || "1rem"};
  border: 1px solid var(--Dark);
  box-shadow: 2px 4px 0px 0px var(--Dark);
  &:focus {
    border: 2px solid var(--Green);
  }
`;
