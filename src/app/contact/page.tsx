import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SeoPage, { ContentSection, LinkGrid } from "@/components/seo/SeoPage";
import { pageMetadata, webPageJsonLd, SITE, PERSON_ID } from "@/lib/seo";

const title = "Contact Aditya Kumar Vaish | Software Engineer";
const description =
  "Contact Aditya Kumar Vaish about freelance software development, backend engineering, full-stack products, or software engineering opportunities.";

export const metadata: Metadata = pageMetadata(title, description, "/contact");

export default function ContactPage() {
  const jsonLd = [
    ...webPageJsonLd(title, description, "/contact", [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${SITE}/contact#contact-page`,
      url: `${SITE}/contact`,
      mainEntity: { "@id": PERSON_ID },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SeoPage eyebrow="CONTACT // OPEN_CHANNEL" title="Have a software project in mind?" intro="I’m available for selected freelance software-development projects, startup collaborations, and engineering opportunities. Send a short brief and I’ll understand the problem before suggesting a next step.">
        <ContentSection title="Start a conversation">
          <div className="flex flex-wrap gap-4">
            <a href="mailto:kumareklavya744@gmail.com" className="border border-signal-red px-5 py-3 font-mono text-xs uppercase tracking-widest text-signal-red hover:bg-signal-red hover:text-white">Email Aditya ↗</a>
            <a href="https://www.linkedin.com/in/aditya-vaish-482a11281/" target="_blank" rel="noopener noreferrer" className="border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest hover:border-signal-red hover:text-signal-red">LinkedIn ↗</a>
            <a href="https://github.com/Eklavya0604" target="_blank" rel="noopener noreferrer" className="border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest hover:border-signal-red hover:text-signal-red">GitHub ↗</a>
          </div>
          <p className="mt-8 text-sm text-foreground/60">Useful context includes what you are building, where the work is currently blocked, and the kind of help you need. A full specification is not required for a first conversation.</p>
        </ContentSection>

        <ContentSection title="Related paths">
          <LinkGrid links={[
            { href: "/services", label: "Services", description: "Java, Spring Boot, React, backend, full-stack, and testing work." },
            { href: "/projects", label: "Projects", description: "See examples before sending a brief." },
            { href: "/software-engineer-delhi-ncr", label: "Delhi NCR", description: "Local and remote collaboration details." },
          ]} />
        </ContentSection>
      </SeoPage>
    </>
  );
}
