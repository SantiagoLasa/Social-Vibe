// Galería de trabajos: las 16 fotos que entregó Jeniffer.
//
// TODO: CONTENIDO CLIENTE — falta saber a qué cliente pertenece cada foto.
// Con eso se pueden agrupar por marca y sumar el nombre en el pie.
// El `alt` describe lo que se ve; el `sector` sirve para mostrar que el
// trabajo va más allá de gastronomía.

export type Sector = 'food' | 'drink' | 'beauty' | 'fashion' | 'other';

export type Shot = {
  image: string;
  alt: string;
  sector: Sector;
};

export const gallery: Shot[] = [
  { image: 'photos/photo-01', sector: 'food', alt: 'Porción de pizza de pepperoni con burrata, levantada de la bandeja.' },
  { image: 'photos/photo-02', sector: 'food', alt: 'Sirope cayendo sobre una torre de pancakes con frutillas.' },
  { image: 'photos/photo-03', sector: 'food', alt: 'Pancakes de chocolate con crema y menta sobre plato rosa.' },
  { image: 'photos/photo-04', sector: 'beauty', alt: 'Primer plano de una aplicación de extensiones de pestañas.' },
  { image: 'photos/photo-05', sector: 'beauty', alt: 'Sesión de extensiones de pestañas vista desde arriba.' },
  { image: 'photos/photo-06', sector: 'drink', alt: 'Botella de vino tinto junto a una copa servida.' },
  { image: 'photos/photo-07', sector: 'food', alt: 'Comensal con copa de vino frente a un plato de entrada.' },
  { image: 'photos/photo-08', sector: 'other', alt: 'Husky blanco envuelto en una toalla celeste después del baño.' },
  { image: 'photos/photo-09', sector: 'food', alt: 'Torta de zanahoria de varios pisos decorada con nueces y flores.' },
  { image: 'photos/photo-10', sector: 'food', alt: 'Mesa con pancakes y un cóctel rosado en terraza.' },
  { image: 'photos/photo-11', sector: 'fashion', alt: 'Mano con anillos dorados sosteniendo un sombrero de paja verde.' },
  { image: 'photos/photo-12', sector: 'fashion', alt: 'Modelo con anillos y aros dorados ajustándose los lentes de sol.' },
  { image: 'photos/photo-13', sector: 'drink', alt: 'Vaso de café con crema batida de la marca Iconik Koffee.' },
  { image: 'photos/photo-14', sector: 'food', alt: 'Porción de cheesecake con salsa de arándanos.' },
  { image: 'photos/photo-15', sector: 'food', alt: 'Hamburguesa doble con papas y una lata de gaseosa.' },
  { image: 'photos/photo-16', sector: 'food', alt: 'Canasta de pan de ajo con queso sobre papel a cuadros.' },
];
