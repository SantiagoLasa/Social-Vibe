// Reels que se reproducen en bucle y en silencio, como en el feed.
//
// DÓNDE VIVEN LOS ARCHIVOS
// Hoy se sirven desde el propio sitio (public/media/reels) para poder
// probarlos en local. En producción van a Cloudflare R2, que no cobra
// transferencia. Migrar es cambiar esta única constante por la URL pública
// del bucket — nada más en todo el proyecto.
//
// Los .mp4 no se versionan: pesan 12,9 MB y se suben una vez a R2.
export const REELS_BASE = '/media/reels';

export type Reel = {
  id: string;
  file: string;
  /** Qué se ve, para quien no puede reproducir el video. */
  alt: string;
  /** Segundos: sirve para reservar el espacio y para ordenar la tira. */
  seconds: number;
};

// Convertidos desde los originales del iPhone: 720×1280, sin audio, ~2 Mbps.
// TODO: CONTENIDO CLIENTE — las descripciones son nuestras, mirando cada
// clip. Si Jeniffer sabe de qué local es cada uno, mejor nombrarlos.
export const reels: Reel[] = [
  {
    id: 'reel-01',
    file: 'reel-01.mp4',
    alt: 'Clip de contenido para una hamburguesería.',
    seconds: 8,
  },
  {
    id: 'reel-03',
    file: 'reel-03.mp4',
    alt: 'Clip de contenido gastronómico.',
    seconds: 9,
  },
  {
    id: 'reel-04',
    file: 'reel-04.mp4',
    alt: 'Clip de contenido gastronómico.',
    seconds: 18,
  },
  {
    id: 'reel-05',
    file: 'reel-05.mp4',
    alt: 'Clip de contenido gastronómico.',
    seconds: 6,
  },
  {
    id: 'reel-06',
    file: 'reel-06.mp4',
    alt: 'Clip de contenido gastronómico.',
    seconds: 14,
  },
];
