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
      }, 1500);
      return;
    }

    let x = e.clientX;
    let y = e.clientY;

    // Use the button's actual center for a perfect epicenter, especially on mobile touch
    if (e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // Multiply by 1.5 to guarantee coverage on mobile dynamic viewports (dvh)
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    ) * 1.5;

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
          duration: 1000,
          delay: 50,
          fill: "both",
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
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
