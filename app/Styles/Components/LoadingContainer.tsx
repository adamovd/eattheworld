import styled from "styled-components";

export const LoadingContainer = styled.aside`
  width: 92vw;
  height: 96vh;
  z-index: 0;
  border-left: 1px solid var(--Dark);
  border-right: 1px solid var(--Dark);
  background: var(--Blue);
  animation: colorchange 5s infinite;

  @keyframes colorchange {
    from {
      background-color: var(--DarkGreen);
    }
    to {
      background-color: var(--Red);
    }
  }
`;
