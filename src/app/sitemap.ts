import type { MetadataRoute } from 'next';

// Bump this date when the page content changes. Using `new Date()` here would
// claim the page changed on every build request, which crawlers learn to ignore.
const lastModified = new Date('2026-10-21');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://adityavaish.dev',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
