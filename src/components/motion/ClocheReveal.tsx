'use client';

import {
  motion,
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
// La clave del ritmo: todo pasa TEMPRANO y después no pasa nada más, sin
// alargar la sección — más de la mitad del recorrido ya es bandeja servida
// y quieta. Al subir, el mismo scroll devuelve las capturas a la bandeja y
// vuelve a taparla: la escena es reversible porque está atada al scroll y
// no a un temporizador.
//
//   0.00–0.06  espera (la bandeja entra cerrada)
//   0.06–0.26  la tapa sube, rota apenas y se desvanece
//   0.18–0.28  el titular se aparta
//   0.20–0.46  las capturas emergen escalonadas y se abren en abanico
//   0.46–1.00  bandeja servida: nada se mueve

const EASE = [0.22, 1, 0.36, 1] as const;

// Superficie de la bandeja dentro del encuadre de la foto: de ahí salen las
// tarjetas. Medido sobre el recorte real (2398×1792).
const TRAY = { x: 50, y: 64 };

/**
 * Posición final de cada tarjeta, en % del contenedor.
 *
 * Las tarjetas se mantienen PEGADAS a la bandeja, no flotando muy arriba.
 * Es lo que evita el efecto de "desaparecieron": al terminar la sección,
 * lo que está más alto sale del viewport primero, así que si el abanico se
 * abre demasiado se ve la bandeja sola un buen rato. Agrupadas, la escena
 * entra y sale como una sola cosa.
 */
const LAYOUT = [
  { x: -22, y: -26, rotate: -7 },
  { x: 1, y: -33, rotate: -1 },
  { x: 24, y: -24, rotate: 7 },
  { x: -13, y: -8, rotate: -4 },
  { x: 16, y: -5, rotate: 5 },
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
  // La última queda puesta al 46% del recorrido. Todo lo que sigue es
  // contemplación: nunca se desvanecen, una vez arriba se quedan.
  const start = 0.20 + index * 0.04;
  const end = Math.min(start + 0.1, 1);

  // La tarjeta ya nace en su lugar final (left/top); lo que se anima es el
  // salto desde la bandeja: sube, crece, gira y aparece.
  const y = useTransform(progress, [start, end], ['46%', '0%']);
  const rotate = useTransform(progress, [start, end], [0, spot.rotate]);
  const scale = useTransform(progress, [start, end], [0.72, 1]);
  // Entrada casi instantánea: media opacidad prolongada era justo lo que
  // hacía ilegibles las capturas claras sobre las rayas.
  const opacity = useTransform(progress, [start, start + 0.025], [0, 1]);

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
  const lidY = useTransform(progress, [0.06, 0.26], ['0%', '-78%']);
  const lidRotate = useTransform(progress, [0.06, 0.26], [0, -7]);
  const lidOpacity = useTransform(progress, [0.18, 0.28], [1, 0]);

  // La bandeja deriva apenas, y solo mientras dura la acción: en el tramo
  // de contemplación queda completamente quieta.
  const trayY = useTransform(progress, [0, 0.46], ['3%', '-3%']);

  return (
    <div className="relative mx-auto flex w-full justify-center px-6">
      {/* Las dos capas comparten lienzo y proporción: apiladas reconstruyen
          la toma original, así la tapa calza exacta sobre la bandeja.
          La escena se limita por ALTURA: ocupando poco más de la mitad del
          viewport, el conjunto bandeja + capturas sigue entero en pantalla
          mientras la sección siguiente ya asoma abajo.
          El tope va como ancho máximo derivado de esa altura (×1.338, la
          proporción de la toma) en vez de fijar `h-[54svh]`: así en
          pantallas angostas manda el ancho y la caja nunca se deforma a
          vertical, que descolocaba las tarjetas respecto de la bandeja. */}
      <div className="relative aspect-[2398/1792] w-full max-w-[min(700px,calc(54svh*1.338))]">
        <motion.div
          style={still ? undefined : { y: trayY }}
          className="absolute inset-0"
        >
          <Picture
            src="scene/tray-arm"
            alt=""
            priority
            sizes="(min-width: 1024px) 700px, 100vw"
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
              sizes="(min-width: 1024px) 700px, 100vw"
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
        {/* Sin sticky ni scrubbing: la bandeja ya servida y las capturas en
            grilla, que es la misma información sin secuestrar el scroll. */}
        <div className="mx-auto max-w-[620px] px-6">
          <Picture
            src="scene/tray-arm"
            alt=""
            sizes="(min-width: 1024px) 620px, 100vw"
            imgClassName="w-full"
          />
        </div>
        <div className="mx-auto mt-10 columns-1 gap-5 px-6 sm:columns-2 lg:columns-3 [&>*]:mb-5 max-w-site">
          {results.map((item) => (
            <figure
              key={item.id}
              className="patch break-inside-avoid overflow-hidden border border-bistre/15 bg-paper p-2 shadow-card"
            >
              <Picture
                src={item.image}
                alt={item.alt}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                imgClassName="w-full"
              />
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="candy-stripe">
      <ScrollStage length={2.4}>
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
  // El titular entra primero y se aparta cuando la escena toma el control.
  // Se va del todo, no al 25%: si queda tenue detrás, ensucia la lectura de
  // las capturas justo cuando son el foco.
  const opacity = useTransform(progress, [0, 0.04, 0.18, 0.28], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.28], ['0%', '-22%']);

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
