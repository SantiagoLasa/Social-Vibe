'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

// Reel en bucle y en silencio, como se ve en el feed.
//
// Dos cosas hacen que esto no arruine la página:
//
// 1. NO SE DESCARGA HASTA QUE HACE FALTA. El `src` se asigna recién cuando
//    el clip está por entrar en pantalla. Con cinco videos, cargarlos todos
//    de entrada serían 13 MB antes de ver nada; así se baja solo lo que se
//    mira, y en celular eso es la diferencia entre usable e inusable.
// 2. SE PAUSA AL SALIR DE PANTALLA. Un video reproduciéndose fuera de vista
//    gasta batería y CPU sin que nadie lo vea.
//
// `muted` y `playsInline` no son opcionales: sin ellos iOS y Chrome
// bloquean la reproducción automática y el clip queda congelado.

export function LoopingReel({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  // useReducedMotion devuelve null antes de montar; se normaliza a booleano.
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // play() puede rechazar si el navegador aún no permite autoplay;
          // no es un error que valga la pena propagar.
          if (!reduce) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      // Empieza a cargar un poco antes de que entre: llega reproduciendo.
      { rootMargin: '200px 0px', threshold: 0.1 },
    );

    io.observe(el);

    // Red de seguridad: si el observador no llegó a marcar nada —navegador
    // viejo, API bloqueada, entorno raro— se mide la posición a mano y se
    // carga igual. Sin esto, un fallo del observador deja cinco recuadros
    // negros y ningún video, que es peor que cargar de más.
    const rescate = setTimeout(() => {
      const r = el.getBoundingClientRect();
      const enPantalla = r.top < window.innerHeight && r.bottom > 0;
      if (enPantalla && !el.getAttribute('src')) {
        setVisible(true);
        if (!reduce) el.play().catch(() => {});
      }
    }, 1200);

    return () => {
      io.disconnect();
      clearTimeout(rescate);
    };
  }, [reduce]);

  return (
    <video
      ref={ref}
      // El src solo aparece cuando el clip está cerca del viewport.
      src={visible ? src : undefined}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="none"
      // Con prefers-reduced-motion no arranca solo: se ofrecen los controles
      // para que lo mire quien quiera.
      autoPlay={!reduce}
      controls={reduce}
      className={cn('h-full w-full bg-bistre object-cover', className)}
    />
  );
}
