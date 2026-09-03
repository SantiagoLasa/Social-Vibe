// Identidad de marca — constantes que no cambian entre idiomas.
// El copy traducible vive en src/content/copy.{en,es}.ts.

export const brand = {
  name: 'SOCIAL VIBE',
  descriptor: 'Media Agency',
  sealCaption: 'Est. Miami',
  location: 'Miami, FL',
  established: '2024',

  // DOMINIO Y PUBLICACIÓN
  // De estas dos líneas salen el metadataBase, el canonical, los hreflang,
  // el JSON-LD, el sitemap y el robots.txt.
  //
  // Nota: el brand kit asumía socialvibe.agency, pero está registrado y en
  // uso por otra agencia de marketing digital. Ver MEMO.md.
  url: 'https://socialvibemediaagency.com',
  indexable: true,

  // Confirmado por el cliente (2026-08-31). Ojo: la tarjeta del brand kit
  // traía otros datos (hello@socialvibe.agency, @socialvibe); mandan los del
  // PDF de paquetes, que es el documento comercial en uso.
  founder: {
    name: 'Jeniffer',
    role: 'Founder & Strategy',
  },

  contact: {
    // Casilla del dominio, servida por Cloudflare Email Routing. Hoy sólo
    // recibe: reenvía a una casilla verificada. A dónde reenvía se cambia
    // en el dashboard, sin tocar el código ni volver a publicar.
    email: 'info@socialvibemediaagency.com',
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
