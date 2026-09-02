'use client';

import { REELS_BASE, reels } from '@/content/videos';
import type { Copy } from '@/content/copy';
import { Container } from '../layout/Container';
import { LoopingReel } from '../media/LoopingReel';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

// Tira de reels: clips verticales en bucle, como el feed.
//
// Va DENTRO del Container para quedar alineada con el resto de la página.
// Antes se salía con márgenes negativos y, al no tener contenedor que la
// limitara, terminaba más ancha que la pantalla y corrida a la izquierda.
//
// En pantallas anchas los cinco entran en una fila (grilla); en angostas
// se deslizan de a uno con scroll-snap, que es como se miran los reels.
export function ReelStrip({ copy }: { copy: Copy }) {
  if (reels.length === 0) return null;

  return (
    <div className="bg-paper pb-14 pt-12 md:pb-16 md:pt-14">
      <Container>
        <Reveal>
          <Label>{copy.work.reelsLabel}</Label>
        </Reveal>

        <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {reels.map((reel, i) => (
            <Reveal
              key={reel.id}
              delay={Math.min(i, 4) * 0.07}
              className="shrink-0 snap-start lg:shrink"
            >
              <div className="patch aspect-[9/16] w-[56vw] max-w-[240px] overflow-hidden sm:w-[240px] lg:w-full lg:max-w-none">
                <LoopingReel src={`${REELS_BASE}/${reel.file}`} alt={reel.alt} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
