"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation for mobile menu
  useEffect(() => {
    if (menuOpen) {
      gsap.to(".mobile-menu", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        display: "flex",
      });
      gsap.fromTo(
        ".mobile-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(".mobile-menu", {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(".mobile-menu", { display: "none" });
        },
      });
    }
  }, [menuOpen]);

  const navLinks = [
    { label: "01 / ABOUT", href: "#about" },
    { label: "02 / PROJECTS", href: "#projects" },
    { label: "03 / EXPERIENCE", href: "#experience" },
    { label: "04 / CONTACT", href: "#contact" },
    { label: "05 / RESUME", href: "https://drive.google.com/file/d/10UXTvhUK6dMjz4Vu_8Ot5y3Szfonkr9s/view?usp=drive_link", external: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo / Identity */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-3 h-3 bg-black group-hover:bg-signal-red transition-colors duration-300" />
            <span className="text-sm uppercase tracking-widest text-black group-hover:text-signal-red transition-colors duration-300" style={{ fontFamily: "'DotMatrix', monospace" }}>
              Aditya Kumar Vaish
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-dot text-sm text-muted hover:text-signal-red transition-colors duration-300 relative group overflow-hidden flex items-start gap-1 py-0.5"
              >
                <span>{link.label}</span>
                {link.external && (
                  <svg className="w-3 h-3 text-signal-red transform translate-y-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                )}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-signal-red transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </Link>
            ))}
            <div className="w-px h-4 bg-border mx-2" />
            <div className="font-dot text-[10px] text-secondary flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-signal-red rounded-full animate-pulse" />
              SYS.STATUS // ONLINE
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`w-6 h-px bg-black transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px] bg-signal-red" : "group-hover:bg-signal-red"
                }`}
            />
            <span
              className={`w-6 h-px bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : "group-hover:bg-signal-red"
                }`}
            />
            <span
              className={`w-6 h-px bg-black transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px] bg-signal-red" : "group-hover:bg-signal-red"
                }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Takeover */}
      <div className="mobile-menu fixed inset-0 z-40 bg-black flex-col justify-center items-start hidden pl-8 pr-8 md:pl-16">
        <nav className="flex flex-col items-start gap-8 w-full max-w-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="mobile-link font-dot text-2xl tracking-widest text-white hover:text-signal-red transition-colors duration-300 w-full text-left border-b border-border pb-4 relative flex items-center justify-start gap-3"
            >
              {link.label}
              {link.external && (
                <svg className="w-5 h-5 text-signal-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              )}
            </Link>
          ))}
          <div className="mobile-link font-dot text-xs text-secondary mt-12 flex items-center justify-start gap-2">
            <span className="inline-block w-2 h-2 bg-signal-red rounded-full animate-pulse" />
            SYS.STATUS // ONLINE
          </div>
        </nav>
      </div>
    </>
  );
}
