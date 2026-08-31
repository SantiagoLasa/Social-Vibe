'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/copy';
import type { Locale } from '@/content/brand';
import { servicesFor } from '@/content/copy';
import { Container } from '../layout/Container';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

// La carta se despliega: cada servicio entra rotando sobre su borde
// superior, como los paneles de un menú plegado que se abre.
export function Services({ copy, locale }: { copy: Copy; locale: Locale }) {
  const reduce = useReducedMotion();
  const items = servicesFor(locale);

  return (
    <section
      id={SECTION_IDS.services}
      className="ledger-grid scroll-mt-24 py-24 md:py-36"
    >
      <Container>
        <Reveal>
          <Label>{copy.services.label}</Label>
          <h2 className="mt-6 max-w-[16ch] font-display text-display-l text-bistre">
            {copy.services.headline}
          </h2>
          <p className="mt-5 max-w-[46ch] text-body-l">{copy.services.intro}</p>
        </Reveal>

        {/* Ocho servicios: dos columnas en tablet, cuatro en pantallas
            anchas para que no se haga una lista interminable. */}
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((service, i) => (
            <motion.li
              key={service.id}
              className="origin-top"
              initial={reduce ? undefined : { opacity: 0, rotateX: -72, y: -10 }}
              whileInView={reduce ? undefined : { opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.09 }}
              style={{ transformPerspective: 900 }}
            >
              <article className="patch h-full bg-paper p-7 shadow-card">
                <p className="font-mono text-utility uppercase text-flame">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-display-m text-bistre">
                  {service.title}
                </h3>
                {service.blurb && (
                  <p className="mt-4 text-body text-ink">{service.blurb}</p>
                )}
              </article>
            </motion.li>
          ))}
        </ul>

        {/* Cierre sin precios: el objetivo es que escriban, no que comparen. */}
        <Reveal delay={0.12}>
          <p className="mt-12 max-w-[52ch] text-body-l text-ink">
            {copy.services.closing}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
