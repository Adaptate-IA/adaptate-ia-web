import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adaptateia.cl';
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/industrias/legal`, lastModified: new Date(), priority: 0.9 },
  ];
}
