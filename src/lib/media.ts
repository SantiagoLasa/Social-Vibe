import manifest from './media-manifest.json';

// Manifest generado por scripts/optimize-images.mjs — no editar a mano.
export type MediaEntry = {
  width: number;
  height: number;
  widths: number[];
  /** Los recortes con transparencia usan PNG de respaldo en vez de JPG. */
  hasAlpha: boolean;
  /** null en imágenes con alfa: un blur pintaría un rectángulo detrás. */
  blurDataURL: string | null;
};

const entries = manifest as Record<string, MediaEntry>;

export function getMedia(key: string): MediaEntry {
  const entry = entries[key];
  if (!entry) {
    throw new Error(
      `Imagen "${key}" no está en el manifest. ¿Existe en assets-raw/ y corriste \`pnpm images\`?`,
    );
  }
  return entry;
}

/** Extensión del respaldo según transparencia. */
export const fallbackExt = (key: string) => (getMedia(key).hasAlpha ? 'png' : 'jpg');

export function srcSetFor(key: string, format: 'avif' | 'webp' | 'png' | 'jpg'): string {
  return getMedia(key)
    .widths.map((w) => `/media/${key}-${w}.${format} ${w}w`)
    .join(', ');
}

/** URL del respaldo en el ancho más grande disponible. */
export function fallbackSrc(key: string): string {
  const { widths } = getMedia(key);
  return `/media/${key}-${widths[widths.length - 1]}.${fallbackExt(key)}`;
}
