"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import HangingLamp from "../ui/Hanginglamp";
import { Turnstile } from "@marsidev/react-turnstile";
import { sendEmailAction, ActionState } from "@/app/actions/sendEmail";
import ScrollReveal from "../ui/ScrollReveal";

const socials = [
  {
    name: "GITHUB",
    url: "https://github.com/Eklavya0604",
    icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  },
  {
    name: "LINKEDIN",
    url: "https://www.linkedin.com/in/aditya-vaish-482a11281/",
    icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>
  },
  {
    name: "EMAIL",
    url: "mailto:kumareklavya744@gmail.com",
    icon: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>
  },
  {
    name: "INSTAGRAM",
    url: "https://www.instagram.com/aditya_k.__/?__pwa=1",
    icon: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>
  }
];

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setErrors({});
    }
  }, [state.timestamp, state.success]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};
    let hasError = false;

    const name = formData.get("name") as string;
    if (!name) {
      newErrors.name = "Please fill out this field.";
      hasError = true;
    }

    const email = formData.get("email") as string;
    if (!email) {
      newErrors.email = "Please fill out this field.";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    const message = formData.get("message") as string;
    if (!message) {
      newErrors.message = "Please fill out this field.";
      hasError = true;
    } else if (message.length < 10) {
      newErrors.message = "Please lengthen this text to 10 characters or more.";
      hasError = true;
    }

    if (hasError) {
      e.preventDefault();
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-background text-foreground pt-12 md:pt-16 pb-24 md:pb-40 px-4 md:px-8 lg:px-12 relative scroll-mt-20"
    >
      <ScrollReveal staggerChildren staggerClass="contact-fade" className="max-w-[1440px] mx-auto w-full flex flex-col gap-8 md:gap-10">
        {/* Section start heading */}
        <div className="contact-fade flex flex-col gap-4">
          <h2 className="font-dot text-3xl md:text-5xl uppercase tracking-tight text-foreground">
            04<br />
            <span className="text-signal-red">Connect Me</span>
          </h2>
          <div className="font-mono text-[10px] text-foreground/60 tracking-widest uppercase">
            SYS // CONTACT
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-4 md:col-span-3 mb-8 md:mb-0">
            <h3
              ref={headingRef}
              className="contact-fade text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight text-foreground relative z-10"
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
            <p className="contact-fade font-sans text-xl md:text-2xl font-medium leading-tight text-foreground">
              Looking for a technical partner or just want to discuss an idea? Send a transmission below.
            </p>

            <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="contact-fade flex flex-col gap-6 w-full max-w-xl">
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="name" className="font-mono text-[10px] text-foreground/60 tracking-widest uppercase flex justify-between">
                  <span>Name // IDENT</span>
                  {errors.name && <span className="text-signal-red font-dot tracking-widest">{errors.name}</span>}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  maxLength={100}
                  className={`w-full bg-transparent border-b pb-2 font-sans text-base focus:outline-none transition-colors duration-300 placeholder:text-foreground/30 ${errors.name ? "border-signal-red text-signal-red" : "border-foreground/20 text-foreground focus:border-signal-red"}`}
                  placeholder="Aditya"
                  onFocus={() => setErrors(prev => ({...prev, name: ""}))}
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="font-mono text-[10px] text-foreground/60 tracking-widest uppercase flex justify-between">
                  <span>Email // ROUTE</span>
                  {errors.email && <span className="text-signal-red font-dot tracking-widest">{errors.email}</span>}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  maxLength={100}
                  className={`w-full bg-transparent border-b pb-2 font-sans text-base focus:outline-none transition-colors duration-300 placeholder:text-foreground/30 ${errors.email ? "border-signal-red text-signal-red" : "border-foreground/20 text-foreground focus:border-signal-red"}`}
                  placeholder="aditya@example.com"
                  onFocus={() => setErrors(prev => ({...prev, email: ""}))}
                />
              </div>

              {/* Honeypot field (hidden from visual users but bots might fill it) */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="flex flex-col gap-2 relative">
                <label htmlFor="message" className="font-mono text-[10px] text-foreground/60 tracking-widest uppercase flex justify-between">
                  <span>Message // DATA</span>
                  {errors.message && <span className="text-signal-red font-dot tracking-widest">{errors.message}</span>}
                </label>
                <textarea
                  id="message"
                  name="message"
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  className={`w-full bg-transparent border-b pb-2 font-sans text-base focus:outline-none transition-colors duration-300 placeholder:text-foreground/30 resize-none ${errors.message ? "border-signal-red text-signal-red" : "border-foreground/20 text-foreground focus:border-signal-red"}`}
                  placeholder="Transmission contents..."
                  onFocus={() => setErrors(prev => ({...prev, message: ""}))}
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

              <div className="mt-4 flex flex-row flex-wrap items-center justify-between gap-6 w-full">
                <SubmitButton isSuccess={state.success} />

                <div className="contact-fade flex gap-4 md:gap-6">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center"
                      aria-label={social.name}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-signal-red transition-transform hover:scale-110 duration-300 md:w-[28px] md:h-[28px]">
                        {social.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}