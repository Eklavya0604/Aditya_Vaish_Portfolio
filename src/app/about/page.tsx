import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SeoPage, { ContentSection, LinkGrid } from "@/components/seo/SeoPage";
import { pageMetadata, webPageJsonLd, PROFILE, KNOWS_ABOUT } from "@/lib/seo";

const title = "About Aditya Kumar Vaish | Software Engineer";
const description =
  "About Aditya Kumar Vaish, a Software Engineer in Delhi NCR specializing in Java, Spring Boot, React, backend systems, and full-stack web development.";

export const metadata: Metadata = pageMetadata(title, description, "/about");

export default function AboutPage() {
  const jsonLd = [
    ...webPageJsonLd(title, description, "/about", [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://www.adityavaish.dev/#person",
      name: PROFILE.name,
      url: PROFILE.url,
      jobTitle: PROFILE.jobTitle,
      description: PROFILE.description,
      knowsAbout: KNOWS_ABOUT,
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SeoPage eyebrow="IDENTITY // ADITYA_K_V" title="Software engineering with a bias toward clarity." intro="Aditya Kumar Vaish is a Software Engineer specializing in Java, Spring Boot, React, backend systems, and full-stack web development. Based in Delhi NCR, he works on practical products and dependable engineering foundations.">
        <ContentSection title="The work">
          <p>My approach starts with the real business or product problem. From there, I aim for a system that is understandable to the next developer, resilient enough for its use case, and measured by whether it makes the product better.</p>
          <p className="mt-5">That usually means careful API boundaries, maintainable components, explicit data flows, thoughtful authentication, and tests around the behavior that matters. Visual polish is valuable, but it should sit on top of a system that can be changed safely.</p>
        </ContentSection>

        <ContentSection title="Engineering focus">
          <div className="grid gap-3 text-sm text-foreground/60 md:grid-cols-2">
            {KNOWS_ABOUT.map((topic) => <span key={topic} className="border border-border p-4">{topic}</span>)}
          </div>
        </ContentSection>

        <ContentSection title="Explore the portfolio">
          <LinkGrid links={[
            { href: "/services", label: "Services", description: "Freelance software development for focused product work." },
            { href: "/projects", label: "Projects", description: "Selected systems, interfaces, and applied engineering work." },
            { href: "/software-engineer-delhi-ncr", label: "Delhi NCR", description: "Local and remote collaboration details." },
            { href: "/contact", label: "Contact", description: "Discuss a project, role, or technical problem." },
          ]} />
        </ContentSection>
      </SeoPage>
    </>
  );
}
