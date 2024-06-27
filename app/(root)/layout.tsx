
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import SessionWrapper from "@/lib/providers/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdhamShopMaster",
  description:
    "Discover AdhamShopMaster, a premier e-commerce platform with an integrated admin dashboard for seamless online retail management. Enjoy a modern, user-friendly interface designed to enhance your shopping and business experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider/>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
