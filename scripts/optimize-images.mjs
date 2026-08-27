// Pipeline de imágenes — reemplaza a next/image (deshabilitado en export estático).
//
// Recorre /assets-raw/ y por cada imagen genera variantes AVIF + WebP + JPG en
// los anchos estándar, escribiendo en /public/media/. Emite además
// src/lib/media-manifest.json con dimensiones y blurDataURL de 20px por imagen.
//
// Objetivo: ninguna imagen servida supera los 200 KB.
//
// Uso: pnpm images (se encadena automáticamente en pnpm build)

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets-raw');
const OUT_DIR = path.join(ROOT, 'public', 'media');
const MANIFEST = path.join(ROOT, 'src', 'lib', 'media-manifest.json');

const STANDARD_WIDTHS = [480, 768, 1200, 1920];
const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_BYTES = 200 * 1024;

// AVIF y WebP soportan transparencia; JPG no. Para imágenes con canal alfa
// (los recortes de la escena) el respaldo es PNG en vez de JPG.
function formatsFor(hasAlpha) {
  return [
    { ext: 'avif', make: (img) => img.avif({ quality: 55 }) },
    { ext: 'webp', make: (img) => img.webp({ quality: 75 }) },
    hasAlpha
      ? { ext: 'png', make: (img) => img.png({ compressionLevel: 9, palette: true }) }
      : { ext: 'jpg', make: (img) => img.jpeg({ quality: 78, progressive: true, mozjpeg: true }) },
  ];
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    // Carpetas con guion bajo son material de trabajo (originales sin
    // recortar, descartes): no se publican.
    if (entry.name.startsWith('_')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function targetWidths(originalWidth) {
  const widths = STANDARD_WIDTHS.filter((w) => w <= originalWidth);
  // Imagen más angosta que 1920: su ancho original es la variante máxima.
  if (originalWidth < 1920 && !widths.includes(originalWidth)) {
    widths.push(originalWidth);
  }
  return widths.length ? widths : [originalWidth];
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.log('assets-raw/ no existe — nada que procesar.');
    await writeFile(MANIFEST, '{}\n');
    return;
  }

  const manifest = {};
  const warnings = [];
  let generated = 0;
  let skipped = 0;

  for await (const file of walk(SRC_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (!INPUT_EXTS.has(ext)) continue;

    const rel = path.relative(SRC_DIR, file);
    const key = rel.slice(0, -ext.length).split(path.sep).join('/');
    const srcStat = await stat(file);
    const meta = await sharp(file).metadata();
    const widths = targetWidths(meta.width);

    await mkdir(path.dirname(path.join(OUT_DIR, key)), { recursive: true });

    const formats = formatsFor(Boolean(meta.hasAlpha));

    for (const width of widths) {
      for (const { ext: outExt, make } of formats) {
        const outPath = path.join(OUT_DIR, `${key}-${width}.${outExt}`);
        if (existsSync(outPath) && (await stat(outPath)).mtimeMs > srcStat.mtimeMs) {
          skipped++;
          continue;
        }
        await make(sharp(file).resize({ width })).toFile(outPath);
        generated++;
        const bytes = (await stat(outPath)).size;
        // El presupuesto aplica a lo que el navegador realmente sirve. El
        // respaldo (PNG/JPG) solo llega a navegadores sin AVIF ni WebP.
        const isServed = outExt === 'avif' || outExt === 'webp';
        if (isServed && bytes > MAX_BYTES) {
          warnings.push(`${path.relative(ROOT, outPath)} pesa ${Math.round(bytes / 1024)} KB (> 200 KB)`);
        }
      }
    }

    // Placeholder blur de 20px para reservar el espacio sin CLS. En recortes
    // con alfa no corresponde: pintaría un rectángulo detrás de la silueta.
    const blurDataURL = meta.hasAlpha
      ? null
      : `data:image/jpeg;base64,${(
          await sharp(file).resize({ width: 20 }).jpeg({ quality: 40 }).toBuffer()
        ).toString('base64')}`;

    manifest[key] = {
      width: meta.width,
      height: meta.height,
      widths: widths.sort((a, b) => a - b),
      hasAlpha: Boolean(meta.hasAlpha),
      blurDataURL,
    };
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');

  console.log(
    `Imágenes: ${Object.keys(sorted).length} fuentes · ${generated} variantes generadas · ${skipped} al día.`,
  );
  for (const w of warnings) console.warn(`⚠ ${w}`);
  if (warnings.length) process.exitCode = 0; // aviso, no error: revisar calidad/fuente
}

await main();
