import type { MetadataRoute } from 'next';
import { brand } from '@/content/brand';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Sin dominio definitivo el sitio se publica cerrado: se puede ver y
  // aprobar por la URL de Pages, pero no entra en ningún buscador.
  if (!brand.indexable) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    // /styleguide es documentación interna del sistema de diseño.
    rules: { userAgent: '*', allow: '/', disallow: ['/styleguide'] },
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
