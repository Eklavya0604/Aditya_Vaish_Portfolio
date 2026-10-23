import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import SeoPage, { ContentSection } from "@/components/seo/SeoPage";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { projects } from "@/lib/projects";

const title = "Software Engineering Projects | Aditya Kumar Vaish";
const description =
  "Selected software engineering projects by Aditya Kumar Vaish, including Spring Boot backend systems, a full-stack marketplace, and an NLP application.";

export const metadata: Metadata = pageMetadata(title, description, "/projects");

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, "/projects", [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ])} />
      <SeoPage eyebrow="WORK // SELECTED_BUILDS" title="Systems, products, and experiments." intro="A closer look at the engineering decisions behind selected projects by Aditya Kumar Vaish. Each project has a different constraint, from concurrency-sensitive APIs to applied text classification.">
        <ContentSection title="Project index">
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="flex flex-col border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-signal-red">{project.type}</p>
                <h2 className="mt-5 font-sans text-2xl font-medium">{project.name}</h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-foreground/65">{project.description}</p>
                <Link href={`/projects/${project.slug}`} className="mt-8 font-mono text-xs uppercase tracking-widest text-signal-red hover:underline">Read case study ↗</Link>
              </article>
            ))}
          </div>
        </ContentSection>
      </SeoPage>
    </>
  );
}
