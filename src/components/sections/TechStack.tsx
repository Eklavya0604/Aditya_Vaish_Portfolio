"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";

const techLogos = [
  { src: "/SVG_Tech/java-logo-svgrepo-com.svg", name: "Java" },
  { src: "/SVG_Tech/spring-svgrepo-com.svg", name: "Spring Boot" },
  { src: "/SVG_Tech/javascript-logo-svgrepo-com.svg", name: "JavaScript" },
  { src: "/SVG_Tech/typescript-svgrepo-com.svg", name: "TypeScript" },
  { src: "/SVG_Tech/react-javascript-js-framework-facebook-svgrepo-com.svg", name: "React" },
  { src: "/SVG_Tech/next-js-seeklogo.svg", name: "Next.js" },
  { src: "/SVG_Tech/nodejs-logo-svgrepo-com.svg", name: "Node.js" },
  { src: "/SVG_Tech/html-5-svgrepo-com.svg", name: "HTML5" },
  { src: "/SVG_Tech/css-3-svgrepo-com.svg", name: "CSS3" },
  { src: "/SVG_Tech/tailwindcss-logotype.svg", name: "Tailwind CSS" },
  { src: "/SVG_Tech/python-3-logo-svgrepo-com.svg", name: "Python" },
  { src: "/SVG_Tech/mysql-logo-svgrepo-com.svg", name: "MySQL" },
  { src: "/SVG_Tech/postgresql-seeklogo.svg", name: "PostgreSQL" },
  { src: "/SVG_Tech/MongoDB_Fores-Green.svg", name: "MongoDB" },
  { src: "/SVG_Tech/Redis-Logo.wine.svg", name: "Redis" },
  { src: "/SVG_Tech/docker-svgrepo-com.svg", name: "Docker" },
  { src: "/SVG_Tech/google-cloud-seeklogo.png", name: "Google Cloud" },
  { src: "/SVG_Tech/firebase-seeklogo.svg", name: "Firebase" },
  { src: "/SVG_Tech/Git-Logo-2Color.svg", name: "Git" },
  { src: "/SVG_Tech/GitHub_Lockup_Black.svg", name: "GitHub" },
  { src: "/SVG_Tech/maven-svgrepo-com.svg", name: "Maven" },
  { src: "/SVG_Tech/postman-svgrepo-com.svg", name: "Postman" },
  { src: "/SVG_Tech/figma lockup.svg", name: "Figma" },
  { src: "/SVG_Tech/canva-seeklogo.svg", name: "Canva" },
  { src: "/SVG_Tech/openai-logo-svg_svgstack_com_37411790054677.svg", name: "OpenAI" },
];

// Two copies is exactly what the -50% marquee needs to loop seamlessly.
const loop = [...techLogos, ...techLogos];

export default function TechStack() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let lastCheckTime = 0;
    let lastActiveIndex: number | null = null;

    const checkCenter = (time: number) => {
      // Throttle to ~150ms instead of every frame to avoid layout thrashing
      if (time - lastCheckTime > 150) {
        lastCheckTime = time;
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
      }

      rafId = requestAnimationFrame(checkCenter);
    };

    // Only measure while the marquee is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!rafId) rafId = requestAnimationFrame(checkCenter);
      } else {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-background pt-24 pb-4 z-10 relative overflow-hidden">
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
        <div className="w-full px-4 md:px-8 lg:px-12">
          <header className="tech-fade flex items-center w-full max-w-[1440px] mx-auto pb-8 md:pb-12">
            <h2 className="font-dot text-3xl md:text-5xl uppercase tracking-tight m-0 text-signal-red">
              Skills
            </h2>
          </header>
        </div>

        <div className="tech-fade w-full relative flex overflow-hidden py-10">
          <div className="flex animate-scroll items-center">
          {loop.map((tech, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={`${tech.name}-${idx}`}
                ref={(el) => { itemsRef.current[idx] = el; }}
                aria-hidden={idx >= techLogos.length}
                className={`relative flex items-center justify-center transition-all duration-800 ease-in-out shrink-0 mx-4 md:mx-6 h-16 md:h-20 w-24 md:w-32 ${isActive
                  ? "scale-125 -translate-y-2 grayscale-0 opacity-100"
                  : "scale-100 translate-y-0 grayscale opacity-60"
                  }`}
              >
                <Image
                  src={tech.src}
                  alt={tech.name}
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
