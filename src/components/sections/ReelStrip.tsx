'use client';

import { REELS_BASE, reels } from '@/content/videos';
import type { Copy } from '@/content/copy';
import { Container } from '../layout/Container';
import { LoopingReel } from '../media/LoopingReel';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

// Tira horizontal de reels, con scroll-snap. Se lee como el feed: clips
// verticales en bucle, uno al lado del otro.
//
// Si no hay videos cargados no se renderiza nada: mejor una sección
// ausente que una vacía pidiendo disculpas.
export function ReelStrip({ copy }: { copy: Copy }) {
  if (reels.length === 0) return null;

  return (
    <div className="bg-paper py-20 md:py-28">
      <Container>
        <Reveal>
          <Label>{copy.work.reelsLabel}</Label>
        </Reveal>
      </Container>

      <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden">
        {reels.map((reel, i) => (
          <Reveal
            key={reel.id}
            delay={Math.min(i, 4) * 0.07}
            className="shrink-0 snap-start"
          >
            <div className="patch aspect-[9/16] w-[62vw] max-w-[260px] overflow-hidden sm:w-[260px]">
              <LoopingReel src={`${REELS_BASE}/${reel.file}`} alt={reel.alt} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
