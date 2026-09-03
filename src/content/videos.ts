// Reels que se reproducen en bucle y en silencio, como en el feed.
//
// DÓNDE VIVEN LOS ARCHIVOS
// Se sirven desde el propio sitio. Los MP4 están versionados en
// assets-raw/_source/ y scripts/copy-reels.mjs los publica acá en cada build.
//
// Se evaluó Cloudflare R2 y no hace falta: Pages tampoco cobra transferencia,
// admite 25 MiB por archivo (el reel más pesado son 4,4 MB) y no pide tarjeta.
// R2 recién tendría sentido si algún video superara ese límite.
export const REELS_BASE = '/media/reels';

export type Reel = {
  id: string;
  file: string;
  /** Qué se ve, para quien no puede reproducir el video. */
  alt: string;
  /** Segundos: sirve para reservar el espacio y para ordenar la tira. */
  seconds: number;
};

// La lista y la carpeta assets-raw/_source/ tienen que coincidir: un reel
// listado que no existe da 404, y uno que existe sin listar no se muestra.
// scripts/copy-reels.mjs avisa de las dos cosas en cada build.
//
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
    id: 'reel-02',
    file: 'reel-02.mp4',
    alt: 'Clip en una clínica veterinaria: personal en ambo atendiendo a un perro internado.',
    seconds: 18,
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
    id: 'reel-06',
    file: 'reel-06.mp4',
    alt: 'Clip de contenido gastronómico.',
    seconds: 14,
  },
];
