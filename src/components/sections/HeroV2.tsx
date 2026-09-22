"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SpectaclesIcon from "@/components/ui/SpectaclesIcon";
import { useTheme } from "@/components/ThemeProvider";

const socials = [
  {
    name: "Github",
    url: "https://github.com/Eklavya0604",
    sub1: "SOURCE /",
    sub2: "PROJECTS",
    icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aditya-vaish-482a11281/",
    sub1: "PROFESSIONAL",
    sub2: "/ NETWORK",
    icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>
  },
  {
    name: "Email",
    url: "mailto:kumareklavya744@gmail.com",
    sub1: "DIRECT",
    sub2: "CONTACT",
    icon: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/aditya_k.__/?__pwa=1",
    sub1: "PERSONAL /",
    sub2: "SOCIAL",
    icon: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>
  }
];

const titles = [
  "Software Developer",
  "Designer",
  "Frontend Developer",
  "Backend Engineer"
];

export default function HeroV2() {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Simple staggered fade in for elements
      tl.fromTo(
        ".hero-stagger",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );

      tl.fromTo(
        ".spectacles-icon",
        { scale: 0.8, opacity: 0, rotation: -5 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      );
    }, containerRef);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (!textRef.current) return;
      gsap.to(textRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          currentIndex = (currentIndex + 1) % titles.length;
          if (textRef.current) {
            textRef.current.innerText = titles[currentIndex];
            gsap.fromTo(
              textRef.current,
              { y: 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3 }
            );
          }
        },
      });
    }, 2500);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75svh] md:min-h-[100svh] w-full flex flex-col justify-center px-4 md:px-8 lg:px-12 pt-28 pb-4 md:pt-32 md:pb-0"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.08]"
        style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col items-center justify-center -translate-y-8 md:-translate-y-16">

        {/* Main Typography Column */}
        <div className="flex flex-col items-center justify-center w-full max-w-5xl relative z-20 text-center">

          {/* Spectacles SVG positioned above the title in the center */}
          <button 
            onClick={toggleTheme}
            className="spectacles-icon group/spec flex w-full max-w-[120px] md:max-w-[180px] lg:max-w-[220px] z-10 cursor-pointer mb-2 transition-transform hover:scale-105 active:scale-95"
            aria-label="Toggle Theme"
          >
            <SpectaclesIcon className="w-full h-auto text-signal-red drop-shadow-sm opacity-90 group-hover/spec:opacity-100 mx-auto transition-opacity duration-300" />
          </button>

          <h1 className="hero-stagger font-tech text-[clamp(3.2rem,11vw,9rem)] leading-[0.95] font-bold tracking-[0.02em] uppercase mb-4 md:mb-6 text-foreground text-center whitespace-nowrap">
            Aditya Vaish
          </h1>

          <div className="hero-stagger font-dot text-signal-red text-base md:text-xl tracking-widest uppercase mb-8 md:mb-12 h-8 flex justify-center items-center w-full">
            <span ref={textRef} className="inline-block text-center">Software Developer</span>
          </div>

          <div className="hero-stagger grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-x-2 gap-y-6 md:gap-x-6 md:gap-y-4 mb-2 md:mb-12">
            {socials.map((social, idx) => (
              <div key={social.name} className="flex items-center md:gap-6">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center md:justify-start gap-2 md:gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-signal-red transition-colors duration-300 md:w-[28px] md:h-[28px] shrink-0">
                    {social.icon}
                  </svg>
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-1 font-tech tracking-widest text-[11px] md:text-sm font-bold text-foreground group-hover:text-signal-red transition-colors duration-300">
                      {social.name} <span className="text-signal-red">↗</span>
                    </div>
                    <div className="font-mono text-[8px] md:text-[9px] text-muted tracking-widest leading-tight mt-0.5 uppercase">
                      {social.sub1} <span className="md:hidden">{social.sub2}</span>
                      <br className="hidden md:block" />
                      <span className="hidden md:block">{social.sub2}</span>
                    </div>
                  </div>
                </a>
                {idx !== socials.length - 1 && (
                  <div className="hidden md:block w-px h-8 bg-border ml-6" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
