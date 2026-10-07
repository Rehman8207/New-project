import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PathWay | Career & Skill Roadmaps for Students",
  description:
    "Pakistan ka #1 career roadmap platform — Web Dev, AI, Freelancing, MDCAT, IELTS aur bahut kuch. Apna future aaj plan karo.",
  keywords: [
    "career roadmap",
    "Pakistan students",
    "web development course",
    "AI ML learning",
    "freelancing guide",
    "MDCAT preparation",
    "IELTS SAT",
  ],
  metadataBase: new URL("https://pathway.pk"),
  openGraph: {
    title: "PathWay | Career & Skill Roadmaps for Students",
    description:
      "Pakistan ka #1 career roadmap platform — apna future roadmap ke saath banao.",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
