import { extraResults, results } from '@/content/results';
import type { Copy } from '@/content/copy';
import { Container } from '../layout/Container';
import { Picture } from '../media/Picture';
import { Reveal } from '../ui/Reveal';

// La bandeja es el momento; esto es la prueba que se queda.
//
// Las capturas de la escena viven dentro del sticky y se van con él al
// terminar la sección. Acá quedan fijas y completas — las cinco del
// abanico más las tres restantes — para que se puedan mirar con calma
// mientras se sigue bajando.
//
// Layout en columnas CSS y no grilla: los screenshots tienen alturas muy
// distintas (de tiras anchas a paneles casi cuadrados) y las columnas los
// acomodan sin recortarlos ni dejar huecos.
const board = [...results, ...extraResults];

export function ResultsBoard({ copy }: { copy: Copy }) {
  return (
    <div className="bg-paper py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="mx-auto max-w-[46ch] text-center text-utility uppercase tracking-[0.14em] text-ink/70">
            {copy.work.resultsNote}
          </p>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {board.map((shot, i) => (
            <Reveal key={shot.id} delay={Math.min(i, 4) * 0.06} className="break-inside-avoid">
              <figure className="patch overflow-hidden border border-bistre/15 bg-paper p-2 shadow-card">
                <Picture
                  src={shot.image}
                  alt={shot.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  imgClassName="w-full"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
