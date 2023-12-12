import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./Context/Providers";

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
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
