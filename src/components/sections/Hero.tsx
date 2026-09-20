"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const socials = [
  {
    name: "GITHUB",
    url: "https://github.com/Eklavya0604",
    sub1: "SOURCE /",
    sub2: "PROJECTS",
    icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  },
  {
    name: "LINKEDIN",
    url: "https://www.linkedin.com/in/aditya-vaish-482a11281/",
    sub1: "PROFESSIONAL",
    sub2: "/ NETWORK",
    icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>
  },
  {
    name: "EMAIL",
    url: "mailto:kumareklavya744@gmail.com",
    sub1: "DIRECT",
    sub2: "CONTACT",
    icon: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>
  },
  {
    name: "INSTAGRAM",
    url: "https://www.instagram.com/aditya_k.__/?__pwa=1",
    sub1: "PERSONAL /",
    sub2: "SOCIAL",
    icon: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Simple staggered fade in for elements
      tl.fromTo(
        ".hero-stagger",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-center px-4 md:px-8 lg:px-12 pt-20"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(var(--color-white) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 relative z-10">

        {/* Main Typography Column */}
        <div className="col-span-4 md:col-span-8 lg:col-span-9 flex flex-col justify-center">
          <h1 className="hero-stagger text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] font-bold tracking-tighter uppercase mb-8 text-black">
            Aditya<br />
            <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px var(--color-black)' }}>
              Kumar
            </span><br />
            Vaish
          </h1>

          <p className="hero-stagger font-sans text-muted text-[clamp(1rem,1.5vw,1.25rem)] max-w-xl leading-relaxed mb-12">
            I architect and build technical interfaces. Minimalist by design,
            engineered for precision. Specializing in React, Next.js, and
            industrial UI systems.
          </p>

          <div className="hero-stagger flex flex-wrap items-center gap-x-6 gap-y-4 mb-12">
            {socials.map((social, idx) => (
              <div key={social.name} className="flex items-center gap-6">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black group-hover:text-signal-red transition-colors duration-300">
                    {social.icon}
                  </svg>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1 font-tech text-sm font-bold text-black group-hover:text-signal-red transition-colors duration-300">
                      {social.name} <span className="text-signal-red">↗</span>
                    </div>
                    <div className="font-mono text-[9px] text-muted tracking-widest text-left leading-tight mt-0.5 uppercase">
                      {social.sub1}<br />{social.sub2}
                    </div>
                  </div>
                </a>
                {idx !== socials.length - 1 && (
                  <div className="hidden lg:block w-px h-8 bg-border" />
                )}
              </div>
            ))}
          </div>

          <div className="hero-stagger flex flex-wrap items-center gap-6">
            <a
              href="#projects"
              className="group flex items-center gap-3 font-tech text-sm uppercase tracking-wider text-black hover:text-signal-red transition-colors duration-300"
            >
              <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-signal-red transition-colors duration-300">
                <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-black group-hover:text-signal-red">→</span>
              </div>
              View Architecture
            </a>
          </div>
        </div>



      </div>
    </section>
  );
}
