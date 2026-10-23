import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SeoPage, { ContentSection, LinkGrid } from "@/components/seo/SeoPage";
import { pageMetadata, webPageJsonLd, SITE, PERSON_ID } from "@/lib/seo";

const title = "Freelance Software Development Services | Aditya Kumar Vaish";
const description =
  "Freelance software development by Aditya Kumar Vaish: Java, Spring Boot, React, REST APIs, backend systems, full-stack products, testing, and automation.";

export const metadata: Metadata = pageMetadata(title, description, "/services");

const serviceSections = [
  {
    title: "Java & Spring Boot Development",
    text: "I build Java and Spring Boot services around clear API boundaries, maintainable domain logic, authentication, validation, and database integration. The work can include a new REST API, an extension to an existing service, or a backend foundation for a product team.",
    items: ["REST API design", "JWT authentication and authorization", "Spring Data and database integration", "Service-layer architecture and validation"],
  },
  {
    title: "React Development",
    text: "I create responsive React interfaces that make product workflows easy to understand and use. Frontend work can cover dashboards, forms, API integration, stateful flows, and performance-conscious UI implementation.",
    items: ["Responsive product interfaces", "Dashboards and workflow screens", "API integration", "Frontend performance and accessibility"],
  },
  {
    title: "Full-Stack Development",
    text: "For teams that need an end-to-end implementation, I connect the interface, backend, data model, and deployment concerns into one coherent product. This is a practical fit for MVPs, internal tools, business websites, and SaaS workflows.",
    items: ["Frontend-to-backend product development", "Database design and integration", "Third-party integrations", "SaaS and business application workflows"],
  },
  {
    title: "Backend Development",
    text: "Backend engagements can focus on API architecture, data access, identity, and reliability. I work with relational and document databases, including PostgreSQL and MongoDB, and use Redis where short-lived state or caching is appropriate.",
    items: ["API architecture", "PostgreSQL, SQL, and MongoDB", "Authentication and authorization", "Scalable service foundations"],
  },
  {
    title: "Software Testing & Automation",
    text: "Testing is part of building a dependable product. I can help establish API and integration checks, browser workflows with Playwright, and automation that gives a team faster feedback during development.",
    items: ["Playwright browser testing", "API and integration testing", "Automation workflows", "Regression-focused quality checks"],
  },
];

export default function ServicesPage() {
  const jsonLd = [
    ...webPageJsonLd(title, description, "/services", [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE}/services#software-development-service`,
      name: "Aditya Kumar Vaish — Freelance Software Development",
      url: `${SITE}/services`,
      provider: { "@id": PERSON_ID },
      areaServed: ["Delhi NCR", "India"],
      serviceType: [
        "Java and Spring Boot development",
        "React development",
        "Full-stack development",
        "Backend development",
        "Software testing and automation",
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SeoPage eyebrow="SERVICES // SOFTWARE_ENGINEERING" title="Freelance software development, built with intent." intro="I work with startups, founders, small businesses, product teams, and agencies on focused software projects. Based in Delhi NCR, I also collaborate remotely when the team and problem are a good fit.">
        <div className="space-y-2">
          {serviceSections.map((section) => (
            <ContentSection key={section.title} title={section.title}>
              <p>{section.text}</p>
              <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-foreground/60 md:grid-cols-2">
                {section.items.map((item) => <li key={item}>/ {item}</li>)}
              </ul>
            </ContentSection>
          ))}
        </div>

        <ContentSection title="A practical engagement">
          <p>Good engineering starts with a clear problem, a sensible scope, and a feedback loop. We can start with an existing brief, a product idea, or a technical area that needs attention.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="mailto:kumareklavya744@gmail.com" className="border border-signal-red px-5 py-3 font-mono text-xs uppercase tracking-widest text-signal-red hover:bg-signal-red hover:text-white">Contact Aditya Kumar Vaish ↗</a>
            <LinkGrid links={[{ href: "/projects", label: "View projects", description: "See the systems and products behind this work." }, { href: "/software-engineer-delhi-ncr", label: "Delhi NCR availability", description: "Learn how remote and local collaboration works." }]} />
          </div>
        </ContentSection>
      </SeoPage>
    </>
  );
}
