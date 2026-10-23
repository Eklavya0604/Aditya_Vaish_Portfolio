import type { MetadataRoute } from 'next';

// Bump this date when the page content changes. Using `new Date()` here would
// claim the page changed on every build request, which crawlers learn to ignore.
const lastModified = new Date('2026-10-23');

// www is the canonical host — the apex 308-redirects here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.adityavaish.dev',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...[
      '/about',
      '/services',
      '/projects',
      '/projects/spring-sentinel',
      '/projects/vypaar-manch',
      '/projects/spamshield',
      '/software-engineer-delhi-ncr',
      '/contact',
    ].map((path) => ({
      url: `https://www.adityavaish.dev${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '/services' || path === '/projects' ? 0.9 : 0.7,
    })),
  ];
}
