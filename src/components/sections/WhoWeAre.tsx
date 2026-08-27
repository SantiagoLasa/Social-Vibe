import type { Copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/copy';
import { Container } from '../layout/Container';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

export function WhoWeAre({ copy }: { copy: Copy }) {
  return (
    <section id={SECTION_IDS.who} className="scroll-mt-24 bg-paper py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Label>{copy.whoWeAre.label}</Label>
            <h2 className="mt-6 max-w-[14ch] font-display text-display-l text-bistre">
              {copy.whoWeAre.headline}
            </h2>
          </Reveal>
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
