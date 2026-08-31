'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { gallery } from '@/content/gallery';
import { Container } from '../layout/Container';
import { Picture } from '../media/Picture';

// Las fotos bajan como platos por el pase de la cocina: las columnas se
// mueven a distinta velocidad con el scroll. El desfase da profundidad sin
// animar nada en loop.

/**
 * Cantidad de columnas según ancho. Arranca en 2 (móvil primero) para que
 * el HTML estático coincida con lo que ve la mayoría, y sube a 3 tras
 * montar: así ninguna foto queda escondida en ningún tamaño.
 */
function useColumnCount() {
  const [count, setCount] = useState(2);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setCount(mq.matches ? 3 : 2);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return count;
}

/** Reparte en columnas manteniendo el orden de lectura. */
function toColumns<T>(items: T[], n: number): T[][] {
  const cols: T[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push(item));
  return cols;
}

export function Gallery() {
  const reduce = useReducedMotion();
  const columnCount = useColumnCount();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // La columna del medio va a contramano: es lo que hace que se note.
  const down = useTransform(scrollYProgress, [0, 1], ['0%', '-9%']);
  const up = useTransform(scrollYProgress, [0, 1], ['0%', '7%']);

  const columns = toColumns(gallery, columnCount);

  return (
    <div ref={ref} className="bg-paper py-20 md:py-28">
      <Container>
        {/* Sin encabezado: la bajada ya la dijo la bandeja, justo arriba. */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {columns.map((col, ci) => (
            <motion.div
              key={ci}
              className="space-y-4 md:space-y-6"
              style={reduce ? undefined : { y: ci % 2 === 1 ? up : down }}
            >
              {col.map((shot) => (
                <figure key={shot.image} className="patch overflow-hidden bg-linen">
                  <Picture
                    src={shot.image}
                    alt={shot.alt}
                    sizes="(min-width: 768px) 30vw, 45vw"
                    imgClassName="aspect-[2/3] w-full object-cover"
                  />
                </figure>
              ))}
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
