// Capturas de resultados reales que revela la bandeja.
//
// Son screenshots de Instagram Insights de cuentas que maneja Jeniffer,
// entregados el 31/08. Se muestran tal cual: la prueba es la captura, no un
// número que escribimos nosotros.
//
// El orden importa — es el que siguen al salir de la bandeja, así que el
// número más fuerte sale primero.

export type ResultShot = {
  id: string;
  /** Clave del manifest de imágenes. */
  image: string;
  /** Texto alternativo: la métrica dicha en palabras, para lectores de pantalla. */
  alt: string;
};

export const results: ResultShot[] = [
  {
    id: 'engagement-502k',
    image: 'results/engagement-502k',
    alt: 'Instagram insights: 502 mil reproducciones, 57 mil me gusta, 1.241 compartidos y 2.773 guardados.',
  },
  {
    id: 'dashboard-24k',
    image: 'results/dashboard-24k',
    alt: 'Panel de Instagram: 24 mil cuentas alcanzadas, un 89,6% más; 645 cuentas activadas, un 72,5% más.',
  },
  {
    id: 'engagement-374k',
    image: 'results/engagement-374k',
    alt: 'Instagram insights: 374 mil reproducciones, 48 mil me gusta, 1.935 compartidos y 4.621 guardados.',
  },
  {
    id: 'views-113k-dark',
    image: 'results/views-113k-dark',
    alt: 'Instagram insights: 112.781 reproducciones, 63,7% de seguidores y 36,3% de no seguidores.',
  },
  {
    id: 'insights-136k',
    image: 'results/insights-136k',
    alt: 'Instagram insights: 136,2 mil reproducciones y 1,1 mil seguidores nuevos.',
  },
];

/** Las que no entran en la bandeja, disponibles para otras secciones. */
export const extraResults: ResultShot[] = [
  {
    id: 'monthly-136k',
    image: 'results/monthly-136k',
    alt: 'Resumen mensual de Instagram: 136.179 reproducciones y 989 seguidores netos.',
  },
  {
    id: 'insights-113k-dark',
    image: 'results/insights-113k-dark',
    alt: 'Instagram insights: 112,8 mil reproducciones, 2,5 mil interacciones y 385 seguidores nuevos.',
  },
  {
    id: 'insights-74k',
    image: 'results/insights-74k',
    alt: 'Instagram insights: 73,8 mil reproducciones y 88 seguidores nuevos.',
  },
];
