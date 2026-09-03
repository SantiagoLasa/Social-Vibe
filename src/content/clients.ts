// Clientes reales. La lista la fijó Jeniffer el 03/09: sacó Big Joe y
// Delicias del Perú, y sumó Iconik Koffee y Piruw Grill. Antes salía del
// portfolio de gastronomía (jensugc.com/social-media), que estaba desactualizado.

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
  { name: 'Pink Cafe', sector: 'drink', cover: null },
  { name: 'Silverlake Bistro', sector: 'food', cover: null },
  { name: 'Avalon Miami', sector: 'food', cover: null },
  { name: 'Iconik Koffee', sector: 'drink', cover: null },
  { name: 'Piruw Grill', sector: 'food', cover: null },
];
