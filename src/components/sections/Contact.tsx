"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-fade",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending email
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-white text-black py-24 md:py-40 px-4 md:px-8 lg:px-12 relative"
    >
      <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-16">
        {/* Section start heading */}
        <div className="contact-fade flex flex-col gap-4">
          <h2 className="font-dot text-3xl md:text-5xl uppercase tracking-tight text-black">
            04<br />
            <span className="text-signal-red">Connect Me</span>
          </h2>
          <div className="font-mono text-[10px] text-black/60 tracking-widest uppercase">
            SYS // CONTACT
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-4 md:col-span-3">
            <h3
              className="contact-fade text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight text-black"
              style={{ fontFamily: "var(--font-ntype82)" }}
            >
              Let&apos;s Build<br />Together<span className="text-signal-red">.</span>
            </h3>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-5 flex flex-col gap-12">
          <p className="contact-fade font-sans text-xl md:text-2xl font-medium leading-tight text-black">
            Looking for a technical partner or just want to discuss an idea? Send a transmission below.
          </p>

          <form onSubmit={handleSubmit} className="contact-fade flex flex-col gap-6 w-full max-w-xl">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[10px] text-black/60 tracking-widest uppercase">Name // IDENT</label>
              <input
                type="text"
                id="name"
                required
                className="w-full bg-transparent border-b border-black/20 pb-2 font-sans text-base text-black focus:outline-none focus:border-signal-red transition-colors duration-300 placeholder:text-black/30"
                placeholder="Aditya"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[10px] text-black/60 tracking-widest uppercase">Email // ROUTE</label>
              <input
                type="email"
                id="email"
                required
                className="w-full bg-transparent border-b border-black/20 pb-2 font-sans text-base text-black focus:outline-none focus:border-signal-red transition-colors duration-300 placeholder:text-black/30"
                placeholder="aditya@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-[10px] text-black/60 tracking-widest uppercase">Message // DATA</label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-black/20 pb-2 font-sans text-base text-black focus:outline-none focus:border-signal-red transition-colors duration-300 placeholder:text-black/30 resize-none"
                placeholder="Transmission contents..."
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={status !== "idle"}
                className="font-mono text-xs tracking-widest uppercase text-signal-red border border-signal-red px-6 py-2 hover:bg-signal-red hover:text-white transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-signal-red group flex items-center gap-2"
              >
                {status === "idle" && "SUBMIT"}
                {status === "sending" && "TRANSMITTING..."}
                {status === "sent" && "RECEIVED"}

                {status === "idle" && (
                  <span className="w-4 h-[1px] bg-signal-red group-hover:bg-white transition-colors duration-300 inline-block ml-2" />
                )}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}
