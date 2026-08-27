'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/copy';
import { Container } from '../layout/Container';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

// La comanda de cocina: cada testimonio se desenrolla desde arriba, como el
// ticket que escupe la impresora del pase. Verde Cal Poly porque el brand
// kit reserva ese verde para las quote tiles.
export function Testimonials({ copy }: { copy: Copy }) {
  const reduce = useReducedMotion();
  const { items } = copy.testimonials;

  return (
    <section
      id={SECTION_IDS.testimonials}
      className="scroll-mt-24 bg-green py-24 text-vanilla md:py-36"
    >
      <Container>
        <Reveal>
          <Label className="text-columbia">{copy.testimonials.label}</Label>
          <h2 className="mt-6 max-w-[16ch] font-display text-display-l">
            {copy.testimonials.headline}
          </h2>
        </Reveal>

        {items.length === 0 ? (
          // Estado vacío explícito: nunca una sección en blanco, y nunca
          // testimonios inventados.
          <Reveal delay={0.08}>
            <p className="mt-12 max-w-[46ch] border border-vanilla/25 p-8 text-body-l text-vanilla/70">
              {copy.testimonials.empty}
            </p>
          </Reveal>
        ) : (
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {items.map((t, i) => (
              <motion.li
                key={t.author}
                className="origin-top"
                initial={reduce ? undefined : { opacity: 0, scaleY: 0.4, y: -14 }}
                whileInView={reduce ? undefined : { opacity: 1, scaleY: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              >
                <figure className="ledger-grid h-full p-7 text-bistre">
                  <blockquote className="font-display text-display-m">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-bistre/20 pt-4">
                    <p className="text-body font-medium">{t.author}</p>
                    <p className="mt-1 font-mono text-utility uppercase text-flame">
                      {t.business}
                    </p>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
