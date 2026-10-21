import type { MetadataRoute } from 'next';

// www is the canonical host — the apex 308-redirects here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.adityavaish.dev/sitemap.xml',
  };
}
