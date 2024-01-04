import type { Metadata } from "next";
import "./Styles/globals.scss";
import NextAuthProvider from "./Context/Providers";
import Navbar from "./Components/Navbar";
import { Container } from "./Styles/Components/Containers";
import Footer from "./Components/Footer";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Eat The World",
  description: "Celebrating global gastronomy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex-col justify-evenly">
        <NextAuthProvider>
          <Navbar />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
