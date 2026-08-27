// Corrige el atributo lang de las páginas que no están en inglés.
//
// Por qué hace falta: en el App Router el <html> vive solo en el layout
// raíz, y en export estático ese layout no puede leer la ruta para saber el
// idioma. La alternativa idiomática sería mover todo a /[locale]/, pero eso
// empujaría el inglés a /en y dejaría la raíz con una redirección — peor
// para la URL principal. Reescribir el HTML ya generado es más chico, más
// explícito y produce el marcado correcto para lectores y buscadores.
//
// Se encadena en `pnpm build`, después de next build.

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', 'out');

/** Rutas exportadas que no son inglés. */
const NON_EN = [{ dir: 'es', lang: 'es' }];

let patched = 0;

for (const { dir, lang } of NON_EN) {
  const file = path.join(OUT, dir, 'index.html');
  if (!existsSync(file)) {
    console.warn(`fix-lang: no se encontró ${path.relative(OUT, file)} — se omite.`);
    continue;
  }
  const html = await readFile(file, 'utf8');
  const fixed = html.replace(/<html([^>]*?)lang="[^"]*"/, `<html$1lang="${lang}"`);
  if (fixed === html) {
    throw new Error(`fix-lang: no se pudo reescribir lang en ${file}. ¿Cambió el marcado?`);
  }
  await writeFile(file, fixed);
  patched++;
}

console.log(`fix-lang: ${patched} página(s) corregidas.`);
