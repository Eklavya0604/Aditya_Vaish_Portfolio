"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-fade",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="w-full bg-white text-black py-24 md:py-40 px-4 md:px-8 lg:px-12 relative"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Header / Meta */}
        <div className="col-span-4 md:col-span-3 flex flex-col gap-6">
          <h2 className="about-fade font-tech text-3xl md:text-5xl uppercase tracking-tight text-black">
            01<br />
            <span className="text-signal-red">About</span>
          </h2>
          <div className="about-fade font-mono text-[10px] text-black/60 tracking-widest uppercase mt-4">
            IDENT // ADITYA_K_V
            <br />SYS // DEV_ENV
          </div>
        </div>

        {/* Content */}
        <div className="col-span-4 md:col-span-9 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Portrait/Profile */}
          <div className="about-fade relative w-full md:w-1/2 aspect-[4/5] border border-black/20 flex items-center justify-center overflow-hidden group">
            {/* The actual image */}
            <Image
              src="/assets/Profile_picture.png"
              alt="Aditya Profile"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Overlay grid/technical markers */}
            <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-signal-red transition-colors duration-500 z-10 mix-blend-difference" />
            <div className="absolute top-4 left-4 w-2 h-2 bg-signal-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          </div>

          {/* Text Content */}
          <div className="about-fade flex-1 flex flex-col gap-8 max-w-xl">
            <h3 className="font-sans text-2xl md:text-3xl font-medium leading-tight text-black">
              I build scalable, technically precise frontend architectures with an obsessive focus on performance and minimalist design.
            </h3>
            
            <div className="font-sans text-black/70 space-y-6 text-base md:text-lg leading-relaxed">
              <p>
                My approach bridges the gap between raw engineering and industrial design. 
                I believe that digital products should feel robust, tactile, and stripped 
                of unnecessary noise.
              </p>
              <p>
                By treating code as a structural material, I expose the technical beauty of 
                web systems—focusing on strict grids, modular components, and responsive 
                fluidity over superficial decoration.
              </p>
            </div>

            {/* Core Tech Stack */}
            <div className="mt-8 pt-8 border-t border-black/20">
              <span className="font-mono text-[10px] text-black/60 tracking-widest uppercase mb-4 block">
                CORE_MODULES
              </span>
              <ul className="grid grid-cols-2 gap-y-3 font-tech text-sm text-black">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-black" /> React / Next.js</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-black" /> TypeScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-black" /> Tailwind CSS</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-black" /> GSAP / Motion</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-black" /> Node.js</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-signal-red" /> UI/UX Design</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
