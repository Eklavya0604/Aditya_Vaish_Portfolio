"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const transitionRef = useRef<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to light theme since it's the current default
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    const next = theme === "light" ? "dark" : "light";

    const applyTheme = (t: Theme) => {
      setTheme(t);
      localStorage.setItem("theme", t);
      if (t === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (!document.startViewTransition || !e) {
      document.documentElement.classList.add("theme-transitioning");
      applyTheme(next);
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 2100);
      return;
    }

    let x = e.clientX;
    let y = e.clientY;

    if (e.currentTarget) {
      const target = e.currentTarget as HTMLElement;
      
      // Only fallback to bounding box for keyboard events (x=0, y=0)
      // We avoid getBoundingClientRect() on touch/mouse because Chrome mobile has a bug
      // where it can return 0,0 on the first click after reload due to GSAP transforms.
      if (x === 0 && y === 0) {
        const rect = target.getBoundingClientRect();
        
        if (rect.width > 0 && rect.height > 0) {
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        } else {
          // Ultimate fallback for Android Chrome where even the bounding box completely fails
          if (target.classList.contains("spectacles-icon-hero")) {
            x = window.innerWidth / 2;
            y = window.innerHeight / 2;
          } else {
            // Floating icon approximation
            x = window.innerWidth - 40;
            y = 100;
          }
        }
      }
      
      // The center spectacles visually appear slightly lower than their mathematical center
      // on production mobile devices due to the viewBox and browser URL bars.
      // Nudge the epicenter down to perfectly align it with the visual glasses.
      if (target.classList.contains("spectacles-icon-hero")) {
        const isMobile = window.innerWidth < 768;
        y += isMobile ? 30 : 15;
      }
    }

    // Calculate exact distance to farthest corner
    const maxRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    
    // Use a fixed 100px buffer instead of a 1.5x multiplier to prevent excessively huge radii
    const endRadius = maxRadius + 100;

    if (transitionRef.current) {
      transitionRef.current.skipTransition();
    }

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.add("disable-transitions");
      applyTheme(next);
    });
    
    transitionRef.current = transition;

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 2500, // Slightly longer duration for smoothness
          delay: 50,
          fill: "both",
          // Use a smoother ease-in-out instead of an aggressive ease-out
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("disable-transitions");
      transitionRef.current = null;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
