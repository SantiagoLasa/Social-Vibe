import type { Locale } from './brand';
import { services as serviceList } from './services';

// Todo el texto visible del sitio, por idioma. Cero strings en JSX.
//
// ESTADO DEL COPY:
//   · [JEN] — texto que mandó Jeniffer el 31/08. Es su voz; se respeta tal
//     cual salvo por los emojis en titulares (ver nota abajo).
//   · [BORRADOR] — escrito por nosotros siguiendo su tono. Ella confirma.
//   · El español NO es traducción: está escrito aparte, en neutro de Miami
//     (tuteo), que es lo que pide el propio brand kit.
//   · Testimonios vacíos a propósito: no se inventan.
//
// NOTA SOBRE EMOJIS: Jeniffer usa ✨ 👀 🩷 en su texto. Se conservan en
// cuerpo y bajadas, pero NO en los titulares Bodoni: a 60px un emoji pelea
// con la tipografía display y rompe el "credible before cute" del kit.
// Si los quiere también ahí, es agregar el carácter y listo.

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
    /** Cierre que empuja al contacto: los precios se conversan, no se publican. */
    closing: string;
  };
  work: {
    label: string;
    headline: string;
    leadIn: string;
    viewLabel: string;
    resultsNote: string;
    clientsLabel: string;
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
    ctaLabel: string;
    emailLabel: string;
    instagramLabel: string;
    locationLabel: string;
    whatsappLabel: string;
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
    // [JEN]
    headline: 'Strategy. Content. Social media. With a sprinkle of creative chaos.',
    sub: 'We dig into your brand, your audience, your goals, and the little things that make your business different.',
    scrollHint: 'Scroll',
  },
  whoWeAre: {
    // [JEN]
    label: 'Who are we?',
    headline: 'We’re the creative team behind the content that gets your brand noticed.',
    body: [
      'A Miami-based social media and content creation agency helping businesses show up online with strategy + creativity + personality — content that feels like your brand while helping you increase visibility, build credibility, create community, and turn attention into business.',
      'Our goal is to make creating content feel less overwhelming, and make showing up online feel a whole lot easier.',
      'You run the business. We’ll make sure people know about it. 🩷',
    ],
  },
  services: {
    label: 'Our services',
    // [BORRADOR] — el titular es nuestro; el resto sale del PDF de paquetes.
    headline: 'What’s on the menu',
    // [JEN] PDF p.02
    intro:
      'Everything your brand needs to show up consistently, look premium and actually convert — handled in-house.',
    blurbs: {
      'content-creation': 'Reels, photo and video built around your brand story.',
      'social-media-management': 'Posting, captions, community and inbox handled daily.',
      strategy: 'Monthly direction, content pillars and growth goals.',
      photography: 'On-site shoots with pro lighting and styling.',
      'graphic-design': 'Branded templates, menus, flyers and story graphics.',
      ads: 'Meta campaign setup, targeting and optimization.',
      events: 'Live coverage of launches, tastings and openings.',
      influencers: 'Sourcing, briefing and managing collaborations.',
      // [BORRADOR] — no está en el PDF, escrito en su misma voz.
      web: 'Sites and landing pages built to turn visits into bookings.',
    },
    // [JEN] PDF p.02 y p.04, combinados. Sin precios a propósito.
    closing:
      'Mix and match, or pick a package. Tell us your goals and we’ll build a bundle around them.',
  },
  work: {
    // [JEN]
    label: 'Our work',
    headline: 'We could tell you we’re good at content…',
    leadIn: 'But we’d rather show you. 👀',
    viewLabel: 'View our work',
    resultsNote: 'Real numbers, straight from the accounts we run.',
    clientsLabel: 'Kitchens we’ve worked with',
  },
  testimonials: {
    label: 'What our clients are saying',
    // [BORRADOR]
    headline: 'Straight from the pass',
    empty: 'Client quotes go here — real ones, with names. Nothing invented.',
    items: [],
  },
  contact: {
    // [JEN]
    label: 'Ready to find your vibe?',
    headline: 'Your next customer is already scrolling.',
    body: 'Let’s give them something worth stopping for.',
    ctaLabel: 'Let’s work together',
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

// Español neutro de Miami (tuteo). Escrito en el tono de Jeniffer — cálido
// y directo — no traducido palabra por palabra.
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
  hero: {
    headline: 'Estrategia. Contenido. Redes. Con una pizca de caos creativo.',
    sub: 'Nos metemos en tu marca, tu público, tus metas y en los detalles que hacen distinto a tu negocio.',
    scrollHint: 'Desliza',
  },
  whoWeAre: {
    label: '¿Quiénes somos?',
    headline: 'Somos el equipo creativo detrás del contenido que hace que te vean.',
    body: [
      'Agencia de redes y creación de contenido en Miami. Ayudamos a los negocios a mostrarse online con estrategia + creatividad + personalidad: contenido que se siente tuyo, que suma visibilidad, credibilidad y comunidad, y que convierte la atención en clientes.',
      'Queremos que crear contenido deje de abrumarte, y que estar online se sienta mucho más fácil.',
      'Tú llevas el negocio. Nosotros nos encargamos de que se sepa. 🩷',
    ],
  },
  services: {
    label: 'Nuestros servicios',
    headline: 'Qué hay en el menú',
    intro:
      'Todo lo que tu marca necesita para estar presente, verse premium y de verdad convertir — hecho puertas adentro.',
    blurbs: {
      'content-creation': 'Reels, fotos y video construidos sobre la historia de tu marca.',
      'social-media-management': 'Publicaciones, captions, comunidad y mensajes, todos los días.',
      strategy: 'Dirección mensual, pilares de contenido y metas de crecimiento.',
      photography: 'Sesiones en tu local, con iluminación y estilismo profesional.',
      'graphic-design': 'Plantillas de marca, menús, flyers y gráficas para stories.',
      ads: 'Campañas en Meta: armado, segmentación y optimización.',
      events: 'Cobertura en vivo de lanzamientos, degustaciones y aperturas.',
      influencers: 'Búsqueda, briefing y gestión de colaboraciones.',
      // [BORRADOR]
      web: 'Sitios y landing pages hechos para convertir visitas en reservas.',
    },
    closing:
      'Combínalos, o elige un paquete. Cuéntanos tus metas y armamos uno a tu medida.',
  },
  work: {
    label: 'Nuestro trabajo',
    headline: 'Podríamos decirte que somos buenos con el contenido…',
    leadIn: 'Pero preferimos mostrártelo. 👀',
    viewLabel: 'Ver los trabajos',
    resultsNote: 'Números reales, sacados de las cuentas que manejamos.',
    clientsLabel: 'Cocinas con las que trabajamos',
  },
  testimonials: {
    label: 'Qué dicen nuestros clientes',
    headline: 'Directo desde la cocina',
    empty: 'Aquí van las citas de clientes — reales, con nombre. Nada inventado.',
    items: [],
  },
  contact: {
    label: '¿Listos para encontrar tu vibe?',
    headline: 'Tu próximo cliente ya está scrolleando.',
    body: 'Démosle algo que valga la pena mirar.',
    ctaLabel: 'Trabajemos juntos',
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
