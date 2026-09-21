"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: "01",
    role: "Software Engineer Intern",
    company: "Controlled",
    location: "Ghaziabad",
    period: "Jun 2026 - Present",
    skills: ["React", "TypeScript", "GSAP", "PostgreSQL", "Grafana"]
  },
  {
    id: "02",
    role: "Overall Coordinator",
    company: "GDG on Campus ABESEC",
    period: "Exora",
    skills: ["Next.js", "React", "GSAP", "Leadership"]
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full bg-white text-black py-24 md:py-40 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="font-dot text-3xl md:text-5xl uppercase tracking-tight mb-2 text-black">
              03<br />
              <span className="text-signal-red">Experience</span>
            </h2>
            <div className="font-mono text-[10px] text-black/60 tracking-widest uppercase">
              WORK // HISTORY
            </div>
          </div>
        </div>

        {/* Experience List */}
        <div className="flex flex-col gap-12 md:gap-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="experience-card group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative"
            >
              <div className="hidden md:block col-span-1 relative">
                <div className="w-3 h-3 bg-black/20 group-hover:bg-signal-red rounded-full transition-colors duration-500 absolute top-8 left-1/2 -translate-x-1/2 z-10" />
                {index !== experiences.length - 1 && (
                  <div className="w-px bg-black/10 absolute top-11 bottom-[-5rem] md:bottom-[-6rem] left-1/2 -translate-x-1/2 group-hover:bg-signal-red/30 transition-colors duration-500" />
                )}
              </div>

              {/* Content */}
              <div className="col-span-1 md:col-span-11 flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
                {/* Meta / Date */}
                <div className="md:w-1/4 shrink-0">
                  <div className="font-mono text-[10px] text-signal-red tracking-widest uppercase mb-2">
                    {exp.period}
                  </div>
                  <h3 className="font-tech tracking-wide text-xl md:text-2xl font-bold text-black mb-1">
                    {exp.company}
                  </h3>
                  {exp.location && (
                    <div className="font-mono text-[10px] text-black/40 tracking-wider uppercase mt-1">
                      {exp.location}
                    </div>
                  )}
                </div>

                {/* Role & Details */}
                <div className="md:w-3/4 flex flex-col border-l-2 border-black/5 md:border-none pl-4 md:pl-0">
                  <h4 className="font-sans text-lg md:text-xl text-black/80 mb-6">
                    {exp.role}
                  </h4>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {exp.skills.map(skill => (
                      <span key={skill} className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-black/10 text-black/50 group-hover:border-signal-red/50 group-hover:text-signal-red transition-colors duration-500">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
