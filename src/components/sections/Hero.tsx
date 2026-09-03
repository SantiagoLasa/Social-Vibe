'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Copy } from '@/content/copy';
import { Container } from '../layout/Container';
import { Logo } from '../layout/Logo';
import { ArrowDownIcon } from '../ui/icons';

const EASE = [0.22, 1, 0.36, 1] as const;

// El patch se "pega" sobre las rayas: baja, se asienta y queda con su
// inclinación de −1.6°. Es la marca aplicándose como etiqueta de packaging.
export function Hero({ copy }: { copy: Copy }) {
  const reduce = useReducedMotion();

  const press = reduce
    ? {}
    : {
        initial: { opacity: 0, y: -28, scale: 1.06, rotate: 2.4 },
        animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
        transition: { duration: 0.75, ease: EASE, delay: 0.1 },
      };

  const rise = (order: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay: 0.45 + order * 0.12 },
        };

  return (
    <section id="top" className="candy-stripe relative flex min-h-svh items-center pt-20">
      <Container className="flex flex-col items-center py-16 text-center">
        {/* El patch envuelve el wordmark: sobre rayas necesita su panel */}
        <motion.div {...press}>
          <Logo className="scale-90 sm:scale-110 md:scale-125" />
        </motion.div>

        <motion.h1
          {...rise(0)}
          /* display-l y no xl: el titular de Jeniffer son cuatro frases, y a
             tamaño xl ocuparía la pantalla entera. El patch es el héroe acá. */
          className="mt-14 max-w-[20ch] font-display text-display-xl text-bistre"
        >
          {copy.hero.headline}
        </motion.h1>

        <motion.p
          {...rise(1)}
          className="mt-7 max-w-[46ch] bg-paper/70 px-4 py-2 text-body-l text-ink backdrop-blur-[2px]"
        >
          {copy.hero.sub}
        </motion.p>

        <motion.a
          {...rise(2)}
          href="#who-we-are"
          className="mt-12 inline-flex flex-col items-center gap-2 text-utility uppercase text-bistre/70 transition-colors duration-200 hover:text-flame"
        >
          {copy.hero.scrollHint}
          <ArrowDownIcon width={18} height={18} />
        </motion.a>
      </Container>
    </section>
  );
}
