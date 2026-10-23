import type { Metadata } from "next";

export const SITE = "https://www.adityavaish.dev";

export const SAME_AS = [
  "https://github.com/Eklavya0604",
  "https://www.linkedin.com/in/aditya-vaish-482a11281/",
  "https://www.instagram.com/aditya_k.__/?__pwa=1",
];

export const PERSON_ID = `${SITE}/#person`;

export const PROFILE = {
  name: "Aditya Kumar Vaish",
  shortName: "Aditya Vaish",
  jobTitle: "Software Engineer",
  url: SITE,
  image: `${SITE}/assets/Profile_picture.png`,
  description:
    "Aditya Kumar Vaish is a Software Engineer specializing in Java, Spring Boot, React, backend systems, and full-stack web development.",
};

export const KNOWS_ABOUT = [
  "Java",
  "Spring Boot",
  "React",
  "JavaScript",
  "REST APIs",
  "Backend Development",
  "Full Stack Development",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Software Testing",
];

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = `${SITE}${path}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    authors: [{ name: PROFILE.name, url: PROFILE.url }],
    creator: PROFILE.name,
    publisher: PROFILE.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: "Aditya Kumar Vaish Portfolio",
      images: [
        {
          url: `${SITE}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${PROFILE.name} — Software Engineer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE}/twitter-image`],
    },
    robots: { index: true, follow: true },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function webPageJsonLd(
  name: string,
  description: string,
  path: string,
  breadcrumbs: Array<{ name: string; path: string }>,
) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE}${path}#webpage`,
      name,
      description,
      url: `${SITE}${path}`,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": PERSON_ID },
    },
    {
      "@context": "https://schema.org",
      ...breadcrumbJsonLd(breadcrumbs),
    },
  ];
}
