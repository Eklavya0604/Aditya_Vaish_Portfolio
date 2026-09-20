import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";
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
  title: "Aditya Kumar Vaish — Portfolio",
  description: "Personal portfolio of Aditya Kumar Vaish. A technical and industrial design approach.",
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
