"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };
    checkTouch();

    if (isTouchDevice) return;

    const cursor = document.getElementById("custom-cursor");
    const cursorDot = document.getElementById("custom-cursor-dot");
    if (!cursor || !cursorDot) return;

    // Fast follow for the inner dot
    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power2.out" });
    
    // Slower follow for the outer structural ring
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3.out" });

    const moveDot = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHover = () => {
      gsap.to(cursorDot, {
        scale: 2.5,
        backgroundColor: "var(--color-signal-red)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: "var(--color-signal-red)",
        opacity: 0.5,
        duration: 0.3,
      });
    };

    const handleHoverOut = () => {
      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: "var(--color-white)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        scale: 1,
        borderColor: "var(--color-muted)",
        opacity: 1,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveDot);

    // Add hover effect to all links and buttons
    const interactiveElements = document.querySelectorAll("a, button, input, select, textarea");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    // Hide default cursor on body if not touch
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveDot);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      document.body.style.cursor = "auto";
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        id="custom-cursor"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-muted pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
      >
      </div>
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
