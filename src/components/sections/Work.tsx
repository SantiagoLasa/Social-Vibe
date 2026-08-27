import type { Copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/copy';
import { clients } from '@/content/clients';
import { Container } from '../layout/Container';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';
import { ClocheReveal } from '../motion/ClocheReveal';

// La sección de trabajo es la bandeja: el trabajo se sirve. Debajo, la
// marquesina de cocinas con las que trabajaron.
export function Work({ copy }: { copy: Copy }) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {clients.map((client) => (
        <span
          key={client.name}
          className="whitespace-nowrap font-display text-display-m text-bistre/35 transition-colors duration-300 hover:text-bistre"
        >
          {client.name}
        </span>
      ))}
    </div>
  );

  return (
    <section id={SECTION_IDS.work} className="scroll-mt-24">
      <ClocheReveal copy={copy} />

      <div className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal>
            <Label className="text-center">{copy.work.clientsLabel}</Label>
          </Reveal>
        </Container>
        <div className="marquee mt-8 overflow-hidden">
          <div className="marquee-track flex w-max">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
