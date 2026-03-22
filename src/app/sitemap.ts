import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adaptateia.cl';
  return [
    { url: baseUrl, lastModified: new Date('2026-03-22'), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-03-22'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-03-22'), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
