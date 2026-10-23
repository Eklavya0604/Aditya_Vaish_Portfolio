import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import SeoPage, { ContentSection, LinkGrid } from "@/components/seo/SeoPage";
import { pageMetadata, webPageJsonLd, SITE } from "@/lib/seo";
import { projects, projectUrl } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return pageMetadata(`${project.name} | Software Engineering Project`, project.description, `/projects/${project.slug}`);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const live = "live" in project ? project.live : undefined;
  const paper = "paper" in project ? project.paper : undefined;

  const jsonLd = [
    ...webPageJsonLd(`${project.name} | Software Engineering Project`, project.description, `/projects/${project.slug}`, [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.name, path: `/projects/${project.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "@id": `${projectUrl(project.slug)}#project`,
      name: project.name,
      description: project.description,
      url: projectUrl(project.slug),
      codeRepository: project.github,
      author: { "@id": `${SITE}/#person` },
      programmingLanguage: project.technologies,
      ...(live ? { softwareVersion: "Live application", installUrl: live } : {}),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SeoPage eyebrow={`PROJECT // ${project.type.toUpperCase()}`} title={project.name} intro={project.description}>
        <div className="mb-10 flex flex-wrap gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-3 font-mono text-xs uppercase tracking-widest hover:border-signal-red hover:text-signal-red">GitHub ↗</a>
          {live && <a href={live} target="_blank" rel="noopener noreferrer" className="border border-signal-red px-4 py-3 font-mono text-xs uppercase tracking-widest text-signal-red hover:bg-signal-red hover:text-white">Live demo ↗</a>}
          {paper && <a href={paper} target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-3 font-mono text-xs uppercase tracking-widest hover:border-signal-red hover:text-signal-red">Published paper ↗</a>}
        </div>

        <ContentSection title="Problem">
          <p>{project.problem}</p>
        </ContentSection>
        <ContentSection title="Solution">
          <p>{project.solution}</p>
        </ContentSection>
        <ContentSection title="Architecture">
          <p>{project.architecture}</p>
        </ContentSection>
        <ContentSection title="Technologies and features">
          <div className="grid gap-3 md:grid-cols-2">
            {project.technologies.map((technology) => <span key={technology} className="border border-border p-4 text-sm">{technology}</span>)}
          </div>
          <ul className="mt-8 space-y-2 text-sm text-foreground/65">
            {project.features.map((feature) => <li key={feature}>/ {feature}</li>)}
          </ul>
        </ContentSection>
        <ContentSection title="Engineering decisions">
          <p>{project.decisions}</p>
        </ContentSection>
        <ContentSection title="Outcome">
          <p>{project.result}</p>
        </ContentSection>
        <ContentSection title="Keep exploring">
          <LinkGrid links={[
            { href: "/projects", label: "All projects", description: "Return to the selected project index." },
            { href: "/services", label: "Services", description: "See how this engineering experience can support a product." },
            { href: "/contact", label: "Contact", description: "Discuss a similar technical problem." },
          ]} />
        </ContentSection>
      </SeoPage>
    </>
  );
}
