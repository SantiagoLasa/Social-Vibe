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

// La cuenta que llega al final. La bandeja sirvió el trabajo; acá está el
// ticket, que es como se cierra una mesa.
//
// Por eso hay dos materiales y no uno: el argumento va en Bodoni sobre el
// verde, y los datos van en Courier sobre papel. Un ticket no tiene
// tipografía display, y meter las dos cosas en la misma tarjeta era lo que
// hacía que la sección se leyera neutra.
//
// Sobre verde: el color que el kit reserva para el sello, y la única
// superficie profunda del recorrido fuera del footer.
//
// El parallax mueve el texto y el ticket a distinta velocidad: el ticket va
// más rápido, así queda "más cerca" del que mira.
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2">
      <dt className="shrink-0 uppercase tracking-wide text-bistre/75">{label}</dt>
      <dd className="min-w-0 text-right">{children}</dd>
    </div>
  );
}

const linkClass =
  'underline decoration-flame decoration-1 underline-offset-4 transition-colors duration-200 hover:text-flame';

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
  const textY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const ticketY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section
      ref={ref}
      id={SECTION_IDS.contact}
      className="scroll-mt-24 bg-green py-24 md:py-36"
    >
      <Container className="flex flex-col items-center">
        {/* El argumento, sobre el verde. En claro: bistre sobre verde no se
            lee — antes vivía sobre la tarjeta celeste. */}
        <motion.div
          className="max-w-[46ch] text-center"
          style={reduce ? undefined : { y: textY }}
        >
          <Reveal>
            <Label className="text-columbia">{copy.contact.label}</Label>
            <h2 className="mt-5 font-display text-display-l text-vanilla">
              {copy.contact.headline}
            </h2>
            <p className="mt-5 text-body-l text-vanilla/80">{copy.contact.body}</p>
          </Reveal>
        </motion.div>

        {/* La cuenta. La ranura recorta el ticket mientras se imprime. */}
        <motion.div
          className="mt-14 w-full max-w-[430px]"
          style={reduce ? undefined : { y: ticketY }}
        >
          <div className="overflow-hidden">
            <motion.div
              className="receipt bg-paper px-6 py-8 font-mono text-[11.5px] leading-relaxed text-bistre sm:px-8 sm:text-[12.5px]"
              initial={reduce ? undefined : { y: '-101%' }}
              whileInView={reduce ? undefined : { y: '0%' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-center text-utility uppercase tracking-[0.2em] text-bistre">
                {brand.name}
              </p>
              <p className="mt-1 text-center text-utility uppercase tracking-[0.2em] text-bistre/75">
                {brand.descriptor}
              </p>

              <dl className="mt-7 border-t border-dashed border-bistre/25 pt-1">
                <Row label={copy.contact.whatsappLabel}>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <WhatsAppIcon
                      width={13}
                      height={13}
                      className="mr-1.5 inline-block align-[-1px] text-flame"
                    />
                    {brand.contact.whatsapp}
                  </a>
                </Row>
                <Row label={copy.contact.emailLabel}>
                  {/* break-words: la dirección es larga y en pantallas
                      angostas tiene que poder cortarse antes que desbordar. */}
                  <a href={`mailto:${brand.contact.email}`} className={`${linkClass} break-words`}>
                    {brand.contact.email}
                  </a>
                </Row>
                <Row label={copy.contact.instagramLabel}>
                  <a
                    href={brand.social.instagram ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <InstagramIcon
                      width={13}
                      height={13}
                      className="mr-1.5 inline-block align-[-1px] text-flame"
                    />
                    {brand.contact.instagram}
                  </a>
                </Row>
                <Row label={copy.contact.locationLabel}>{brand.location}</Row>
              </dl>

              {/* El renglón del total. Sin cifras ni moneda: el cliente
                  decidió que el sitio no muestra precios.
                  En bistre y no en flame: flame sobre papel da 3.13:1 y este
                  texto es chico — no llega al 4.5:1 que pide AA. */}
              <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-bistre/25 py-3">
                <span className="uppercase tracking-wide text-bistre">
                  {copy.contact.totalLabel}
                </span>
                <span className="uppercase tracking-wide text-bistre">
                  {copy.contact.totalValue}
                </span>
              </div>

              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2.5 bg-flame px-6 py-3.5 text-label uppercase text-paper transition-colors duration-200 hover:bg-bistre"
              >
                <WhatsAppIcon width={17} height={17} />
                {copy.contact.ctaLabel}
              </a>

              <p className="mt-7 text-center text-utility uppercase tracking-[0.18em] text-bistre/75">
                {copy.contact.thanks}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
