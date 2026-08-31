// Los ocho servicios, tomados del PDF "CONTENT CREATION PACKAGE" que pasó
// Jeniffer (página 02). El orden y la numeración son los de ese documento.
//
// DECISIÓN: el sitio NO muestra precios. El PDF tiene tres paquetes con
// valores mensuales; acá van solo las descripciones para despertar interés
// y que el precio se converse por WhatsApp. Si alguna vez se quieren
// publicar, están en el PDF, no acá.

export type Service = {
  id: string;
  title: string;
  /** El texto vive en copy.ts, por idioma. */
  blurb: string | null;
};

export const services: Service[] = [
  { id: 'content-creation', title: 'Content Creation', blurb: null },
  { id: 'social-media-management', title: 'Social Media Management', blurb: null },
  { id: 'strategy', title: 'Social Media Strategy', blurb: null },
  { id: 'photography', title: 'Photography & Videography', blurb: null },
  { id: 'graphic-design', title: 'Graphic Design', blurb: null },
  { id: 'ads', title: 'Ads Management', blurb: null },
  { id: 'events', title: 'Event Coverage', blurb: null },
  { id: 'influencers', title: 'Influencer & Partnerships', blurb: null },
  // No está en el PDF: lo suma el cliente el 31/08.
  { id: 'web', title: 'Website Design', blurb: null },
];
