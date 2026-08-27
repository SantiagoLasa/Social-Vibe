'use client';

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { results } from '@/content/results';
import { ScrollStage } from './ScrollStage';
import { ClocheLid, TrayAndArm } from './ClocheArt';

// Escena signature: al bajar, el mesero levanta la tapa y aparecen los
// resultados. Todo el movimiento está atado al scroll (no a un timer), así
// el usuario controla la velocidad y puede volver atrás.
//
// Coreografía sobre el progreso 0→1 de la sección:
//   0.00–0.12  espera (la bandeja entra cerrada)
//   0.12–0.48  la tapa sube, rota apenas y se desvanece
//   0.40–0.85  las tarjetas emergen escalonadas y se abren en abanico
//   0.85–1.00  descanso antes de soltar el sticky

const EASE = [0.22, 1, 0.36, 1] as const;

/** Posición final de cada tarjeta, en % relativo al centro de la bandeja. */
const LAYOUT = [
  { x: -34, y: -46, rotate: -7 },
  { x: 0, y: -62, rotate: 0 },
  { x: 34, y: -44, rotate: 7 },
  { x: -18, y: -18, rotate: -3 },
  { x: 20, y: -16, rotate: 4 },
];

function ResultCard({
  progress,
  index,
  item,
  still,
}: {
  progress: MotionValue<number>;
  index: number;
  item: (typeof results.items)[number];
  still: boolean;
}) {
  const spot = LAYOUT[index % LAYOUT.length];
  const start = 0.4 + index * 0.07;
  const end = Math.min(start + 0.3, 1);

  const y = useTransform(progress, [start, end], ['8%', `${spot.y}%`]);
  const x = useTransform(progress, [start, end], ['0%', `${spot.x}%`]);
  const rotate = useTransform(progress, [start, end], [0, spot.rotate]);
  const scale = useTransform(progress, [start, end], [0.72, 1]);
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);

  const style = still
    ? {
        x: `${spot.x}%`,
        y: `${spot.y}%`,
        rotate: spot.rotate,
        opacity: 1,
      }
    : { x, y, rotate, scale, opacity };

  return (
    <motion.figure
      style={style}
      className="absolute left-1/2 top-1/2 w-[26%] max-w-[190px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="patch overflow-hidden bg-paper shadow-card">
        {/* Placeholder del screenshot — se reemplaza por la captura real */}
        <div className="ledger-grid aspect-[4/5] w-full" />
        <figcaption className="flex items-baseline justify-between gap-2 px-3 py-2">
          <span className="text-utility uppercase text-bistre">{item.metric}</span>
          <span className="text-utility uppercase text-flame">{item.unit}</span>
        </figcaption>
      </div>
    </motion.figure>
  );
}

function Scene({
  progress,
  still,
}: {
  progress: MotionValue<number>;
  still: boolean;
}) {
  // La tapa: sube, rota apenas y se va. Sin glows ni sombras (brand kit p.6).
  const lidY = useTransform(progress, [0.12, 0.48], ['0%', '-78%']);
  const lidRotate = useTransform(progress, [0.12, 0.48], [0, -7]);
  const lidOpacity = useTransform(progress, [0.34, 0.5], [1, 0]);

  // La bandeja deriva apenas hacia arriba: da profundidad sin robar atención.
  const trayY = useTransform(progress, [0, 1], ['4%', '-4%']);

  return (
    <div className="relative mx-auto w-full max-w-[980px] px-6">
      <div className="relative aspect-[800/620] w-full">
        <motion.div
          style={still ? undefined : { y: trayY }}
          className="absolute inset-0"
        >
          <TrayAndArm />
        </motion.div>

        {/* Las tarjetas viven entre la bandeja y la tapa: quedan tapadas
            hasta que la tapa se va. */}
        <div className="absolute inset-0">
          {results.items.map((item, i) => (
            <ResultCard
              key={item.id}
              progress={progress}
              index={i}
              item={item}
              still={still}
            />
          ))}
        </div>

        {!still && (
          <motion.div
            style={{ y: lidY, rotate: lidRotate, opacity: lidOpacity }}
            className="absolute inset-0 origin-bottom"
          >
            <ClocheLid />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function ClocheReveal() {
  const reduce = useReducedMotion();

  // Con prefers-reduced-motion no hay escena: se muestra el estado final,
  // sin sticky y sin scrubbing.
  if (reduce) {
    return (
      <section className="candy-stripe py-24">
        <header className="mx-auto mb-10 max-w-site px-6 text-center">
          <p className="text-label uppercase text-flame">{results.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-l text-bistre">
            {results.headline}
          </h2>
        </header>
        <div className="mx-auto grid max-w-site grid-cols-2 gap-6 px-6 md:grid-cols-3">
          {results.items.map((item) => (
            <figure key={item.id} className="patch overflow-hidden bg-paper shadow-card">
              <div className="ledger-grid aspect-[4/5] w-full" />
              <figcaption className="flex items-baseline justify-between px-3 py-2">
                <span className="text-utility uppercase text-bistre">{item.metric}</span>
                <span className="text-utility uppercase text-flame">{item.unit}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="candy-stripe">
      <ScrollStage length={2.6}>
        {(progress) => (
          <div className="w-full">
            <Headline progress={progress} />
            <Scene progress={progress} still={false} />
          </div>
        )}
      </ScrollStage>
    </div>
  );
}

function Headline({ progress }: { progress: MotionValue<number> }) {
  // El titular entra primero y se aparta cuando la escena toma el control.
  const opacity = useTransform(progress, [0, 0.08, 0.5, 0.62], [0, 1, 1, 0.25]);
  const y = useTransform(progress, [0, 0.5], ['0%', '-18%']);

  return (
    <motion.header
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-[12%] z-10 text-center"
      // El texto existe en el DOM desde el arranque: el buscador y los
      // lectores de pantalla no dependen del scroll.
      transition={{ ease: EASE }}
    >
      <p className="text-label uppercase text-flame">{results.eyebrow}</p>
      <h2 className="mx-auto mt-4 max-w-[14ch] font-display text-display-l text-bistre">
        {results.headline}
      </h2>
    </motion.header>
  );
}
