"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [isComplete, setIsComplete] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const txt1Ref = useRef<HTMLSpanElement>(null);
  const txt2Ref = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Step 1: Wait for fonts
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  // Step 2: Run animation only after fonts are loaded
  useEffect(() => {
    if (!fontsReady) return;

    const container = containerRef.current;
    const txt1 = txt1Ref.current;
    const txt2 = txt2Ref.current;
    const bar = barRef.current;
    const root = rootRef.current;
    const chars = charRefs.current.filter(Boolean);

    if (!container || !txt1 || !txt2 || !bar || !root) return;

    // Make visible now that we're ready
    container.style.visibility = "visible";

    // ── Measure natural widths ──
    const txt1W = txt1.scrollWidth;
    const txt2W = txt2.scrollWidth;

    // ── Dynamic equivalents for the template's magic numbers ──
    const barExpandW = txt2W + 8;
    const containerShiftX = Math.round(txt2W / 2);

    // Set container width
    gsap.set(container, { width: txt1W + txt2W });

    // ── Colors ──
    const color1 = "#1B1B1D";
    const color2 = "#D71921";

    // ── moveBar: identical to template ──
    const moveBar = () => {
      gsap.set(bar, { left: (gsap.getProperty(txt1, "width") as number) + 1 });
    };

    // ── Build timeline: 1:1 copy of template ──
    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        // Step 1: Fade out the text content first
        gsap.to(container, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            // Step 2: Then fade the white background
            gsap.to(root, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => setIsComplete(true),
            });
          },
        });
      },
    });

    // .set('.txt1', {color:color1, fontWeight:'regular'})
    tl.set(txt1, { color: color1, fontWeight: "400" });

    // .set('.txt2', {color:color2, fontWeight:'bold', opacity:0, x:txt1W-2, immediateRender:true})
    tl.set(txt2, {
      color: color2,
      fontWeight: "700",
      opacity: 0,
      x: txt1W - 2,
      immediateRender: true,
    });

    // .set('.bar', {left:1, backgroundColor:color1, immediateRender:true})
    tl.set(bar, { left: 1, backgroundColor: color1, immediateRender: true });

    // .to('.bar', {duration:0.1, opacity:0, ease:Expo.easeIn, yoyo:true, repeat:5, repeatDelay:0.3}, 0)
    tl.to(
      bar,
      { duration: 0.1, opacity: 0, ease: "expo.in", yoyo: true, repeat: 5, repeatDelay: 0.3 },
      0
    );

    // .from('.txt1', {duration:1.1, width:0, ease:SteppedEase.config(14), onUpdate:moveBar}, 2.5)
    tl.from(
      txt1,
      { duration: 1.1, width: 0, ease: "steps(14)", onUpdate: moveBar },
      2.5
    );

    // .to('.bar', {duration:0.05, backgroundColor:color2}, '+=0.15')
    tl.to(bar, { duration: 0.05, backgroundColor: color2 }, "+=0.15");

    // .to('.bar', {duration:1.0, width:290, ease:Power4.easeInOut}, '+=0.1')
    tl.to(bar, { duration: 1.0, width: barExpandW, ease: "power4.inOut" }, "+=0.1");

    // .from('.container', {duration:1.0, x:135, ease:Power4.easeInOut}, '-=1.0')
    tl.from(container, { duration: 1.0, x: containerShiftX, ease: "power4.inOut" }, "-=1.0");

    // .to('.txt2', {duration:0.01, opacity:1}, '-=0.1')
    tl.to(txt2, { duration: 0.01, opacity: 1 }, "-=0.1");

    // .to('.bar', {duration:0.4, x:290, width:0, ease:Power4.easeIn})
    tl.to(bar, { duration: 0.4, x: barExpandW, width: 0, ease: "power4.in" });

    // .from(t2, {duration:0.6, opacity:0, ease:Power3.easeInOut, stagger:0.02}, '-=0.5')
    tl.from(chars, { duration: 0.6, opacity: 0, ease: "power3.inOut", stagger: 0.02 }, "-=0.5");

    // .to('.txt1', {duration:1.5, opacity:0.25, ease:Power3.easeInOut}, '-=1.2')
    tl.to(txt1, { duration: 1.5, opacity: 0.25, ease: "power3.inOut" }, "-=1.2");

    // .timeScale(1.45)
    tl.timeScale(1.45);

    return () => {
      tl.kill();
    };
  }, [fontsReady]);

  if (isComplete) return null;

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        width: "100%",
        height: "100%",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* .container */}
      <div
        ref={containerRef}
        style={{
          visibility: "hidden",
          fontSize: "clamp(24px, 5vw, 40px)",
          fontFamily: "'Red Hat Display', var(--font-space-mono), sans-serif",
          letterSpacing: "1.5px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "1.2em",
        }}
      >
        {/* .txt1 */}
        <span
          ref={txt1Ref}
          style={{
            display: "inline-block",
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
          portfolio.dev/
        </span>

        {/* .txt2 */}
        <span
          ref={txt2Ref}
          style={{
            display: "inline-block",
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
          {"aditya".split("").map((c, i) => (
            <span
              key={i}
              ref={(el) => {
                charRefs.current[i] = el;
              }}
              style={{ display: "inline-block" }}
            >
              {c}
            </span>
          ))}
        </span>

        {/* .bar */}
        <div
          ref={barRef}
          style={{
            display: "inline-block",
            position: "absolute",
            width: "3px",
            height: "1.2em",
            top: "-1px",
          }}
        />
      </div>
    </div>
  );
}
