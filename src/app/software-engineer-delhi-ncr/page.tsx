import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SeoPage, { ContentSection, LinkGrid } from "@/components/seo/SeoPage";
import { pageMetadata, webPageJsonLd, SITE, PERSON_ID } from "@/lib/seo";

const title = "Freelance Software Engineer in Delhi NCR | Aditya Kumar Vaish";
const description =
  "Aditya Kumar Vaish is a freelance Software Engineer in Delhi NCR working with Java, Spring Boot, React, backend systems, and full-stack products.";

export const metadata: Metadata = pageMetadata(title, description, "/software-engineer-delhi-ncr");

export default function DelhiNcrPage() {
  const jsonLd = [
    ...webPageJsonLd(title, description, "/software-engineer-delhi-ncr", [
      { name: "Home", path: "/" },
      { name: "Software Engineer in Delhi NCR", path: "/software-engineer-delhi-ncr" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE}/software-engineer-delhi-ncr#service`,
      name: "Freelance Software Engineering in Delhi NCR",
      provider: { "@id": PERSON_ID },
      areaServed: [
        "Delhi",
        "Noida",
        "Gurugram",
        "Ghaziabad",
        "Greater Noida",
        "Faridabad",
        "Delhi NCR",
      ],
      serviceType: "Software development",
      availableChannel: { "@type": "ServiceChannel", serviceUrl: `${SITE}/contact` },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SeoPage eyebrow="LOCATION // DELHI_NCR" title="A software engineer for products that need to move forward." intro="I’m Aditya Kumar Vaish, a Software Engineer based in Ghaziabad, Delhi NCR. I work on Java, Spring Boot, React, backend systems, and full-stack web products for local and remote teams.">
        <ContentSection title="Working across Delhi NCR">
          <p>For software-development projects, I can collaborate with teams in Delhi, Noida, Gurugram, Ghaziabad, Greater Noida, and Faridabad. Remote collaboration is also available for teams elsewhere in India when the scope, communication, and working style are aligned.</p>
          <p className="mt-5">The focus is not on a particular office address; it is on understanding the product problem, making sound technical decisions, and delivering a maintainable implementation.</p>
        </ContentSection>

        <ContentSection title="Good fits for this work">
          <p>Projects can include an early product build, a business workflow that needs a better interface, a backend that needs structure, or an existing application that needs a focused improvement. Startups, founders, small businesses, product teams, and agencies can all benefit from a direct engineering partner when the scope is clear.</p>
          <div className="mt-8 grid gap-3 text-sm text-foreground/60 md:grid-cols-2">
            <span className="border border-border p-4">New product and MVP foundations</span>
            <span className="border border-border p-4">REST APIs and backend services</span>
            <span className="border border-border p-4">React interfaces and dashboards</span>
            <span className="border border-border p-4">Testing, automation, and maintenance</span>
          </div>
        </ContentSection>

        <ContentSection title="Continue exploring">
          <LinkGrid links={[
            { href: "/services", label: "Software development services", description: "See the engineering areas I can help with." },
            { href: "/projects", label: "Selected projects", description: "Review backend, full-stack, and applied ML work." },
            { href: "/about", label: "About Aditya", description: "Understand the engineering approach behind the work." },
            { href: "/contact", label: "Contact", description: "Share a project brief or start a conversation." },
          ]} />
        </ContentSection>
      </SeoPage>
    </>
  );
}
