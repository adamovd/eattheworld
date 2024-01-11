import styled from "styled-components";

export const LoadingContainer = styled.aside`
  width: 92vw;
  height: 96vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
  border-left: 1px solid var(--Dark);
  border-right: 1px solid var(--Dark);
  background: var(--Blue);
  animation: colorchange 5s infinite;

  img {
    animation: rotation 5s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes colorchange {
    from {
      background-color: var(--DarkGreen);
    }
    to {
      background-color: var(--Red);
    }
  }
`;
