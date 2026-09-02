'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/copy';
import { Container } from '../layout/Container';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

// El patch se pega sobre la página: el bloque del titular entra torcido
// (−6°, apenas elevado y un punto más grande) y se asienta en el −1.6° que
// el brand kit fija para el patch. Como apoyar una calcomanía.
//
// Sin sombras ni gradientes en el patch: el kit los prohíbe (p.6).
export function WhoWeAre({ copy }: { copy: Copy }) {
  const reduce = useReducedMotion();

  return (
    <section id={SECTION_IDS.who} className="scroll-mt-24 bg-paper py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            className="patch self-start bg-vanilla px-8 py-9"
            initial={reduce ? undefined : { opacity: 0, rotate: -6, y: -18, scale: 1.03 }}
            whileInView={
              reduce ? undefined : { opacity: 1, rotate: -1.6, y: 0, scale: 1 }
            }
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Label>{copy.whoWeAre.label}</Label>
            <h2 className="mt-6 max-w-[20ch] font-display text-display-l text-bistre">
              {copy.whoWeAre.headline}
            </h2>
          </motion.div>
          <div className="space-y-6">
            {copy.whoWeAre.body.map((para, i) => (
              <Reveal key={para.slice(0, 20)} delay={0.08 * (i + 1)}>
                <p className="max-w-[52ch] text-body-l">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
