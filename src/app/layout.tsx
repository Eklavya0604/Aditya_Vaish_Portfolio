import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import FloatingThemeToggle from "@/components/ui/FloatingThemeToggle";
import Loader from "@/components/ui/Loader";
import '@/components/sections/Skills.css'
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Aditya Kumar Vaish | Backend Engineer",
    template: "%s | Aditya Kumar Vaish",
  },
  description: "Software Engineer specializing in Backend Development, Java, Spring Boot, and Distributed Systems.",
  keywords: [
    "Aditya Kumar Vaish",
    "Aditya Vaish",
    "Aditya",
    "Vaish",
    "Backend Engineer",
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
    url: "https://adityavaish.dev",
    title: "Aditya Kumar Vaish | Backend Engineer",
    description: "Software Engineer specializing in Backend Development, Java, Spring Boot, and Distributed Systems.",
    siteName: "Aditya Kumar Vaish Portfolio",
    images: [
      {
        url: "/assets/Profile_picture.png",
        width: 800,
        height: 1000,
        alt: "Aditya Kumar Vaish - Backend Engineer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar Vaish | Backend Engineer",
    description: "Software Engineer specializing in Backend Development, Java, Spring Boot, and Distributed Systems.",
    images: ["/assets/Profile_picture.png"],
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
        <ThemeProvider>
          <Loader />

          <FloatingThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
