import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";
import '@/components/sections/Skills.css'
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityavaish.dev"),
  title: {
    default: "Aditya Kumar Vaish | Backend Engineer",
    template: "%s | Aditya Kumar Vaish",
  },
  description: "Software Engineer specializing in Backend Development, Java, Spring Boot, and Distributed Systems.",
  keywords: [
    "Aditya Kumar Vaish",
    "Backend Engineer",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "React",
    "Portfolio",
    "Ghaziabad",
  ],
  authors: [{ name: "Aditya Kumar Vaish", url: "https://adityavaish.dev" }],
  creator: "Aditya Kumar Vaish",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityavaish.dev",
    title: "Aditya Kumar Vaish | Backend Engineer",
    description: "Software Engineer specializing in Backend Development, Java, Spring Boot, and Distributed Systems.",
    siteName: "Aditya Kumar Vaish",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar Vaish | Backend Engineer",
    description: "Software Engineer specializing in Backend Development, Java, Spring Boot, and Distributed Systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-signal-red selection:text-white">
        <Loader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
