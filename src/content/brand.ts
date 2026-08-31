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

  // Confirmado por el cliente (2026-08-31). Ojo: la tarjeta del brand kit
  // traía otros datos (hello@socialvibe.agency, @socialvibe); mandan los del
  // PDF de paquetes, que es el documento comercial en uso.
  founder: {
    name: 'Jeniffer',
    role: 'Founder & Strategy',
  },

  contact: {
    email: 'jeniffersocially@gmail.com',
    instagram: '@socialvibe.ma',
    /** WhatsApp de Jeniffer — confirmado 2026-08-27. Formato para mostrar. */
    whatsapp: '+1 (786) 442-4758',
  },

  social: {
    // TODO: CONTENIDO CLIENTE — URLs exactas
    instagram: 'https://instagram.com/socialvibe.ma',
    tiktok: null as string | null,
  },
};

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
