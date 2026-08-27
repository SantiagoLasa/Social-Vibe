// Los cuatro servicios, tomados de los portfolios actuales de Jeniffer
// (jensugc.com y jenssocialss.com, sección "what we offer for your business").
//
// TODO: CONTENIDO CLIENTE — falta el copy de cada uno. Los portfolios solo
// listan los títulos, sin descripción. Cada servicio necesita su párrafo en
// inglés y en español (escrito, no traducido).

export type Service = {
  id: string;
  title: string;
  /** null = pendiente del cliente. Nunca inventar. */
  blurb: string | null;
};

export const servicesSection = {
  eyebrow: 'Our services',
  // TODO: CONTENIDO CLIENTE — titular de sección
  headline: null as string | null,
};

export const services: Service[] = [
  { id: 'strategy', title: 'Strategy', blurb: null },
  { id: 'content-creation', title: 'Content Creation', blurb: null },
  { id: 'photography', title: 'Professional Photography', blurb: null },
  { id: 'social-media-management', title: 'Social Media Management', blurb: null },
];
