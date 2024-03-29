import type { Metadata } from "next";
import "@/app/Styles/globals.scss";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import NextAuthProvider from "./Context/Providers";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
    <html lang="en">
      <body>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <NextAuthProvider>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
