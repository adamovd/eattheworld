import type { Metadata } from "next";
import "../globals.css";
import NextAuthProvider from "../Context/Providers";
import AdminNavbar from "../Components/Nav/AdminNavbar";

export const metadata: Metadata = {
  title: "Admin - Eat The World",
  description: "Admin page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <AdminNavbar />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
