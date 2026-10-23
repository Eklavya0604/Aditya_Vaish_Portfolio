import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function SeoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground px-5 py-8 md:px-10 md:py-10">
      <header className="mx-auto flex max-w-6xl flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="font-dot text-sm uppercase tracking-[0.2em] hover:text-signal-red">
          Aditya Kumar Vaish
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-signal-red">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <article className="mx-auto max-w-6xl py-20 md:py-28">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-signal-red">{eyebrow}</p>
        <h1 className="max-w-4xl font-tech text-5xl leading-[0.95] tracking-tight md:text-8xl">{title}</h1>
        <p className="mt-8 max-w-3xl font-sans text-lg leading-relaxed text-foreground/70 md:text-xl">{intro}</p>
        <div className="mt-16">{children}</div>
      </article>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-border pt-6 font-mono text-xs uppercase tracking-widest text-muted md:flex-row md:justify-between">
        <span>Aditya Kumar Vaish // Software Engineer</span>
        <Link href="/contact" className="text-signal-red hover:underline">Start a conversation ↗</Link>
      </footer>
    </main>
  );
}

export function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10 md:py-14">
      <h2 className="font-dot text-2xl uppercase tracking-tight md:text-4xl">{title}</h2>
      <div className="mt-6 max-w-4xl font-sans text-base leading-8 text-foreground/75">{children}</div>
    </section>
  );
}

export function LinkGrid({
  links,
}: {
  links: Array<{ href: string; label: string; description: string }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="border border-border p-5 transition-colors hover:border-signal-red">
          <span className="font-sans text-lg font-medium">{link.label} ↗</span>
          <span className="mt-2 block text-sm leading-6 text-foreground/60">{link.description}</span>
        </Link>
      ))}
    </div>
  );
}
