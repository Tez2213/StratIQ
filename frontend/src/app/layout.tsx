import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StratIQ - AI Trading Agent",
  description: "Autonomous trading agent that learns from Recall Network's top performers while maintaining user control through Vincent's permission system.",
  keywords: ["AI", "trading", "blockchain", "DeFi", "hackathon", "Recall", "Vincent"],
  authors: [{ name: "StratIQ Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
