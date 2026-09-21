"use client";

/**
 * A port of the classic "hanging lamp" CodePen (draggable swing physics +
 * random flicker) into a self-contained React/Next.js client component.
 *
 * Differences from the original template:
 * - The original used `#lamp { position: fixed; left: 50% }`, centered on
 *   the viewport. Here the lamp's pivot is glued to any DOM node you pass
 *   as `anchorRef` (e.g. the "." in a heading), positioned relative to
 *   `containerRef` (the nearest ancestor with `position: relative`).
 * - jQuery mousedown/mousemove/mouseup is replaced with the Pointer Events
 *   API (works for touch too), and IDs are replaced with refs/CSS classes
 *   scoped via styled-jsx so multiple lamps can exist on a page.
 * - The physics (swing decay, drag-angle math) and the flicker loop are
 *   otherwise a 1:1 port of the original logic.
 */

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type LampCSSVars = React.CSSProperties & {
    "--lamp-scale"?: number;
    "--lamp-glow"?: string;
    "--lamp-shade"?: string;
};

interface HangingLampProps {
    /** Ref to the element the cable should drop from (e.g. the "." span). */
    anchorRef: React.RefObject<any>;
    /** Ref to the nearest ancestor with `position: relative`. */
    containerRef: React.RefObject<any>;
    /**
     * Multiplier on top of the automatic, font-size-based sizing (the lamp
     * scales itself to the anchor's current font-size so it stays in
     * proportion across breakpoints). 1 = default proportions.
     */
    scale?: number;
    /** Color of the bulb glow / light cone. */
    glowColor?: string;
    /** Color of the cable, block and shade. */
    shadeColor?: string;
    /** Whether the bulb randomly flickers, like the original template. */
    flicker?: boolean;
    /** Whether the lamp can be grabbed and swung. */
    draggable?: boolean;
}

export default function HangingLamp({
    anchorRef,
    containerRef,
    scale = 1,
    glowColor = "#ff3b3b",
    shadeColor = "#161616",
    flicker = true,
    draggable = true,
}: HangingLampProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const lampRef = useRef<HTMLDivElement>(null);

    // --- keep the lamp's pivot glued to the anchor element ---
    const positionLamp = useCallback(() => {
        const anchor = anchorRef.current;
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        if (!anchor || !container || !wrapper) return;

        const anchorBox = anchor.getBoundingClientRect();
        const containerBox = container.getBoundingClientRect();
        const fontSizePx = parseFloat(getComputedStyle(anchor).fontSize) || 48;

        // NType82 period character has a small right bearing. Shift slightly left to perfectly center on the visual dot.
        const xOffset = -1;
        wrapper.style.left = `${anchorBox.left + anchorBox.width / 2 - xOffset - containerBox.left}px`;
        // A period sits near the baseline (around 80% down the bounding box), not the vertical center
        wrapper.style.top = `${anchorBox.top + anchorBox.height * 0.80 - containerBox.top}px`;
        const mobileModifier = window.innerWidth < 768 ? 0.8 : 1;
        wrapper.style.setProperty("--lamp-scale", String((fontSizePx / 100) * scale * mobileModifier));
    }, [anchorRef, containerRef, scale]);

    useLayoutEffect(() => {
        positionLamp();
        const targets = [
            anchorRef.current,
            containerRef.current,
            anchorRef.current?.parentElement,
        ].filter((el): el is HTMLElement => !!el);
        const ro = new ResizeObserver(positionLamp);
        targets.forEach((el) => ro.observe(el));
        window.addEventListener("resize", positionLamp);
        window.addEventListener("orientationchange", positionLamp);

        if (typeof document !== 'undefined' && document.fonts) {
            document.fonts.ready.then(positionLamp);
        }

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", positionLamp);
            window.removeEventListener("orientationchange", positionLamp);
        };
    }, [positionLamp, anchorRef, containerRef]);

    // --- swing physics + drag, ported from the original jQuery template ---
    useEffect(() => {
        const lamp = lampRef.current;
        const wrapper = wrapperRef.current;
        if (!lamp || !wrapper) return;

        let rotation = 0;
        let velocity = 0;
        const gravity = 1;
        const length = 250;
        let swingTimer: ReturnType<typeof setTimeout> | null = null;

        const setRotation = (deg: number) => {
            rotation = deg;
            lamp.style.transform = `rotate(${deg}deg)`;
        };

        const lampSwing = () => {
            const accel = -(gravity / length) * rotation;
            velocity += accel;
            velocity *= 0.99; // Damping/friction

            const newRotation = rotation + velocity;
            setRotation(newRotation);

            if (Math.abs(velocity) < 0.05 && Math.abs(newRotation) < 0.5) {
                setRotation(0);
                velocity = 0;
                swingTimer = null;
            } else {
                swingTimer = setTimeout(lampSwing, 1000 / 60);
            }
        };

        const startLampSwing = () => {
            if (!swingTimer) {
                lampSwing();
            }
        };

        const stopLampSwing = () => {
            if (swingTimer) clearTimeout(swingTimer);
            swingTimer = null;
            setRotation(rotation);
            velocity = 0;
        };

        let drag: { startDegree: number; startRotation: number } | null = null;

        const degreeAt = (clientX: number, clientY: number) => {
            const pivot = wrapper.getBoundingClientRect();
            const dx = pivot.left - clientX;
            const dy = pivot.top - clientY;
            return Math.atan(dx / dy) * (180 / Math.PI);
        };

        const onPointerDown = (e: PointerEvent) => {
            // Disable drag setup entirely on touch devices so users can scroll over the lamp normally
            if (e.pointerType === "touch" || window.innerWidth < 768) {
                return;
            }

            stopLampSwing();
            drag = { startDegree: degreeAt(e.clientX, e.clientY), startRotation: rotation };
            lamp.classList.add("dragging");
            document.body.classList.add("lamp-dragging");
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        };
        
        const onClick = (e: MouseEvent) => {
            // Only use click-to-swing on mobile/touch (desktop uses drag)
            // @ts-ignore pointerType exists on MouseEvent in modern browsers
            if (e.pointerType === "mouse" && window.innerWidth >= 768) return;
            
            if (Math.abs(rotation) < 2) {
                velocity += 3;
            } else {
                velocity += velocity > 0 ? 2 : -2;
            }
            velocity = Math.min(Math.max(velocity, -10), 10);
            startLampSwing();
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!drag) return;
            const degree = degreeAt(e.clientX, e.clientY);
            const clamped = Math.min(
                Math.max(drag.startRotation + (drag.startDegree - degree), -75),
                75
            );
            setRotation(clamped);
        };

        const onPointerUp = () => {
            if (!drag) return;
            drag = null;
            lamp.classList.remove("dragging");
            document.body.classList.remove("lamp-dragging");
            startLampSwing();
        };

        const dragables = draggable
            ? Array.from(lamp.querySelectorAll<HTMLElement>(".dragable"))
            : [];

        if (draggable) {
            dragables.forEach((el) => {
                el.addEventListener("pointerdown", onPointerDown);
                el.addEventListener("click", onClick);
            });
            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
        }

        // Gentle swing when scrolled into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Nudge the lamp if it's currently still and not being dragged
                        if (Math.abs(rotation) < 1 && drag === null) {
                            velocity += 1.5;
                            startLampSwing();
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(wrapper);

        let flickerTimer: ReturnType<typeof setTimeout> | undefined;
        if (flicker) {
            const toggle = () => lamp.classList.toggle("off");
            const loop = () => {
                toggle();
                setTimeout(toggle, Math.round(Math.random() * 150 + 100));
                flickerTimer = setTimeout(loop, Math.round(Math.random() * 4000 + 100));
            };
            loop();
        }

        return () => {
            observer.disconnect();
            dragables.forEach((el) => {
                el.removeEventListener("pointerdown", onPointerDown);
                el.removeEventListener("click", onClick);
            });
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            if (swingTimer) clearTimeout(swingTimer);
            if (flickerTimer) clearTimeout(flickerTimer);
        };
    }, [draggable, flicker]);

    const vars = {
        "--lamp-scale": 0.4 * scale,
        "--lamp-glow": glowColor,
        "--lamp-shade": shadeColor,
    } as React.CSSProperties;

    return (
        <div ref={wrapperRef} className="lamp-wrapper" style={vars}>
            <div ref={lampRef} className="lamp">
                <div className="lamp-cable" />
                <div className="lamp-block dragable" />
                <div className="lamp-shade dragable" />
                <div className="lamp-bulb-wrapper">
                    <div className="lamp-bulb dragable" />
                </div>
                <div className="lamp-cone" />
            </div>

            <style jsx>{`
        .lamp-wrapper {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
          z-index: -1;
        }
        .lamp {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(130px * var(--lamp-scale));
          margin-left: calc(-65px * var(--lamp-scale));
          transform-origin: 50% 0%;
          pointer-events: auto;
        }
        .lamp-cable {
          width: calc(6px * var(--lamp-scale));
          height: calc(130px * var(--lamp-scale));
          margin: auto;
          background: var(--lamp-shade);
          border-top-left-radius: 100px;
          border-top-right-radius: 100px;
        }
        .lamp-block {
          width: calc(40px * var(--lamp-scale));
          height: calc(40px * var(--lamp-scale));
          margin: auto;
          margin-bottom: calc(-10px * var(--lamp-scale));
          background: var(--lamp-shade);
          cursor: grab;
        }
        .lamp-shade {
          width: calc(130px * var(--lamp-scale));
          height: calc(65px * var(--lamp-scale));
          background: var(--lamp-shade);
          border-top-left-radius: calc(65px * var(--lamp-scale));
          border-top-right-radius: calc(65px * var(--lamp-scale));
          cursor: grab;
        }
        .lamp-bulb-wrapper {
          position: absolute;
          left: 50%;
          width: calc(500px * var(--lamp-scale));
          height: calc(250px * var(--lamp-scale));
          margin-left: calc(-250px * var(--lamp-scale));
          overflow: hidden;
          z-index: -1;
        }
        .lamp-bulb {
          position: absolute;
          margin-left: calc(228px * var(--lamp-scale));
          width: calc(44px * var(--lamp-scale));
          height: calc(22px * var(--lamp-scale));
          background: var(--lamp-glow);
          border-bottom-left-radius: calc(22px * var(--lamp-scale));
          border-bottom-right-radius: calc(22px * var(--lamp-scale));
          box-shadow: 0 calc(10px * var(--lamp-scale)) calc(30px * var(--lamp-scale)) calc(2px * var(--lamp-scale))
            var(--lamp-glow);
          cursor: grab;
          transition: background 0.15s ease, box-shadow 0.15s ease;
        }
        .lamp-cone {
          position: absolute;
          top: calc(100% - 6px * var(--lamp-scale));
          left: 50%;
          width: calc(260px * var(--lamp-scale));
          height: calc(300px * var(--lamp-scale));
          transform: translateX(-50%);
          clip-path: polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%);
          background-image: radial-gradient(var(--lamp-glow) 1px, transparent 1.6px);
          background-size: calc(7px * var(--lamp-scale)) calc(7px * var(--lamp-scale));
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 88%);
          mask-image: linear-gradient(to bottom, black, transparent 88%);
          opacity: 0.55;
          z-index: -2;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }
        .lamp.off .lamp-bulb {
          background: #3a3a3a;
          box-shadow: none;
        }
        .lamp.off .lamp-cone {
          opacity: 0;
        }
        .lamp.dragging .lamp-block,
        .lamp.dragging .lamp-shade,
        .lamp.dragging .lamp-bulb {
          cursor: grabbing;
        }
        :global(body.lamp-dragging) {
          cursor: grabbing !important;
        }

        /* Mobile specific adjustments for better scaling */
        @media (max-width: 768px) {
          .lamp-cable {
            height: calc(90px * var(--lamp-scale));
          }
          .lamp-cone {
            width: calc(360px * var(--lamp-scale));
            height: calc(200px * var(--lamp-scale));
            /* Adjust top inset to keep the beam originating accurately from the bulb */
            clip-path: polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%);
          }
        }
      `}</style>
        </div>
    );
}