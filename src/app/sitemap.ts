import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mnssindia.org';
  const now = new Date().toISOString();

  const routes = [
    '',
    '/about',
    '/contact',
    '/donate',
    '/programs',
    '/progress-reports',
    '/reports',
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.7,
  }));
}
