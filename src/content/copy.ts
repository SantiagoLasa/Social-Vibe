import type { Locale } from './brand';
import { services as serviceList } from './services';

// Todo el texto visible del sitio, por idioma. Cero strings en JSX.
//
// ESTADO DEL COPY — importante al revisar:
//   · Las líneas marcadas [KIT] salen textuales del brand kit de Jeniffer:
//     son su voz, aprobadas por ella.
//   · Las marcadas [BORRADOR] las escribimos nosotros siguiendo las reglas
//     de voz del kit (frases cortas, sustantivos concretos, los números
//     aparecen). Jeniffer confirma o reemplaza.
//   · El español NO es traducción del inglés. El propio kit lo pide:
//     "Spanish posts get their own copy, not a mirror". Los borradores en
//     español están escritos, no traducidos — igual necesitan su revisión.
//   · Los testimonios están VACÍOS a propósito: no se inventan.

export type Testimonial = {
  quote: string;
  author: string;
  business: string;
};

export type Copy = {
  nav: { label: string; items: { id: string; label: string }[]; cta: string };
  hero: { headline: string; sub: string; scrollHint: string };
  whoWeAre: { label: string; headline: string; body: string[] };
  services: {
    label: string;
    headline: string;
    intro: string;
    blurbs: Record<string, string>;
  };
  work: {
    label: string;
    headline: string;
    resultsNote: string;
    clientsLabel: string;
    viewLabel: string;
  };
  testimonials: {
    label: string;
    headline: string;
    empty: string;
    items: Testimonial[];
  };
  contact: {
    label: string;
    headline: string;
    body: string;
    emailLabel: string;
    instagramLabel: string;
    locationLabel: string;
    whatsappLabel: string;
    /** Mensaje precargado al abrir el chat. */
    whatsappMessage: string;
  };
  footer: { rights: string; builtIn: string };
  a11y: { skipToContent: string; openMenu: string; closeMenu: string; switchLang: string };
};

const SECTION_IDS = {
  who: 'who-we-are',
  services: 'services',
  work: 'work',
  testimonials: 'testimonials',
  contact: 'contact',
};

const en: Copy = {
  nav: {
    label: 'Main navigation',
    items: [
      { id: SECTION_IDS.who, label: 'Who we are' },
      { id: SECTION_IDS.services, label: 'Services' },
      { id: SECTION_IDS.work, label: 'Work' },
      { id: SECTION_IDS.testimonials, label: 'Clients' },
      { id: SECTION_IDS.contact, label: 'Contact' },
    ],
    cta: 'Let’s talk',
  },
  hero: {
    // [KIT] p.11
    headline: 'Post less. Sell more.',
    // [KIT] p.4, adaptado
    sub: 'Social media for food, drink and beauty brands in Miami. Strategy and copy for businesses whose margins are real.',
    scrollHint: 'Scroll',
  },
  whoWeAre: {
    label: 'Who we are',
    // [BORRADOR]
    headline: 'We run the feed like you run the floor',
    body: [
      // [KIT] p.4
      'Social Vibe is a social media agency for food, drink and beauty brands. The work is strategy and copy for businesses whose margins are real.',
      // [BORRADOR] — voz del kit: sustantivos concretos, los números aparecen
      'Covers, reservations, walk-ins, bookings. We write for the things you actually count at the end of the night.',
    ],
  },
  services: {
    label: 'Our services',
    // [BORRADOR]
    headline: 'What’s on the menu',
    intro: 'Four ways we work. Pick one, or the whole service.',
    // TODO: CONTENIDO CLIENTE — los portfolios solo listan los títulos.
    blurbs: {
      strategy:
        '[BORRADOR] Where the account is going and why. Audience, positioning, and a calendar your team can actually run.',
      'content-creation':
        '[BORRADOR] Photo and short-form shot on location. Planned, art-directed and edited to look like you on your best night.',
      photography:
        '[BORRADOR] Menu, room and product photography. The library you reuse across the year, not just one post.',
      'social-media-management':
        '[BORRADOR] Publishing, community and reporting. We answer the DMs and tell you what moved.',
    },
  },
  work: {
    label: 'Our work',
    // [KIT] p.11
    headline: 'Menu drops that move',
    resultsNote: 'Real numbers land here once the client signs off on what we can publish.',
    clientsLabel: 'Kitchens we’ve worked with',
    viewLabel: 'View the work',
  },
  testimonials: {
    label: 'What our clients are saying',
    // [BORRADOR]
    headline: 'Straight from the pass',
    empty:
      'Client quotes go here — real ones, with names. Nothing invented.',
    items: [],
  },
  contact: {
    label: 'Contact us',
    // [KIT] p.15
    headline: 'Let’s talk social media',
    // [BORRADOR]
    body: 'Tell us what you’re serving and where you want it to go. Message us on WhatsApp and we’ll pick it up from there.',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    locationLabel: 'Based in',
    whatsappLabel: 'WhatsApp',
    whatsappMessage:
      'Hi Jeniffer! I found Social Vibe online and I’d like to talk about my brand’s social media.',
  },
  footer: {
    rights: 'All rights reserved.',
    builtIn: 'Made in Miami',
  },
  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Ver en español',
  },
};

const es: Copy = {
  nav: {
    label: 'Navegación principal',
    items: [
      { id: SECTION_IDS.who, label: 'Quiénes somos' },
      { id: SECTION_IDS.services, label: 'Servicios' },
      { id: SECTION_IDS.work, label: 'Trabajos' },
      { id: SECTION_IDS.testimonials, label: 'Clientes' },
      { id: SECTION_IDS.contact, label: 'Contacto' },
    ],
    cta: 'Hablemos',
  },
  // Español neutro de Miami (tuteo). NO rioplatense: el público de Social
  // Vibe es cubano, venezolano, colombiano y peruano — "vos publicá" les
  // suena extranjero. Escrito, no traducido, como pide el kit.
  hero: {
    // [BORRADOR]
    headline: 'Publica menos. Vende más.',
    sub: 'Redes para marcas de comida, bebida y belleza en Miami. Estrategia y textos para negocios donde el margen es real.',
    scrollHint: 'Desliza',
  },
  whoWeAre: {
    label: 'Quiénes somos',
    // [BORRADOR]
    headline: 'Manejamos el feed como tú manejas el salón',
    body: [
      'Social Vibe es una agencia de redes para marcas de comida, bebida y belleza. El trabajo es estrategia y texto para negocios donde el margen es real.',
      'Comensales, reservas, gente que entra sin reservar. Escribimos para las cosas que de verdad cuentas al cierre.',
    ],
  },
  services: {
    label: 'Nuestros servicios',
    headline: 'Qué hay en el menú',
    intro: 'Cuatro formas de trabajar. Una sola, o el servicio completo.',
    blurbs: {
      strategy:
        '[BORRADOR] Hacia dónde va la cuenta y por qué. Audiencia, posicionamiento y un calendario que tu equipo pueda sostener.',
      'content-creation':
        '[BORRADOR] Foto y video corto en tu local. Planificado, dirigido y editado para que se vea como tu mejor noche.',
      photography:
        '[BORRADOR] Fotos de menú, salón y producto. El banco de imágenes que reutilizas todo el año, no una sola publicación.',
      'social-media-management':
        '[BORRADOR] Publicación, comunidad y reportes. Contestamos los mensajes y te decimos qué movió la aguja.',
    },
  },
  work: {
    label: 'Nuestro trabajo',
    // [BORRADOR] — eco de "Sold out by Sunday" del kit
    headline: 'Menús que se agotan',
    resultsNote: 'Los números reales entran aquí cuando Jeniffer confirme qué podemos publicar.',
    clientsLabel: 'Cocinas con las que trabajamos',
    viewLabel: 'Ver los trabajos',
  },
  testimonials: {
    label: 'Qué dicen nuestros clientes',
    headline: 'Directo desde la cocina',
    empty: 'Aquí van las citas de clientes — reales, con nombre. Nada inventado.',
    items: [],
  },
  contact: {
    label: 'Contacto',
    headline: 'Hablemos de redes',
    body: 'Cuéntanos qué sirves y a dónde quieres llegar. Escríbenos por WhatsApp y seguimos por ahí.',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    locationLabel: 'Estamos en',
    whatsappLabel: 'WhatsApp',
    whatsappMessage:
      '¡Hola Jeniffer! Vi la página de Social Vibe y me gustaría hablar sobre las redes de mi marca.',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    builtIn: 'Hecho en Miami',
  },
  a11y: {
    skipToContent: 'Ir al contenido',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLang: 'View in English',
  },
};

export const copy: Record<Locale, Copy> = { en, es };
export const getCopy = (locale: Locale): Copy => copy[locale];
export { SECTION_IDS };

/** Servicios con su blurb resuelto en el idioma pedido. */
export function servicesFor(locale: Locale) {
  const { blurbs } = copy[locale].services;
  return serviceList.map((s) => ({ ...s, blurb: blurbs[s.id] ?? null }));
}
