import type { Metadata } from 'next';
import { Logo, Seal } from '@/components/layout/Logo';

// Página interna de aprobación del sistema de diseño.
// No es contenido del sitio: las anotaciones en español son para revisión
// interna, por eso viven acá y no en src/content/.

export const metadata: Metadata = {
  title: 'Sistema de diseño',
  robots: { index: false, follow: false },
};

const colors = [
  {
    token: '--bistre',
    name: 'Bistre',
    hex: '#5D372A',
    use: 'El patch, paneles oscuros, titulares',
    share: '40%',
    cls: 'bg-bistre',
  },
  {
    token: '--vanilla',
    name: 'Vanilla',
    hex: '#FFEEBC',
    use: 'Fondo cálido, tipo invertida, franja A',
    share: '25%',
    cls: 'bg-vanilla',
  },
  {
    token: '--columbia',
    name: 'Columbia Blue',
    hex: '#D2E8FF',
    use: 'Franja B, alivio frío, stories',
    share: '20%',
    cls: 'bg-columbia',
  },
  {
    token: '--green',
    name: 'Cal Poly Green',
    hex: '#26422A',
    use: 'El sello, headings, quote tiles',
    share: '10%',
    cls: 'bg-green',
  },
  {
    token: '--flame',
    name: 'Flame',
    hex: '#EA672D',
    use: 'Un acento por layout. Tags, CTAs',
    share: '5%',
    cls: 'bg-flame',
  },
];

const typeSpecs = [
  { name: 'display-xl', spec: 'Bodoni Moda 900 · clamp(2.75rem, 8vw, 6rem) · ls −0.02em' },
  { name: 'display-l', spec: 'Bodoni Moda 900 · clamp(2.25rem, 5.5vw, 4rem) · ls −0.02em' },
  { name: 'display-m', spec: 'Bodoni Moda 700 · clamp(1.75rem, 3.5vw, 2.5rem)' },
  { name: 'body-l', spec: 'Jost 300 · 1.1875rem · lh 1.6' },
  { name: 'body', spec: 'Jost 300 · 1rem · lh 1.65' },
  { name: 'label', spec: 'Jost 500 · versalitas · 0.8125rem · ls 0.2em' },
  { name: 'lockup', spec: 'Jost 300 · versalitas · 0.625rem · ls 0.42em' },
  { name: 'utility', spec: 'Courier Prime 400 · 0.75rem · ls 0.18em' },
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-label uppercase text-flame">{children}</p>;
}

function Spec({ name, spec }: { name: string; spec: string }) {
  return (
    <p className="text-utility uppercase text-ink/70">
      <span className="text-flame">{name}</span>
      <span className="mx-2">·</span>
      {spec}
    </p>
  );
}

export default function Styleguide() {
  return (
    <main>
      {/* ------------------------------------------------ Portada */}
      <header className="candy-stripe">
        <div className="mx-auto flex max-w-site flex-col items-center gap-10 px-6 py-24 md:py-32">
          <Logo className="scale-110 md:scale-125" />
          <p className="text-utility uppercase text-ink">
            Brand kit v1.0 · Miami, FL · Fase 1
          </p>
        </div>
      </header>

      {/* ------------------------------------------------ La versión corta */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-20 md:py-28">
          <Label>The short version</Label>
          <h1 className="mt-6 max-w-[16ch] font-display text-display-xl text-bistre">
            A label you&rsquo;d want on a jar
          </h1>
          <div className="mt-8 grid max-w-[880px] gap-6 text-body-l md:grid-cols-2">
            <p>
              Social Vibe is a social media agency for food, drink, and beauty
              brands. The identity borrows from specialty packaging: a rounded
              brown label patch pressed onto a candy-striped wrapper, heavy
              display caps riding over a whisper of wide-tracked type.
            </p>
            <p>
              It reads credible before it reads cute — which is the point. The
              work is strategy and copy for businesses whose margins are real.
              The brown does the serious part. The stripes do the playful part.
              Nothing else has to try.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Logo */}
      <section className="bg-vanilla">
        <div className="mx-auto max-w-site px-6 py-20 md:py-28">
          <Label>01 — Logo</Label>
          <h2 className="mt-6 font-display text-display-l text-bistre">
            The lockup
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-5">
              <div className="flex min-h-[180px] items-center justify-center bg-paper p-8">
                <Logo />
              </div>
              <div>
                <Label>Primary — horizontal</Label>
                <p className="mt-2 text-utility uppercase text-ink/70">
                  Default everywhere. El patch se inclina −1.6°, nunca más.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex min-h-[180px] items-center justify-center bg-bistre p-8">
                <Logo tone="reversed" />
              </div>
              <div>
                <Label>Reversed</Label>
                <p className="mt-2 text-utility uppercase text-ink/70">
                  Patch vainilla con tipo bistre sobre marrón o verde.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex min-h-[180px] items-center justify-center bg-paper p-8">
                <Seal className="w-28 text-4xl" />
              </div>
              <div>
                <Label>Seal — monogram</Label>
                <p className="mt-2 text-utility uppercase text-ink/70">
                  Favicons, watermarks, cualquier cosa bajo 120px.
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-12 max-w-[640px] space-y-2 border-t border-hairline pt-8 text-body">
            <li>— No estirar, condensar ni re-inclinar: las proporciones son el logo.</li>
            <li>— No recolorear el patch ni agregar gradientes, glows o sombras.</li>
            <li>— &ldquo;Media Agency&rdquo; no se saca del lockup primario — para eso está el sello.</li>
            <li>— Aire equivalente a la altura de la S en los cuatro lados.</li>
            <li>— Nunca sobre imagen ocupada ni sobre rayas sobredimensionadas.</li>
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Color */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-20 md:py-28">
          <Label>02 — Color</Label>
          <h2 className="mt-6 font-display text-display-l text-bistre">
            Five, in that order
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {colors.map((c) => (
              <div key={c.token} className="flex flex-col gap-4">
                <div className={`h-40 ${c.cls}`} />
                <div>
                  <Label>{c.name}</Label>
                  <p className="mt-2 text-utility uppercase">{c.hex}</p>
                  <p className="mt-2 text-body text-ink/80">{c.use}</p>
                  <p className="mt-1 text-utility uppercase text-ink/60">
                    {c.share} de la mezcla
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Barra de mezcla 40/25/20/10/5 */}
          <div className="mt-12">
            <Label>Mix</Label>
            <div className="mt-4 flex h-14 w-full overflow-hidden">
              <div className="w-[40%] bg-bistre" />
              <div className="w-[25%] bg-vanilla" />
              <div className="w-[20%] bg-columbia" />
              <div className="w-[10%] bg-green" />
              <div className="w-[5%] bg-flame" />
            </div>
            <p className="mt-3 text-utility uppercase text-ink/70">
              40% bistre · 25% vanilla · 20% columbia · 10% green · 5% flame
            </p>
            <p className="mt-4 max-w-[720px] text-body text-ink/80">
              Vanilla o papel sobre bistre y green pasan AA en cualquier tamaño.
              Flame es para formas y versalitas cortas — nunca texto de cuerpo
              sobre blanco.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Tipografía */}
      <section className="bg-vanilla">
        <div className="mx-auto max-w-site px-6 py-20 md:py-28">
          <Label>03 — Type</Label>
          <h2 className="mt-6 font-display text-display-l text-bistre">
            Heavy over hairline
          </h2>

          <div className="mt-12 space-y-14">
            <div>
              <Spec {...typeSpecs[0]} />
              <p className="mt-4 font-display text-display-xl text-bistre">
                Sold out by Sunday
              </p>
            </div>
            <div>
              <Spec {...typeSpecs[1]} />
              <p className="mt-4 font-display text-display-l text-bistre">
                Menu drops that move
              </p>
            </div>
            <div>
              <Spec {...typeSpecs[2]} />
              <p className="mt-4 font-display text-display-m text-green">
                Post less. Sell more.
              </p>
            </div>
            <div>
              <Spec {...typeSpecs[3]} />
              <p className="mt-4 max-w-[640px] text-body-l">
                Captions and community management for Miami kitchens.
              </p>
            </div>
            <div>
              <Spec {...typeSpecs[4]} />
              <p className="mt-4 max-w-[640px] text-body">
                We wrote the caption. They sold out the croissants by 10.
              </p>
            </div>
            <div>
              <Spec {...typeSpecs[5]} />
              <p className="mt-4 text-label uppercase text-flame">Now booking</p>
            </div>
            <div>
              <Spec {...typeSpecs[6]} />
              <p className="mt-4 text-lockup uppercase text-bistre">Media Agency</p>
            </div>
            <div>
              <Spec {...typeSpecs[7]} />
              <p className="mt-4 text-utility uppercase">
                Menu drop — Thursday 6PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Patrones */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-20 md:py-28">
          <Label>04 — Pattern</Label>
          <h2 className="mt-6 font-display text-display-l text-bistre">
            Wrapper and ledger
          </h2>
          <p className="mt-4 max-w-[640px] text-body text-ink/80">
            Uno por layout — rayas o grilla, nunca las dos a la vez.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="candy-stripe h-64" />
              <Label>Candy stripe</Label>
              <p className="text-body text-ink/80">
                Columbia y vanilla sobre papel. Fondos, marcos de stories,
                packaging. Barras a ~1/6 del alto del wordmark para que el
                patch siempre gane.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="ledger-grid h-64" />
              <Label>Ledger grid</Label>
              <p className="text-body text-ink/80">
                Hairlines de bistre sobre vanilla. Carruseles, listas de
                precios, cualquier cosa con números.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Voz */}
      <section className="bg-green text-vanilla">
        <div className="mx-auto max-w-site px-6 py-20 md:py-28">
          <p className="text-label uppercase text-columbia">05 — Voice</p>
          <h2 className="mt-6 font-display text-display-l">
            Serious about the work, light about the words
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-label uppercase text-columbia">Sounds like</p>
              <ul className="mt-5 space-y-3 text-body">
                <li>Frases cortas que aterrizan una afirmación.</li>
                <li>Sustantivos concretos: covers, reservations, walk-ins.</li>
                <li>Inglés y español escritos nativamente.</li>
                <li>Cálido, pero los números aparecen.</li>
              </ul>
            </div>
            <div>
              <p className="text-label uppercase text-columbia">Never</p>
              <ul className="mt-5 space-y-3 text-body">
                <li>&ldquo;Unlock your brand&rsquo;s full potential.&rdquo;</li>
                <li>Emojis haciendo el trabajo de un verbo.</li>
                <li>Muros de hashtags.</li>
                <li>Hype sin resultado adosado.</li>
              </ul>
            </div>
            <div>
              <p className="text-label uppercase text-columbia">In practice</p>
              <p className="mt-5 font-display text-display-m">
                We wrote the caption. They sold out the croissants by 10.
              </p>
              <p className="mt-4 font-display text-display-m text-columbia">
                Escribimos el caption. Se acabaron los croissants a las 10.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-10">
          <p className="text-utility uppercase text-ink/60">
            Social Vibe Media Agency · Sistema de diseño · Documento interno
          </p>
        </div>
      </footer>
    </main>
  );
}
