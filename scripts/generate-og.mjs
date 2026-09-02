// Genera las imágenes de Open Graph (1200×630) y el favicon.
//
// Son las tarjetas que aparecen al compartir el link por WhatsApp,
// Instagram o Slack. Sin ellas se ve un rectángulo gris — mala primera
// impresión para una agencia que vende imagen.
//
// El texto se renderiza con las FUENTES REALES de la marca, incluidas en
// scripts/fonts (ambas con licencia OFL, se pueden distribuir). Es la
// única forma de que el resultado sea idéntico en cualquier máquina: las
// fuentes del sistema varían entre esta computadora y el servidor de
// build, y una versión anterior que dibujaba el wordmark con rectángulos
// se leía como una imagen rota.
//
// Se encadena en `pnpm build`. Los colores salen de scripts/palette.mjs.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { palette } from './palette.mjs';

const { bistre, vanilla, columbia, flame, paper } = palette;
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'og');
const BODONI = path.join(ROOT, 'scripts', 'fonts', 'BodoniModa.ttf');
const JOST = path.join(ROOT, 'scripts', 'fonts', 'Jost.ttf');
await mkdir(OUT, { recursive: true });

const W = 1200;
const H = 630;

/** Rayas del brand kit: columbia y vanilla sobre papel. */
function stripes() {
  let out = '';
  for (let x = 0; x < W; x += 78) {
    out += `<rect x="${x}" y="0" width="26" height="${H}" fill="${columbia}"/>`;
    out += `<rect x="${x + 39}" y="0" width="26" height="${H}" fill="${vanilla}"/>`;
  }
  return out;
}

/** Texto renderizado con una fuente concreta, sin depender del sistema. */
const texto = (text, fontfile, font, width, height) =>
  sharp({
    text: { text, fontfile, font, rgba: true, width, height, align: 'center' },
  })
    .png()
    .toBuffer();

async function tarjeta(archivo) {
  // Fondo: papel con rayas.
  const fondo = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="${paper}"/>
      ${stripes()}
    </svg>`,
  );

  // El patch, inclinado −1.6° como manda el brand kit.
  const pw = 760;
  const ph = 300;
  const patch = await sharp(
    Buffer.from(
      `<svg width="${pw}" height="${ph}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${pw}" height="${ph}" rx="30" fill="${bistre}"/>
      </svg>`,
    ),
  )
    .rotate(-1.6, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const patchMeta = await sharp(patch).metadata();

  const wordmark = await texto(
    `<span foreground="${vanilla}">SOCIAL VIBE</span>`,
    BODONI,
    'Bodoni Moda 900',
    620,
    150,
  );
  const sub = await texto(
    `<span foreground="${columbia}" letter_spacing="18000">MEDIA AGENCY</span>`,
    JOST,
    'Jost 400',
    420,
    40,
  );
  const wm = await sharp(wordmark).metadata();
  const sm = await sharp(sub).metadata();

  await sharp(fondo)
    .composite([
      {
        input: patch,
        left: Math.round((W - patchMeta.width) / 2),
        top: Math.round((H - patchMeta.height) / 2) - 10,
      },
      { input: wordmark, left: Math.round((W - wm.width) / 2), top: Math.round(H / 2 - wm.height / 2) - 30 },
      { input: sub, left: Math.round((W - sm.width) / 2), top: Math.round(H / 2) + 55 },
      // Filete inferior: cierra la tarjeta y ancla la paleta.
      {
        input: Buffer.from(
          `<svg width="${W}" height="26" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="26" fill="${flame}"/></svg>`,
        ),
        left: 0,
        top: H - 26,
      },
    ])
    .jpeg({ quality: 88, progressive: true })
    .toFile(path.join(OUT, archivo));
}

await tarjeta('default.jpg');
await tarjeta('es.jpg');

// Logo cuadrado para Schema.org y buscadores.
const wordmarkLogo = await texto(
  `<span foreground="${vanilla}">SV</span>`,
  BODONI,
  'Bodoni Moda 900',
  260,
  200,
);
const wl = await sharp(wordmarkLogo).metadata();
await sharp(
  Buffer.from(
    `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="${paper}"/>
      <circle cx="256" cy="256" r="200" fill="${bistre}"/>
    </svg>`,
  ),
)
  .composite([{ input: wordmarkLogo, left: Math.round((512 - wl.width) / 2), top: Math.round((512 - wl.height) / 2) }])
  .png()
  .toFile(path.join(OUT, 'logo.png'));

// Favicon: el sello del brand kit. A 32px una tipografía fina no se lee,
// así que va el monograma sobre el círculo, sin más.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="24" fill="${bistre}"/>
  <path d="M17.6 15.4c-2.6 0-4.3 1.4-4.3 3.4 0 4.2 6.6 3 6.6 5.4 0 .9-.8 1.5-2 1.5-1.4 0-2.4-.7-2.6-2h-2.2c.2 2.4 2 3.8 4.7 3.8 2.8 0 4.5-1.4 4.5-3.5 0-4.3-6.6-3.2-6.6-5.5 0-.8.7-1.3 1.8-1.3 1.2 0 2 .6 2.2 1.7h2.2c-.2-2.2-1.8-3.5-4.3-3.5z" fill="${vanilla}"/>
  <path d="M25.2 15.6h2.4l2.7 8.6 2.7-8.6h2.3l-3.9 11.7h-2.3z" fill="${flame}"/>
</svg>
`;
await writeFile(path.join(ROOT, 'src', 'app', 'icon.svg'), icon);

console.log('OG: 2 tarjetas · logo.png · icon.svg');
