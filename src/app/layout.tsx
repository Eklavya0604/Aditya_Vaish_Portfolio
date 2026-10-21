import type { Metadata } from "next";
import { preload } from "react-dom";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import FloatingThemeToggle from "@/components/ui/FloatingThemeToggle";
import Loader from "@/components/ui/Loader";
import '@/components/sections/Skills.css'
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";

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

const description =
  "Software engineer in Delhi NCR building backend systems with Java, Spring Boot, React, and distributed systems. Open to freelance and contract work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adityavaish.dev"),
  alternates: {
    canonical: '/',
  },
  applicationName: "Aditya Kumar Vaish Portfolio",
  title: {
    default: "Aditya Kumar Vaish | Software Engineer in Delhi NCR",
    template: "%s | Aditya Kumar Vaish",
  },
  description,
  keywords: [
    "Aditya Kumar Vaish",
    "Aditya Vaish",
    "Software Engineer Delhi NCR",
    "Software Engineer Ghaziabad",
    "Freelance Backend Developer",
    "Freelance Java Developer",
    "Java Developer Delhi NCR",
    "Spring Boot Developer",
    "Backend Engineer",
    "Remote Backend Engineer India",
    "Software Developer",
    "Java Developer",
    "Spring Boot",
    "React",
    "Gorakhpur",
    "Ghaziabad",
    "B.tech CSE",
    "Computer Science and Engineering",
    "Software Engineer",
    "Distributed Systems"
  ],
  authors: [{ name: "Aditya Kumar Vaish", url: "https://adityavaish.dev" }],
  creator: "Aditya Kumar Vaish",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adityavaish.dev",
    title: "Aditya Kumar Vaish | Software Engineer in Delhi NCR",
    description,
    siteName: "Aditya Kumar Vaish Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar Vaish | Software Engineer in Delhi NCR",
    description,
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
  // The LCP element is the NType82 headline; start the fetch before CSS parses.
  preload("/fonts/NType82-Regular/NType82-Regular.otf", {
    as: "font",
    type: "font/otf",
    crossOrigin: "anonymous",
  });

  return (
    <html lang="en" className={`h-full antialiased ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-signal-red selection:text-white">
        <ThemeProvider>
          <Loader />
          <CustomCursor />
          <FloatingThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
