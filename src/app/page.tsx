import type { Metadata } from 'next';
import { SiteHome } from '@/components/SiteHome';

// Inglés en la raíz; el español vive en /es. Sin redirecciones: cada idioma
// tiene su URL canónica, que es lo que corresponde en export estático.
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/', 'es-US': '/es' },
  },
  openGraph: {
    url: '/',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SiteHome locale="en" />;
}
