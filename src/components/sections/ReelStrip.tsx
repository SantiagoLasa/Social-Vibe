'use client';

import { reels } from '@/content/videos';
import type { Copy } from '@/content/copy';
import { Container } from '../layout/Container';
import { VideoFacade } from '../media/VideoFacade';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

// Carrusel horizontal de reels 9:16, con scroll-snap.
//
// Si todavía no hay videos cargados no se renderiza nada: es preferible una
// sección ausente a una sección vacía pidiendo disculpas.
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
          <Reveal key={reel.id} delay={Math.min(i, 4) * 0.07} className="shrink-0 snap-start">
            <figure className="w-[62vw] max-w-[280px] sm:w-[280px]">
              <VideoFacade
                youtubeId={reel.youtubeId}
                title={reel.title}
                poster={reel.poster}
                className="aspect-[9/16] w-full"
              />
              <figcaption className="mt-3 font-mono text-utility uppercase text-ink/70">
                {reel.title}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
