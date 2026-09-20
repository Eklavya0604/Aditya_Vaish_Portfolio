"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "SpringSentinel",
    type: "MICROSERVICE",
    description: "High-performance Spring Boot microservice with Redis-based atomic guardrails. Features rate limiting, JWT, and real-time virality scoring.",
    link: "https://github.com/Eklavya0604/SpringSentinel",
  },
  {
    id: "02",
    title: "Business Connect Pro",
    type: "FULL_STACK",
    description: "Local service marketplace platform. Features end-to-end service tracking, review modules, and WhatsApp API automation.",
    link: "https://github.com/Eklavya0604/business-connect-pro",
  },
  {
    id: "03",
    title: "SpamShield",
    type: "MACHINE_LEARNING",
    description: "Email spam classification system using NLP. Achieved ~95% accuracy using TF-IDF, Naive Bayes, and Logistic Regression.",
    link: "https://github.com/Eklavya0604/SpamShield",
    paperLink: "https://www.inderscienceonline.com/doi/abs/10.1504/IJCE.2026.155529",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
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
      id="projects"
      ref={sectionRef}
      className="w-full bg-white text-black py-24 md:py-40 px-4 md:px-8 lg:px-12"
    >
      <div className="max-w-[1440px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="font-dot text-3xl md:text-5xl uppercase tracking-tight mb-2 text-black">
              02<br />
              <span className="text-signal-red">Projects</span>
            </h2>
            <div className="font-mono text-[10px] text-black/60 tracking-widest uppercase">
              WORK // RECENT_BUILD
            </div>
          </div>

          <div className="font-dot text-xs text-black/50">
            INDEX [03]
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group border border-black/20 p-6 md:p-8 flex flex-col justify-between min-h-[320px] hover:border-signal-red transition-colors duration-500 relative overflow-hidden"
            >
              {/* Top Meta */}
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-[10px] text-black/50 tracking-widest">{project.id}</span>
                <span className="font-mono text-[10px] text-black/60 uppercase border border-black/20 px-2 py-1 group-hover:border-signal-red group-hover:text-signal-red transition-colors duration-500">
                  {project.type}
                </span>
              </div>

              {/* Title & Desc */}
              <div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-black">{project.title}</h3>
                <p className="font-sans text-black/70 text-sm leading-relaxed mb-8 max-w-sm">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-y-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-tech text-xs tracking-widest uppercase text-black/60 group-hover:text-signal-red transition-colors duration-300"
                >
                  <span className="w-6 h-[1px] bg-black/60 group-hover:bg-signal-red group-hover:w-12 transition-all duration-500" />
                  View Node
                </a>

                {/* @ts-ignore */}
                {project.paperLink && (
                  <a
                    href={project.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-mono text-[9px] tracking-widest uppercase text-signal-red border border-signal-red/30 hover:bg-signal-red hover:text-white px-2 py-1 transition-all duration-300"
                  >
                    Published
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
