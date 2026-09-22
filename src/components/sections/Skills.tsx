"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollReveal from '../ui/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const words = [
    'design.',
    'code.',
    'build.',
    'solve.',
    'innovate.',
    'ship.',
]

export default function Skills() {
    const rootRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<(HTMLLIElement | null)[]>([])

    const timelines = useRef<{
        scrollerScrub?: ScrollTrigger
        dimmerScrub?: ScrollTrigger
        chromaEntry?: any
        chromaExit?: any
    }>({})

    useEffect(() => {
        if (!rootRef.current) return

        const root = rootRef.current;

        // Setup initial attributes that CSS relies on
        root.dataset.animate = 'true'
        root.dataset.snap = 'true'
        root.dataset.syncScrollbar = 'true'

        // CSS variables for the color gradient
        const start = 0
        const end = 360
        root.style.setProperty('--start', String(start))
        root.style.setProperty('--hue', String(start))
        root.style.setProperty('--end', String(end))

        const items = itemsRef.current.filter((el): el is HTMLLIElement => el !== null)

        // Backfill scroll functionality with GSAP if no CSS Scroll Timeline support
        if (
            !CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')
        ) {
            gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) })

            const dimmer = gsap
                .timeline()
                .to(items.slice(1), {
                    opacity: 1,
                    stagger: 0.5,
                })
                .to(
                    items.slice(0, items.length - 1),
                    {
                        opacity: 0.2,
                        stagger: 0.5,
                    },
                    0
                )

            timelines.current.dimmerScrub = ScrollTrigger.create({
                trigger: items[0],
                endTrigger: items[items.length - 1],
                start: 'center center',
                end: 'center center',
                animation: dimmer,
                scrub: 0.2,
            })

            /*
            // GSAP fallback for animating color properties (hue/chroma) on scroll.
            // Commented out to use solid red color instead, kept for future reference.
            const scroller = gsap.timeline().fromTo(
                root,
                { '--hue': start },
                { '--hue': end, ease: 'none' }
            )

            timelines.current.scrollerScrub = ScrollTrigger.create({
                trigger: items[0],
                endTrigger: items[items.length - 1],
                start: 'center center',
                end: 'center center',
                animation: scroller,
                scrub: 0.2,
            })

            timelines.current.chromaEntry = gsap.fromTo(
                root,
                { '--chroma': 0 },
                {
                    '--chroma': 0.3,
                    ease: 'none',
                    scrollTrigger: {
                        scrub: 0.2,
                        trigger: items[0],
                        start: 'center center+=40',
                        end: 'center center',
                    },
                }
            )

            timelines.current.chromaExit = gsap.fromTo(
                root,
                { '--chroma': 0.3 },
                {
                    '--chroma': 0,
                    ease: 'none',
                    scrollTrigger: {
                        scrub: 0.2,
                        trigger: items[items.length - 2],
                        start: 'center center',
                        end: 'center center-=40',
                    },
                }
            )
            */
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    return (
        <ScrollReveal className="w-full">
            <div ref={rootRef} className="skills-wrapper w-full bg-white relative z-10">
            <header className="flex items-center w-full px-5 md:px-20 pb-20">
                <h1 className="font-tech text-6xl md:text-[8rem] leading-none m-0 text-black tracking-tighter">
                    What!
                </h1>
            </header>

            <main className="w-full">
                <section className="sticky-section content flex gap-4 md:gap-8 leading-tight w-full pl-5 md:pl-20">
                    <h2 className="font-tech sticky top-[calc(50%-0.5lh)] text-4xl md:text-7xl text-black m-0 inline-block h-fit">
                        <span aria-hidden="true">I can</span>
                        <span className="sr-only">I can ship things.</span>
                    </h2>
                    <ul
                        aria-hidden="true"
                        style={{ '--count': words.length } as React.CSSProperties}
                        className="font-dot text-4xl md:text-7xl font-semibold p-0 m-0 list-none text-black"
                    >
                        {words.map((word, i) => (
                            <li
                                key={i}
                                ref={(el) => {
                                    itemsRef.current[i] = el
                                }}
                                style={{ '--i': i } as React.CSSProperties}
                                className="tracking-tighter"
                            >
                                {word}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
        </ScrollReveal>
    )
}