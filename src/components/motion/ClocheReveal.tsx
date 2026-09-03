'use client';

import { useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { results } from '@/content/results';
import type { Copy } from '@/content/copy';
import { Picture } from '../media/Picture';
import { Label } from '../ui/Label';
import { ScrollStage } from './ScrollStage';

// Escena signature: al bajar, el mesero levanta la tapa y aparecen los
// resultados. Todo el movimiento está atado al scroll (no a un timer), así
// el usuario controla la velocidad y puede volver atrás.
//
// Coreografía sobre el progreso 0→1 de la sección.
//
// Regla que ordena todo: NADA SE SOLAPA. El título termina de irse antes de
// que las capturas empiecen a asentarse, así en ningún momento se ven dos
// cosas a media opacidad peleando por la atención. Y una vez que el título
// se fue, no vuelve — ni siquiera al subir (ver `tituloIdo`).
//
//   0.00–0.05  espera (la bandeja entra cerrada)
//   0.05–0.30  la tapa sube, rota apenas y se desvanece
//   0.26–0.40  el titular se aparta, definitivamente
//   0.30–0.54  las capturas emergen escalonadas y se abren en abanico
//   0.54–1.00  todo sólido y quieto

const EASE = [0.22, 1, 0.36, 1] as const;

// Superficie de la bandeja dentro del encuadre de la foto: de ahí salen las
// tarjetas. Medido sobre el recorte real (2398×1792).
const TRAY = { x: 50, y: 64 };

/**
 * Posición final de cada tarjeta, en % del contenedor.
 * El abanico se mantiene dentro del ancho de la bandeja: si se abre más,
 * las tarjetas flotan sueltas y pierden la relación con la escena.
 */
const LAYOUT = [
  { x: -21, y: -36, rotate: -7 },
  { x: 2, y: -48, rotate: -1 },
  { x: 24, y: -33, rotate: 7 },
  { x: -13, y: -14, rotate: -4 },
  { x: 17, y: -11, rotate: 5 },
];

function ResultCard({
  progress,
  index,
  item,
  still,
}: {
  progress: MotionValue<number>;
  index: number;
  item: (typeof results)[number];
  still: boolean;
}) {
  const spot = LAYOUT[index % LAYOUT.length];
  // Escalonado corto: las cinco quedan puestas al 54% del recorrido, con
  // todo el resto para mirarlas.
  const start = 0.30 + index * 0.03;
  const end = Math.min(start + 0.12, 1);

  // La tarjeta ya nace en su lugar final (left/top); lo que se anima es el
  // salto desde la bandeja: sube, crece, gira y aparece.
  const y = useTransform(progress, [start, end], ['40%', '0%']);
  const rotate = useTransform(progress, [start, end], [0, spot.rotate]);
  // Arranca casi a tamaño final: el salto de escala grande hacía que se
  // leyeran chicas y borrosas durante buena parte del recorrido.
  const scale = useTransform(progress, [start, end], [0.88, 1]);
  // Opacidad prácticamente instantánea. Una entrada lenta era lo que las
  // dejaba semitransparentes sobre las rayas — que es justo cuando la
  // captura tiene que leerse.
  const opacity = useTransform(progress, [start, start + 0.015], [0, 1]);

  const style = still
    ? { rotate: spot.rotate, opacity: 1 }
    : { y, rotate, scale, opacity };

  return (
    <motion.figure
      style={{
        ...style,
        left: `${TRAY.x + spot.x}%`,
        top: `${TRAY.y + spot.y}%`,
      }}
      className="absolute w-[32%] max-w-[290px] -translate-x-1/2 -translate-y-1/2"
    >
      {/* La captura es la prueba: se muestra tal cual, sin número escrito
          por nosotros encima. El alto lo define cada screenshot.
          El filete y la sombra marcada no son decoración: varias capturas
          son claras sobre fondo claro y sin borde se pierden contra las
          rayas. */}
      <div className="patch overflow-hidden border border-bistre/15 bg-paper p-2 shadow-[0_18px_40px_-12px_rgba(93,55,42,0.45)]">
        <Picture
          src={item.image}
          alt={item.alt}
          sizes="290px"
          imgClassName="w-full"
        />
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
  const lidY = useTransform(progress, [0.05, 0.30], ['0%', '-78%']);
  const lidRotate = useTransform(progress, [0.05, 0.30], [0, -7]);
  const lidOpacity = useTransform(progress, [0.20, 0.32], [1, 0]);

  // La bandeja deriva apenas hacia arriba: da profundidad sin robar atención.
  const trayY = useTransform(progress, [0, 1], ['4%', '-4%']);

  return (
    <div className="relative mx-auto w-full max-w-[980px] px-6">
      {/* Las dos capas comparten lienzo y proporción: apiladas reconstruyen
          la toma original, así la tapa calza exacta sobre la bandeja. */}
      <div className="relative aspect-[2398/1792] w-full">
        <motion.div
          style={still ? undefined : { y: trayY }}
          className="absolute inset-0"
        >
          <Picture
            src="scene/tray-arm"
            alt=""
            priority
            sizes="(min-width: 1024px) 980px, 100vw"
            className="h-full"
            imgClassName="h-full w-full object-contain"
          />
        </motion.div>

        {/* Las tarjetas viven entre la bandeja y la tapa: quedan tapadas
            hasta que la tapa se va. */}
        <div className="absolute inset-0">
          {results.map((item, i) => (
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
            <Picture
              src="scene/cloche-lid"
              alt=""
              priority
              sizes="(min-width: 1024px) 980px, 100vw"
              className="h-full"
              imgClassName="h-full w-full object-contain"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function ClocheReveal({ copy }: { copy: Copy }) {
  const reduce = useReducedMotion();

  // Con prefers-reduced-motion no hay escena: se muestra el estado final,
  // sin sticky y sin scrubbing.
  if (reduce) {
    return (
      <section className="candy-stripe py-24">
        <header className="mx-auto mb-10 max-w-site px-6 text-center">
          <Label>{copy.work.label}</Label>
          <h2 className="mx-auto mt-4 max-w-[18ch] font-display text-display-l text-bistre">
            {copy.work.headline}
          </h2>
          <p className="mt-4 text-body-l text-ink">{copy.work.leadIn}</p>
        </header>
        <div className="mx-auto grid max-w-site grid-cols-1 items-start gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <figure key={item.id} className="patch overflow-hidden bg-paper border border-bistre/15 p-2 shadow-card">
              <Picture
                src={item.image}
                alt={item.alt}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                imgClassName="w-full"
              />
            </figure>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[46ch] px-6 text-center text-utility uppercase text-ink/70">
          {copy.work.resultsNote}
        </p>
      </section>
    );
  }

  return (
    <div className="candy-stripe">
      <ScrollStage length={3.1}>
        {(progress) => (
          <div className="w-full">
            <Headline progress={progress} copy={copy} />
            <Scene progress={progress} still={false} />
          </div>
        )}
      </ScrollStage>
    </div>
  );
}

function Headline({ progress, copy }: { progress: MotionValue<number>; copy: Copy }) {
  // El pestillo existe porque el movimiento está atado al scroll y por lo
  // tanto es reversible: sin él, bastaba subir un poco —o un rebote del
  // scroll— para ver el titular reaparecer a media opacidad encima de las
  // capturas ya sólidas, que es justo lo que arruinaba la lectura.
  //
  // Pero cerrarlo para siempre dejaba la escena decapitada: quien subía a
  // releer se encontraba media pantalla de rayas vacías donde había estado
  // el titular. Así que el pestillo tiene histéresis: se cierra pasado 0.42
  // y solo se vuelve a abrir por debajo de 0.18, donde todavía no hay
  // ninguna captura a la vista (la primera recién empieza en 0.30). Entre
  // esos dos valores no pasa nada, que es lo que evita el parpadeo.
  const [ido, setIdo] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => {
    if (v > 0.42 && !ido) setIdo(true);
    else if (v < 0.18 && ido) setIdo(false);
  });

  // Ya puesto al fijarse la sección, sin rampa de entrada. Se aparta antes
  // de que las capturas empiecen a asentarse: nunca compiten.
  const opacity = useTransform(progress, [0, 0.26, 0.40], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.40], ['0%', '-22%']);

  if (ido) return null;

  return (
    <motion.header
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-[12%] z-10 text-center"
      // El texto existe en el DOM desde el arranque: el buscador y los
      // lectores de pantalla no dependen del scroll.
      transition={{ ease: EASE }}
    >
      <Label>{copy.work.label}</Label>
      <h2 className="mx-auto mt-4 max-w-[18ch] font-display text-display-l text-bistre">
        {copy.work.headline}
      </h2>
      <p className="mx-auto mt-4 text-body-l text-ink">{copy.work.leadIn}</p>
    </motion.header>
  );
}
