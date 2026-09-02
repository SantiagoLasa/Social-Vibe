// Mueve el átomo `moov` al principio de un MP4 (lo que HandBrake llama
// "Web Optimized" y ffmpeg "faststart").
//
// Por qué importa: `moov` es el índice del video — dice dónde empieza cada
// cuadro. Si está al final, el navegador tiene que descargar el archivo
// completo antes de poder mostrar el primer fotograma. Al principio,
// empieza a reproducir con los primeros kilobytes.
//
// No recodifica nada: solo reordena bloques del contenedor, así que la
// calidad es idéntica y tarda milisegundos.
//
// Uso: node scripts/faststart.mjs archivo.mp4 [archivo2.mp4 ...]

import fs from 'node:fs';

/** Lista los bloques de primer nivel: {type, start, size}. */
function topLevelBoxes(buf) {
  const out = [];
  let p = 0;
  while (p + 8 <= buf.length) {
    let size = buf.readUInt32BE(p);
    const type = buf.toString('latin1', p + 4, p + 8);
    // size 1 = tamaño extendido de 64 bits en los 8 bytes siguientes
    if (size === 1) size = Number(buf.readBigUInt64BE(p + 8));
    if (size === 0) size = buf.length - p; // hasta el final
    if (size < 8) break;
    out.push({ type, start: p, size });
    p += size;
  }
  return out;
}

/**
 * Suma `delta` a cada offset de chunk dentro de moov.
 * Al mover moov hacia adelante, todos los datos se corren esa distancia y
 * las tablas stco/co64 —que apuntan a posiciones absolutas— quedarían
 * desfasadas. Sin este paso el archivo se rompe.
 */
function shiftChunkOffsets(moov, delta) {
  let patched = 0;
  (function walk(start, end) {
    let p = start;
    while (p + 8 <= end) {
      const size = moov.readUInt32BE(p);
      const type = moov.toString('latin1', p + 4, p + 8);
      if (size < 8) break;
      const body = p + 8;

      if (type === 'stco') {
        const n = moov.readUInt32BE(body + 4);
        for (let i = 0; i < n; i++) {
          const at = body + 8 + i * 4;
          moov.writeUInt32BE(moov.readUInt32BE(at) + delta, at);
        }
        patched += n;
      } else if (type === 'co64') {
        const n = moov.readUInt32BE(body + 4);
        for (let i = 0; i < n; i++) {
          const at = body + 8 + i * 8;
          moov.writeBigUInt64BE(moov.readBigUInt64BE(at) + BigInt(delta), at);
        }
        patched += n;
      } else if (['trak', 'mdia', 'minf', 'stbl', 'edts', 'udta'].includes(type)) {
        walk(body, p + size);
      }
      p += size;
    }
  })(8, moov.length); // salta la cabecera del propio moov

  return patched;
}

function faststart(file) {
  const buf = fs.readFileSync(file);
  const boxes = topLevelBoxes(buf);
  const moov = boxes.find((b) => b.type === 'moov');
  const mdat = boxes.find((b) => b.type === 'mdat');

  if (!moov || !mdat) return { file, status: 'sin moov/mdat — se omite' };
  if (moov.start < mdat.start) return { file, status: 'ya estaba al principio' };

  // Se descartan los bloques `free`: son relleno y solo suman peso.
  const rest = boxes.filter((b) => b.type !== 'moov' && b.type !== 'free' && b.type !== 'skip');
  const ftyp = rest.filter((b) => b.type === 'ftyp');
  const others = rest.filter((b) => b.type !== 'ftyp');

  const moovCopy = Buffer.from(buf.subarray(moov.start, moov.start + moov.size));

  // Nueva posición de los datos = después de ftyp + moov.
  const ftypBytes = ftyp.reduce((s, b) => s + b.size, 0);
  const firstDataOld = others[0].start;
  const firstDataNew = ftypBytes + moovCopy.length;
  const delta = firstDataNew - firstDataOld;

  const entries = shiftChunkOffsets(moovCopy, delta);

  const out = Buffer.concat([
    ...ftyp.map((b) => buf.subarray(b.start, b.start + b.size)),
    moovCopy,
    ...others.map((b) => buf.subarray(b.start, b.start + b.size)),
  ]);

  // Verificación: el moov del resultado debe quedar antes que el mdat.
  const check = topLevelBoxes(out);
  const cMoov = check.find((b) => b.type === 'moov');
  const cMdat = check.find((b) => b.type === 'mdat');
  if (!cMoov || !cMdat || cMoov.start > cMdat.start) {
    return { file, status: 'ERROR: la verificación falló, no se escribió' };
  }

  fs.writeFileSync(file, out);
  return {
    file,
    status: `movido · ${entries} offsets ajustados · ${(out.length / 1048576).toFixed(2)} MB`,
  };
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Uso: node scripts/faststart.mjs archivo.mp4 [...]');
  process.exit(1);
}
for (const f of files) {
  const r = faststart(f);
  console.log(r.file.split(/[\\/]/).pop().padEnd(16), r.status);
}
