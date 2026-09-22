"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Word-to-word connection SVG animation component
// Encircles "ideas" and draws a curved arrow pointing to "products" in signal red
// Clean, seamless integration without any outer boxes, borders, or buttons
function IdeasToProductFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const srcWordRef = useRef<HTMLSpanElement>(null);
  const tgtWordRef = useRef<HTMLSpanElement>(null);
  const circleGroupRef = useRef<SVGGElement>(null);
  const circlePathRef = useRef<SVGPathElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const arrowHeadPosRef = useRef<SVGGElement>(null);
  const arrowHeadRef = useRef<SVGPolygonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const updatePositions = useCallback(() => {
    if (
      !svgRef.current ||
      !circlePathRef.current ||
      !circleGroupRef.current ||
      !arrowPathRef.current ||
      !arrowHeadPosRef.current ||
      !srcWordRef.current ||
      !tgtWordRef.current
    ) {
      return null;
    }

    const svg = svgRef.current;
    const svgRect = svg.getBoundingClientRect();
    const srcRect = srcWordRef.current.getBoundingClientRect();
    const tgtRect = tgtWordRef.current.getBoundingClientRect();

    // Padding around the source word "ideas"
    const paddingX = 0;
    const paddingY = 4;

    const srcBounds = {
      left: srcRect.left - svgRect.left - paddingX,
      top: srcRect.top - svgRect.top - paddingY,
      width: srcRect.width + paddingX * 2,
      height: srcRect.height + paddingY * 2,
    };

    const tgtBounds = {
      left: tgtRect.left - svgRect.left,
      top: tgtRect.top - svgRect.top,
      width: tgtRect.width,
      height: tgtRect.height,
    };

    // 1. Position and scale the hand-drawn sketch circle around "ideas"
    const circleBox = circlePathRef.current.getBBox();
    const circleBoxWidth = circleBox.width || 92.4;
    const circleBoxHeight = circleBox.height || 41.5;
    const circleBoxX = circleBox.x || 0.5;
    const circleBoxY = circleBox.y || 0.5;

    const scaleX = srcBounds.width / circleBoxWidth;
    const scaleY = srcBounds.height / circleBoxHeight;

    const posX = srcBounds.left - circleBoxX * scaleX;
    const posY = srcBounds.top - circleBoxY * scaleY;

    circleGroupRef.current.setAttribute(
      "transform",
      `translate(${posX}, ${posY}) scale(${scaleX}, ${scaleY})`
    );

    // 2. Generate curved arc from top-center of "ideas" to top-center of "products"
    const x1 = srcBounds.left + srcBounds.width / 2;
    const y1 = srcBounds.top + paddingY * 0.5;

    const x2 = tgtBounds.left + tgtBounds.width / 2;
    const y2 = tgtBounds.top - 2;

    const dx = x1 - x2;
    const dy = y1 - y2;

    const rx = Math.abs(dx * 0.55);
    // Controlled arc height so it arches gracefully into the clear headroom
    const ry = Math.min(Math.max(Math.abs(dx * 0.32), 20), 32);

    const sweepFlag = dx < 0 ? 1 : 0;

    const arrowData = `M ${x1} ${y1} A ${rx} ${ry} 0 0 ${sweepFlag} ${x2} ${y2}`;
    arrowPathRef.current.setAttribute("d", arrowData);

    // Measure total stroke lengths for precision dash-drawing
    const circleLen = circlePathRef.current.getTotalLength();
    circlePathRef.current.style.strokeDasharray = `${circleLen}`;

    const arrowLen = arrowPathRef.current.getTotalLength();
    arrowPathRef.current.style.strokeDasharray = `${arrowLen}`;

    // 3. Position and rotate arrowhead polygon at the exact tangent of the arc endpoint
    if (arrowHeadPosRef.current && arrowLen > 0) {
      const pEnd = arrowPathRef.current.getPointAtLength(arrowLen);
      const pPrev = arrowPathRef.current.getPointAtLength(Math.max(0, arrowLen - 1));
      const angleRad = Math.atan2(pEnd.y - pPrev.y, pEnd.x - pPrev.x);
      const angleDeg = (angleRad * 180) / Math.PI;

      arrowHeadPosRef.current.setAttribute(
        "transform",
        `translate(${pEnd.x}, ${pEnd.y}) rotate(${angleDeg})`
      );
    }

    return { circleLen, arrowLen };
  }, []);

  const playAnimation = useCallback(() => {
    const lengths = updatePositions();
    if (!lengths) return;
    const { circleLen, arrowLen } = lengths;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const circlePath = circlePathRef.current;
    const arrowPath = arrowPathRef.current;
    const arrowHead = arrowHeadRef.current;
    const tgtWord = tgtWordRef.current;

    if (!circlePath || !arrowPath || !arrowHead || !tgtWord) return;

    // Reset initial visual states
    gsap.set(circlePath, {
      strokeDashoffset: circleLen,
      opacity: 1,
    });
    gsap.set(arrowPath, {
      strokeDashoffset: arrowLen,
      opacity: 1,
    });
    gsap.set(arrowHead, {
      opacity: 0,
      scale: 0,
      transformOrigin: "8px 4px",
    });
    gsap.set(tgtWord, {
      color: "inherit",
      scale: 1,
    });

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(circlePath, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut",
    })
      .to(
        arrowPath,
        {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        arrowHead,
        {
          opacity: 1,
          scale: 1,
          duration: 0.15,
          ease: "back.out(2)",
        },
        "-=0.05"
      )
      .to(
        tgtWord,
        {
          color: "#D71921",
          scale: 1.08,
          duration: 0.2,
          ease: "back.out(2)",
        },
        "-=0.1"
      )
      .to(tgtWord, {
        scale: 1,
        duration: 0.2,
        ease: "power1.inOut",
      });
  }, [updatePositions]);

  useEffect(() => {
    let isMounted = true;

    const init = () => {
      if (!isMounted) return;
      updatePositions();
    };

    init();

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(init);
    }

    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        init();
      });
    };
    window.addEventListener("resize", handleResize);

    // Automatic trigger on scroll into view
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        playAnimation();
      },
      onEnterBack: () => {
        playAnimation();
      },
    });

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      st.kill();
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [updatePositions, playAnimation]);

  return (
    <div ref={containerRef} className="relative pt-3 pb-1">
      <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
        <span className="inline-block whitespace-nowrap font-medium text-foreground">
          I convert{" "}
          <span
            ref={srcWordRef}
            onClick={playAnimation}
            className="relative inline-block font-semibold text-foreground px-1 mx-1 cursor-pointer select-none"
            title="Click to replay"
          >
            ideas
          </span>{" "}
          into{" "}
          <span
            ref={tgtWordRef}
            onClick={playAnimation}
            className="relative inline-block font-semibold px-1 mx-1 cursor-pointer select-none transition-colors duration-300 text-signal-red"
            title="Click to replay"
          >
            products
          </span>
        </span>{" "}
        that feel robust, tactile, and built to scale.
      </p>

      {/* Overlay SVG for hand-drawn loop, arc arrow, and arrowhead */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
        style={{ overflow: "visible" }}
      >
        {/* Hand-drawn loop encircling "ideas" */}
        <g ref={circleGroupRef}>
          <path
            ref={circlePathRef}
            className="circle-path"
            d="M38.47.5S.5 2.67.5 19.76s30.87 21.7 47.3 21.7 44.64-6 44.64-20.48S55.32 3.84 42 3.75c-7.4 0-20.07.81-28.21 9"
            fill="none"
            stroke="#D71921"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ opacity: 0 }}
          />
        </g>

        {/* Curved arrow arc pointing to "products" */}
        <path
          ref={arrowPathRef}
          className="arrow-path"
          fill="none"
          stroke="#D71921"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0 }}
        />

        {/* Arrowhead polygon positioned and rotated at arc endpoint */}
        <g ref={arrowHeadPosRef}>
          <polygon
            ref={arrowHeadRef}
            className="arrow-head"
            points="-6,-4 2,0 -6,4"
            fill="#D71921"
            stroke="#D71921"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
        </g>
      </svg>
    </div>
  );
}

import ScrollReveal from "../ui/ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-background text-foreground pt-4 md:pt-16 pb-24 md:pb-40 px-4 md:px-8 lg:px-12 relative scroll-mt-20"
    >
      <ScrollReveal staggerChildren staggerClass="about-fade" className="max-w-[1440px] mx-auto w-full grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-16">
        {/* Header / Meta */}
        <div className="col-span-4 md:col-span-3 flex flex-col gap-6">
          <h2 className="about-fade font-dot text-3xl md:text-5xl uppercase tracking-tight text-foreground">
            01<br />
            <span className="text-signal-red">About</span>
          </h2>
          <div className="about-fade font-mono text-[10px] text-foreground/60 tracking-widest uppercase mt-4">
            IDENT // ADITYA_K_V
            <br />
            SYS // DEV_ENV
          </div>
        </div>

        {/* Content */}
        <div className="col-span-4 md:col-span-9 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          {/* Portrait/Profile */}
          <div className="about-fade relative w-full md:w-[40%] lg:w-[30%] aspect-[4/5] border border-foreground/20 flex items-center justify-center overflow-hidden group">
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
          <div className="about-fade flex-1 flex flex-col gap-6 max-w-xl">
            <h3 className="font-sans text-2xl md:text-3xl font-medium leading-tight text-foreground">
              Computer Science Engineer focused on software engineering, scalable systems, and thoughtful design.
            </h3>

            <div className="font-sans space-y-5">
              {/* <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                I bridge engineering and design to create digital experiences that feel
                responsive, purposeful, and refined.
              </p>  */}

              {/* Ideas → Product Connection */}
              <IdeasToProductFlow />

              <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                From structure to interaction, I focus on clean systems, modular
                components, and performance.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
