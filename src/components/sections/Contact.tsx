"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import HangingLamp from "../ui/Hanginglamp";
import { Turnstile } from "@marsidev/react-turnstile";
import { sendEmailAction, ActionState } from "@/app/actions/sendEmail";
import ScrollReveal from "../ui/ScrollReveal";

const initialState: ActionState = {
  success: false,
};

function SubmitButton({ isSuccess }: { isSuccess: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || isSuccess}
      className="font-mono text-xs tracking-widest uppercase text-signal-red border border-signal-red px-6 py-2 hover:bg-signal-red hover:text-white transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-signal-red group flex items-center gap-2"
    >
      {!pending && !isSuccess && "SUBMIT"}
      {pending && "TRANSMITTING..."}
      {isSuccess && "RECEIVED"}

      {!pending && !isSuccess && (
        <span className="w-4 h-[1px] bg-signal-red group-hover:bg-white transition-colors duration-300 inline-block ml-2" />
      )}
    </button>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState(sendEmailAction, initialState);

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.timestamp, state.success]);

  return (
    <section
      id="contact"
      className="w-full bg-white text-black pt-12 md:pt-16 pb-24 md:pb-40 px-4 md:px-8 lg:px-12 relative scroll-mt-20"
    >
      <ScrollReveal staggerChildren staggerClass="contact-fade" className="max-w-[1440px] mx-auto w-full flex flex-col gap-8 md:gap-10">
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
          <div className="col-span-4 md:col-span-3 mb-8 md:mb-0">
            <h3
              ref={headingRef}
              className="contact-fade text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight text-black relative z-10"
              style={{ fontFamily: "var(--font-ntype82)" }}
            >
              Let&apos;s Build<br />Together
              <span ref={periodRef} className="text-signal-red relative z-30">.</span>
              <div className="hidden md:block">
                <HangingLamp anchorRef={periodRef as any} containerRef={headingRef as any} />
              </div>
            </h3>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-5 flex flex-col gap-12">
            <p className="contact-fade font-sans text-xl md:text-2xl font-medium leading-tight text-black">
              Looking for a technical partner or just want to discuss an idea? Send a transmission below.
            </p>

            <form ref={formRef} action={formAction} className="contact-fade flex flex-col gap-6 w-full max-w-xl">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-[10px] text-black/60 tracking-widest uppercase">Name // IDENT</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  className="w-full bg-transparent border-b border-black/20 pb-2 font-sans text-base text-black focus:outline-none focus:border-signal-red transition-colors duration-300 placeholder:text-black/30"
                  placeholder="Aditya"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-[10px] text-black/60 tracking-widest uppercase">Email // ROUTE</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={100}
                  className="w-full bg-transparent border-b border-black/20 pb-2 font-sans text-base text-black focus:outline-none focus:border-signal-red transition-colors duration-300 placeholder:text-black/30"
                  placeholder="aditya@example.com"
                />
              </div>

              {/* Honeypot field (hidden from visual users but bots might fill it) */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-[10px] text-black/60 tracking-widest uppercase">Message // DATA</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  className="w-full bg-transparent border-b border-black/20 pb-2 font-sans text-base text-black focus:outline-none focus:border-signal-red transition-colors duration-300 placeholder:text-black/30 resize-none"
                  placeholder="Transmission contents..."
                />
              </div>

              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <div className="mt-2">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    options={{ theme: 'light' }}
                  />
                </div>
              )}

              {state.error && (
                <p className="text-signal-red text-sm font-sans">{state.error}</p>
              )}
              {state.success && (
                <p className="text-signal-red text-sm font-dot uppercase tracking-wider">{state.message}</p>
              )}

              <div className="mt-4">
                <SubmitButton isSuccess={state.success} />
              </div>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}