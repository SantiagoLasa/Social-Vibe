'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { Copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/copy';
import { brand } from '@/content/brand';
import { Container } from '../layout/Container';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';
import { whatsappUrl } from '@/lib/whatsapp';
import { InstagramIcon, WhatsAppIcon } from '../ui/icons';

const EASE = [0.22, 1, 0.36, 1] as const;

// La carpeta se abre: la solapa gira sobre su borde inferior y deja ver los
// datos de contacto. Es la última página del brand kit hecha interacción.
//
// Sobre verde: es el color que el kit reserva para el sello, y cierra el
// recorrido con la única superficie profunda de la página. La carpeta celeste
// contrasta mucho mejor acá que sobre las rayas.
//
// El parallax mueve la carpeta y el CTA a distinta velocidad contra ese
// fondo. La solapa NO se mueve por separado de la carpeta: está pegada a
// ella, y despegarlas rompería el objeto en vez de darle profundidad.
export function Contact({ copy }: { copy: Copy }) {
  const reduce = useReducedMotion();
  const wa = whatsappUrl(copy.contact.whatsappMessage);

  const ref = useRef<HTMLElement>(null);
  // 'start end' → 'end start': el progreso corre mientras la sección entera
  // cruza el viewport, de entrar por abajo a salir por arriba.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const folderY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [72, -72]);

  return (
    <section
      ref={ref}
      id={SECTION_IDS.contact}
      className="scroll-mt-24 bg-green py-24 md:py-36"
    >
      <Container className="flex flex-col items-center">
        <motion.div
          className="relative w-full max-w-[720px]"
          style={reduce ? undefined : { y: folderY }}
        >
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

            <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="font-mono text-utility uppercase text-bistre/60">
                  {copy.contact.whatsappLabel}
                </dt>
                <dd className="mt-2">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-body text-bistre underline decoration-flame decoration-1 underline-offset-4 transition-colors duration-200 hover:text-flame"
                  >
                    <WhatsAppIcon width={17} height={17} className="text-flame" />
                    {brand.contact.whatsapp}
                  </a>
                </dd>
              </div>
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
                  <a
                    href={brand.social.instagram ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-body text-bistre underline decoration-flame decoration-1 underline-offset-4 transition-colors duration-200 hover:text-flame"
                  >
                    <InstagramIcon width={17} height={17} className="text-flame" />
                    {brand.contact.instagram}
                  </a>
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
        </motion.div>

        <motion.div style={reduce ? undefined : { y: ctaY }}>
          <Reveal delay={0.2} className="mt-10">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="patch inline-flex items-center gap-3 bg-flame px-8 py-3.5 text-label uppercase text-paper transition-colors duration-200 hover:bg-bistre"
            >
              <WhatsAppIcon width={19} height={19} />
              {copy.contact.ctaLabel}
            </a>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}
