"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";

const techLogos = [
  "/SVG_Tech/java-logo-svgrepo-com.svg",
  "/SVG_Tech/spring-svgrepo-com.svg",
  "/SVG_Tech/javascript-logo-svgrepo-com.svg",
  "/SVG_Tech/typescript-svgrepo-com.svg",
  "/SVG_Tech/react-javascript-js-framework-facebook-svgrepo-com.svg",
  "/SVG_Tech/next-js-seeklogo.svg",
  "/SVG_Tech/nodejs-logo-svgrepo-com.svg",
  "/SVG_Tech/html-5-svgrepo-com.svg",
  "/SVG_Tech/css-3-svgrepo-com.svg",
  "/SVG_Tech/tailwindcss-logotype.svg",
  "/SVG_Tech/python-3-logo-svgrepo-com.svg",
  "/SVG_Tech/mysql-logo-svgrepo-com.svg",
  "/SVG_Tech/postgresql-seeklogo.svg",
  "/SVG_Tech/MongoDB_Fores-Green.svg",
  "/SVG_Tech/Redis-Logo.wine.svg",
  "/SVG_Tech/docker-svgrepo-com.svg",
  "/SVG_Tech/google-cloud-seeklogo.png",
  "/SVG_Tech/firebase-seeklogo.svg",
  "/SVG_Tech/Git-Logo-2Color.svg",
  "/SVG_Tech/GitHub_Lockup_Black.svg",
  "/SVG_Tech/maven-svgrepo-com.svg",
  "/SVG_Tech/postman-svgrepo-com.svg",
  "/SVG_Tech/figma lockup.svg",
  "/SVG_Tech/canva-seeklogo.svg",
  "/SVG_Tech/openai-logo-svg_svgstack_com_37411790054677.svg",
];

export default function TechStack() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let lastActiveIndex: number | null = null;

    const checkCenter = () => {
      const centerX = window.innerWidth / 2;
      let closestIdx: number | null = null;
      let minDistance = Infinity;

      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - elCenterX);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      // Only highlight if it's within a reasonable distance from the center
      if (minDistance > 200) {
        closestIdx = null;
      }

      // Update React state only if the active index actually changes
      if (closestIdx !== lastActiveIndex) {
        lastActiveIndex = closestIdx;
        setActiveIndex(closestIdx);
      }

      animationFrameId = requestAnimationFrame(checkCenter);
    };

    animationFrameId = requestAnimationFrame(checkCenter);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="w-full bg-white pt-24 pb-4 z-10 relative overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 120s linear infinite;
          width: max-content;
        }
      `}</style>

      <ScrollReveal staggerChildren staggerClass="tech-fade" className="w-full">
        <header className="tech-fade flex items-center w-full px-4 md:px-8 lg:px-12 pb-8 md:pb-12">
          <h2 className="font-dot text-3xl md:text-5xl uppercase tracking-tight m-0 text-signal-red">
            Skills
          </h2>
        </header>

        <div className="tech-fade w-full relative flex overflow-hidden py-10">
          <div className="flex animate-scroll items-center">
          {[...techLogos, ...techLogos, ...techLogos, ...techLogos].map((src, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                ref={(el) => { itemsRef.current[idx] = el; }}
                className={`relative flex items-center justify-center transition-all duration-800 ease-in-out shrink-0 mx-4 md:mx-6 h-16 md:h-20 w-24 md:w-32 ${isActive
                  ? "scale-125 -translate-y-2 grayscale-0 opacity-100"
                  : "scale-100 translate-y-0 grayscale opacity-60"
                  }`}
              >
                <Image
                  src={src}
                  alt="Tech Logo"
                  width={128}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            );
          })}
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
