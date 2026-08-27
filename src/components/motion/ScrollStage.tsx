'use client';

import { useRef } from 'react';
import { useScroll, type MotionValue } from 'motion/react';
import { cn } from '@/lib/cn';

/**
 * Contenedor de "scrollytelling": reserva alto extra de scroll y fija el
 * contenido mientras dura la escena, exponiendo el progreso 0→1.
 *
 * Es la base reutilizable de todas las escenas del sitio (la bandeja en
 * resultados, la carpeta en contacto, etc.): el gesto cambia, la mecánica no.
 */
export function ScrollStage({
  children,
  /** Alto del track en viewports. Más alto = animación más lenta y suave. */
  length = 2.5,
  className,
}: {
  children: (progress: MotionValue<number>) => React.ReactNode;
  length?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // 'start start' → 'end end': el progreso corre mientras la sección
  // atraviesa el viewport pegada arriba.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={ref} style={{ height: `${length * 100}svh` }} className={cn('relative', className)}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
