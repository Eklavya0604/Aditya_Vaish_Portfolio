"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  staggerChildren?: boolean;
  staggerClass?: string;
  yOffset?: number;
  duration?: number;
  staggerDuration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  staggerChildren = false,
  staggerClass = "reveal-item",
  yOffset = 30,
  duration = 1.2,
  staggerDuration = 0.2,
  className = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const target = staggerChildren ? `.${staggerClass}` : containerRef.current;

      gsap.fromTo(
        target,
        { y: yOffset, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          stagger: staggerChildren ? staggerDuration : 0,
          ease: "power2.out",
          clearProps: "transform", // Crucial for position: sticky to work inside
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse", // Replays animation when scrolling back up
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [staggerChildren, staggerClass, yOffset, duration, staggerDuration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
