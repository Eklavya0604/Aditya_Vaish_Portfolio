"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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
          <div className="hero-stagger font-mono text-xs md:text-sm text-secondary tracking-widest mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-signal-red" />
            SYS.INIT // PORTFOLIO_V2
          </div>

          <h1 className="hero-stagger text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] font-bold tracking-tighter uppercase mb-8 text-black">
            Digital<br />
            <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px var(--color-black)' }}>
              Product
            </span><br />
            Engineer
          </h1>

          <p className="hero-stagger font-sans text-muted text-[clamp(1rem,1.5vw,1.25rem)] max-w-xl leading-relaxed mb-12">
            I architect and build technical interfaces. Minimalist by design, 
            engineered for precision. Specializing in React, Next.js, and 
            industrial UI systems.
          </p>

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

        {/* Technical Data Column */}
        <div className="col-span-4 md:col-span-4 lg:col-span-3 flex flex-col justify-end md:pb-12 gap-12 mt-16 md:mt-0">
          <div className="hero-stagger flex flex-col gap-2">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Location</span>
            <span className="font-tech text-sm text-black">EARTH // INDIA</span>
          </div>

          <div className="hero-stagger flex flex-col gap-2">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Focus</span>
            <span className="font-tech text-sm text-black">FRONTEND_SYS</span>
            <span className="font-tech text-sm text-black">INTERFACE_DEV</span>
            <span className="font-tech text-sm text-black">ANIMATION</span>
          </div>

          {/* Decorative Technical Element */}
          <div className="hero-stagger mt-8 w-full h-32 border border-border flex items-end justify-end p-4 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-2 h-2 border-b border-r border-signal-red m-2 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-t border-l border-signal-red m-2 opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="font-dot text-xs text-secondary group-hover:text-signal-red transition-colors duration-300">
               NODE_READY
             </span>
          </div>
        </div>

      </div>
    </section>
  );
}
