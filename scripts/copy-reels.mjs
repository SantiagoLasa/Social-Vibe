// Publica los reels — paso de build.
//
// Los cinco MP4 viven versionados en assets-raw/_source/ (13 MB, ya
// convertidos a 720×1280 y con el moov al principio). public/media/reels/ no
// se versiona: lo genera este script, igual que optimize-images.mjs genera el
// resto de /public/media/.
//
// Por qué se sirven desde el propio sitio y no desde un bucket: Cloudflare
// Pages no cobra transferencia, admite hasta 20.000 archivos por sitio y
// 25 MiB por archivo — el reel más pesado son 4,4 MB. R2 recién haría falta
// si algún video superara ese límite.
//
// Uso: pnpm reels (se encadena automáticamente en pnpm build)

import { copyFile, mkdir, open, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets-raw', '_source');
const OUT_DIR = path.join(ROOT, 'public', 'media', 'reels');

// Límite de Cloudflare Pages para un asset individual.
const MAX_BYTES = 25 * 1024 * 1024;

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/**
 * ¿El átomo `moov` viene antes que `mdat`?
 *
 * Si está al final, el navegador descarga el archivo entero antes de mostrar
 * el primer cuadro. Alcanza con mirar la cabecera: `ftyp` y `moov` son los
 * primeros bloques de un MP4 optimizado para web.
 */
async function isFaststart(file) {
  const fh = await open(file, 'r');
  try {
    const { buffer, bytesRead } = await fh.read(Buffer.alloc(4096), 0, 4096, 0);
    const head = buffer.toString('latin1', 0, bytesRead);
    const moov = head.indexOf('moov');
    const mdat = head.indexOf('mdat');
    return moov !== -1 && (mdat === -1 || moov < mdat);
  } finally {
    await fh.close();
  }
}

async function main() {
  const names = (await readdir(SRC_DIR))
    .filter((name) => /^reel-\d+\.mp4$/.test(name))
    .sort();

  if (!names.length) {
    console.warn('⚠ No hay reels en assets-raw/_source/ — la tira queda vacía.');
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  const warnings = [];
  let copied = 0;
  let fresh = 0;
  let total = 0;

  for (const name of names) {
    const src = path.join(SRC_DIR, name);
    const dest = path.join(OUT_DIR, name);
    const source = await stat(src);
    total += source.size;

    if (source.size > MAX_BYTES) {
      warnings.push(
        `${name} pesa ${mb(source.size)}: Cloudflare Pages no publica assets de más de 25 MiB.`,
      );
    }
    if (!(await isFaststart(src))) {
      warnings.push(
        `${name} tiene el moov al final — correr: node scripts/faststart.mjs assets-raw/_source/${name}`,
      );
    }

    // Mismo tamaño y no más viejo que la fuente: ya está al día.
    const published = await stat(dest).catch(() => null);
    if (published && published.size === source.size && published.mtimeMs >= source.mtimeMs) {
      fresh++;
      continue;
    }

    await copyFile(src, dest);
    copied++;
  }

  console.log(
    `Reels: ${names.length} archivos · ${copied} copiados · ${fresh} al día · ${mb(total)} en total.`,
  );
  for (const w of warnings) console.warn(`⚠ ${w}`);
}

await main();
