import type { MetadataRoute } from 'next';
import { brand } from '@/content/brand';

// Generado en build. Es un one-pager, así que las únicas URLs son los dos
// idiomas — las secciones son anclas y no llevan entrada propia.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${brand.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${brand.url}/es`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
