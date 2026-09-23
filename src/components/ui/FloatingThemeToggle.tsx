"use client";

import { useEffect, useState } from "react";
import SpectaclesIcon from "./SpectaclesIcon";
import { useTheme } from "../ThemeProvider";

export default function FloatingThemeToggle() {
  const { toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const isMobile = window.innerWidth < 768;
      const downThreshold = isMobile ? 150 : 250;
      const upThreshold = isMobile ? 60 : 120;
      
      setScrolled(prev => {
        if (y > downThreshold) return true;
        if (y < upThreshold) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-[80px] md:top-[90px] right-4 md:right-8 lg:right-12 z-50 flex items-center justify-center pointer-events-none">
      <button
        onClick={toggleTheme}
        className={`group/spec w-[60px] md:w-[80px] cursor-pointer transition-all duration-200 ease-out flex items-center justify-center ${
          scrolled 
            ? "opacity-100 blur-none pointer-events-auto" 
            : "opacity-0 blur-md pointer-events-none"
        }`}
        aria-label="Toggle Theme"
      >
        <SpectaclesIcon className="w-full h-auto text-signal-red drop-shadow-sm opacity-90 group-hover/spec:opacity-100 transition-opacity duration-300" />
      </button>
    </div>
  );
}
