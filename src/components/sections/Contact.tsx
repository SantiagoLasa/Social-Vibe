'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/copy';
import { brand } from '@/content/brand';
import { Container } from '../layout/Container';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';
import { InstagramIcon } from '../ui/icons';

const EASE = [0.22, 1, 0.36, 1] as const;

// La carpeta se abre: la solapa gira sobre su borde inferior y deja ver los
// datos de contacto. Es la última página del brand kit hecha interacción.
export function Contact({ copy }: { copy: Copy }) {
  const reduce = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.contact}
      className="candy-stripe scroll-mt-24 py-24 md:py-36"
    >
      <Container className="flex flex-col items-center">
        <div className="relative w-full max-w-[720px]">
          {/* Solapa de la carpeta */}
          <motion.div
            aria-hidden
            className="mx-auto h-10 w-40 origin-bottom rounded-t-[14px] bg-columbia"
            initial={reduce ? undefined : { rotateX: 0 }}
            whileInView={reduce ? undefined : { rotateX: -58 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ transformPerspective: 800 }}
          />

          <motion.div
            className="patch bg-columbia p-8 shadow-card md:p-12"
            initial={reduce ? undefined : { opacity: 0, y: 26 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          >
            <Label>{copy.contact.label}</Label>
            <h2 className="mt-5 max-w-[14ch] font-display text-display-l text-bistre">
              {copy.contact.headline}
            </h2>
            <p className="mt-5 max-w-[44ch] text-body-l text-bistre/85">
              {copy.contact.body}
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-utility uppercase text-bistre/60">
                  {copy.contact.emailLabel}
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="text-body text-bistre underline decoration-flame decoration-1 underline-offset-4 transition-colors duration-200 hover:text-flame"
                  >
                    {brand.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-utility uppercase text-bistre/60">
                  {copy.contact.instagramLabel}
                </dt>
                <dd className="mt-2">
                  {/* TODO: CONTENIDO CLIENTE — URL real de Instagram */}
                  <span className="inline-flex items-center gap-2 text-body text-bistre">
                    <InstagramIcon width={17} height={17} className="text-flame" />
                    {brand.contact.instagram}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-utility uppercase text-bistre/60">
                  {copy.contact.locationLabel}
                </dt>
                <dd className="mt-2 text-body text-bistre">{brand.location}</dd>
              </div>
            </dl>
          </motion.div>
        </div>

        <Reveal delay={0.2} className="mt-10">
          <a
            href={`mailto:${brand.contact.email}`}
            className="patch inline-flex bg-flame px-8 py-3.5 text-label uppercase text-paper transition-colors duration-200 hover:bg-bistre"
          >
            {copy.nav.cta}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
