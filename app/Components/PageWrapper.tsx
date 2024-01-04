"use client";
import { Container } from "../Styles/Components/Containers";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <Container
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
  >
    {children}
  </Container>
);

export default PageWrapper;
