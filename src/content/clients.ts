// Clientes reales, tomados de la sección "Work Examples" del portfolio de
// gastronomía de Jeniffer (jensugc.com/social-media). Ya son públicos en su
// propio sitio, así que mostrarlos acá no agrega exposición nueva — igual
// conviene confirmarlo por escrito antes de publicar.
//
// TODO: CONTENIDO CLIENTE — confirmar la lista definitiva y sumar los
// clientes del portfolio general (hoy sin nombrar en ese sitio).

export type Client = {
  name: string;
  /** Rubro, para poder mostrar variedad más allá de gastronomía. */
  sector: 'food' | 'drink' | 'beauty' | 'other';
  /** Clave del manifest de imágenes cuando lleguen las piezas. */
  cover: string | null;
};

export const clients: Client[] = [
  { name: 'La Fresa Francesa', sector: 'food', cover: null },
  { name: 'Lima Bakery', sector: 'food', cover: null },
  { name: 'Big Joe', sector: 'food', cover: null },
  { name: 'Pink Cafe', sector: 'drink', cover: null },
  { name: 'Silverlake Bistro', sector: 'food', cover: null },
  { name: 'Avalon Miami', sector: 'food', cover: null },
  { name: 'Delicias del Perú', sector: 'food', cover: null },
];
