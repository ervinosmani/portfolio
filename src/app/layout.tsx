import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SignatureCursor from "./editorial/SignatureCursor";
import SmoothAnchorNavigation from "./editorial/SmoothAnchorNavigation";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-editorial-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-editorial-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ervinosmani.vercel.app"),
  title: "Ervin Osmani | Software Developer",
  description:
    "Selected software engineering work, technical case studies, and professional experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <SmoothAnchorNavigation />
        <SignatureCursor />
        {children}
      </body>
    </html>
  );
}
