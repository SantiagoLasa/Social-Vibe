// Identidad de marca — constantes que no cambian entre idiomas.
// El copy traducible vive en src/content/copy.{en,es}.ts.

export const brand = {
  name: 'SOCIAL VIBE',
  descriptor: 'Media Agency',
  sealCaption: 'Est. Miami',
  location: 'Miami, FL',
  established: '2024',

  // TODO: CONTENIDO CLIENTE — confirmar dominio definitivo
  url: 'https://socialvibe.agency',

  // Confirmado por el cliente (2026-08-27): los datos de la tarjeta del
  // brand kit p.10 son reales.
  founder: {
    name: 'Jeniffer',
    role: 'Founder & Strategy',
  },

  contact: {
    email: 'hello@socialvibe.agency',
    instagram: '@socialvibe',
    phone: null as string | null, // TODO: CONTENIDO CLIENTE
    whatsapp: null as string | null, // TODO: CONTENIDO CLIENTE
  },

  social: {
    // TODO: CONTENIDO CLIENTE — URLs exactas
    instagram: null as string | null,
    tiktok: null as string | null,
  },
};

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
