import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sreedev Krishna | Architecting Intelligence",
  description: "Cinematic Portfolio of Sreedev Krishna - Engineering Boundless Intelligence & Sculpting Immersive Digital Realities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-obsidian text-ghost`}>
      <body className="antialiased overflow-x-hidden selection:bg-electric/30">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
