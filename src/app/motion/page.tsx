import type { Metadata } from 'next';
import { ClocheReveal } from '@/components/motion/ClocheReveal';
import { Logo } from '@/components/layout/Logo';

// Demo interna del sistema de animación — para revisión con la clienta.
// noindex: no es una página del sitio.

export const metadata: Metadata = {
  title: 'Motion — demo',
  robots: { index: false, follow: false },
};

export default function MotionDemo() {
  return (
    <main>
      <header className="flex min-h-[70svh] flex-col items-center justify-center gap-8 bg-paper px-6 text-center">
        <Logo />
        <div>
          <p className="text-label uppercase text-flame">Motion demo</p>
          <h1 className="mx-auto mt-4 max-w-[18ch] font-display text-display-l text-bistre">
            The tray opens as you scroll
          </h1>
          <p className="mx-auto mt-6 max-w-[46ch] text-body-l">
            Bajá despacio. La tapa está atada al scroll, no a un temporizador:
            podés detenerte, volver atrás y la escena responde.
          </p>
          <p className="mt-8 text-utility uppercase text-bistre/60">
            ↓ Scroll
          </p>
        </div>
      </header>

      <ClocheReveal />

      <section className="bg-paper px-6 py-24">
        <div className="mx-auto max-w-[62ch] space-y-5">
          <p className="text-label uppercase text-flame">Notas de la demo</p>
          <p className="text-body">
            El mesero, la bandeja y la tapa son <strong>arte placeholder</strong>{' '}
            vectorial: sirven para aprobar el movimiento y los tiempos. Al
            llegar las fotos reales se reemplazan sin tocar la animación.
          </p>
          <p className="text-body">
            Las métricas dicen <strong>00.0K</strong> a propósito — no
            inventamos resultados. Cada tarjeta espera su captura real.
          </p>
          <p className="text-body">
            Con <code className="text-utility">prefers-reduced-motion</code>{' '}
            activado, la escena se sirve abierta y en grilla, sin scroll
            secuestrado.
          </p>
        </div>
      </section>
    </main>
  );
}
