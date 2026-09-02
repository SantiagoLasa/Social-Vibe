import type { Metadata } from 'next';
import { bodoni, courier, jost } from './fonts';
import { brand } from '@/content/brand';
import { services } from '@/content/services';
import './globals.css';

const DESCRIPTION =
  'Social Vibe is a Miami social media and content creation agency for food, drink and beauty brands. Strategy, content and community — handled in-house.';

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — Social media for food, drink & beauty brands in Miami`,
    template: `%s — ${brand.name}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: `${brand.name} ${brand.descriptor}`,
    locale: 'en_US',
    alternateLocale: 'es_US',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: `${brand.name} ${brand.descriptor}` }],
  },
  twitter: { card: 'summary_large_image' },
  // Doble candado mientras no haya dominio: el robots.txt lo bloquea y cada
  // página se emite con noindex. Los buscadores respetan el meta aunque
  // lleguen por un enlace directo, que el robots.txt solo no evita.
  ...(brand.indexable ? {} : { robots: { index: false, follow: false } }),
  // Sin verificación de propiedad todavía: se agrega al conectar Search
  // Console, cuando exista el dominio definitivo.
};

// Datos estructurados. LocalBusiness y no Organization a secas: es un
// negocio con ciudad, servicios y contacto, y así puede aparecer en
// resultados locales de Miami.
function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${brand.url}/#business`,
    name: `${brand.name} ${brand.descriptor}`,
    description: DESCRIPTION,
    url: brand.url,
    image: `${brand.url}/og/default.jpg`,
    logo: `${brand.url}/og/logo.png`,
    email: brand.contact.email,
    telephone: brand.contact.whatsapp,
    areaServed: { '@type': 'City', name: 'Miami' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    founder: { '@type': 'Person', name: brand.founder.name, jobTitle: brand.founder.role },
    sameAs: [brand.social.instagram].filter(Boolean),
    knowsLanguage: ['en', 'es'],
    // Los nueve servicios, sin precios: el sitio no los publica.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title },
      })),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} ${courier.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        {children}
      </body>
    </html>
  );
}
