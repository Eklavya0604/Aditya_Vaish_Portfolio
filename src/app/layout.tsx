import type { Metadata, Viewport } from "next";
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
  "Aditya Kumar Vaish is a freelance Software Engineer in Delhi NCR building Java, Spring Boot, React, backend, and full-stack web products for startups.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adityavaish.dev"),
  alternates: {
    canonical: '/',
  },
  applicationName: "Aditya Kumar Vaish Portfolio",
  title: {
    default: "Aditya Kumar Vaish | Freelance Software Engineer in Delhi NCR",
    template: "%s | Aditya Kumar Vaish",
  },
  description,
  verification: {
    other: {
      "msvalidate.01": "77CEA95ABE6459A4ACD55C56FD9ACFAD",
    },
  },
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
  authors: [{ name: "Aditya Kumar Vaish", url: "https://www.adityavaish.dev" }],
  creator: "Aditya Kumar Vaish",
  publisher: "Aditya Kumar Vaish",
  category: "technology",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adityavaish.dev",
    title: "Aditya Kumar Vaish | Freelance Software Engineer in Delhi NCR",
    description,
    siteName: "Aditya Kumar Vaish Portfolio",
    images: [{
      url: "https://www.adityavaish.dev/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Aditya Kumar Vaish — Freelance Software Engineer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar Vaish | Freelance Software Engineer in Delhi NCR",
    description,
    images: ["https://www.adityavaish.dev/twitter-image"],
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1d" },
  ],
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
