import type { MetadataRoute } from 'next';
import { brand } from '@/content/brand';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    // /styleguide es documentación interna del sistema de diseño.
    rules: { userAgent: '*', allow: '/', disallow: ['/styleguide'] },
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
