import { brand } from '@/content/brand';
import { cn } from '@/lib/cn';

// Los tres lockups del brand kit (p.5). Reglas duras:
//  - El patch se inclina −1.6°, nunca más (clase .patch).
//  - No estirar, condensar ni re-inclinar: las proporciones SON el logo.
//  - No recolorear el patch ni agregar gradientes, glows o sombras.
//  - "Media Agency" no se quita del lockup primario — para eso está el sello.
//  - Bajo 120px de ancho, usar el sello.

type Tone = 'default' | 'reversed';

/**
 * Primario — horizontal. Default en todos lados.
 * `tone="reversed"` = patch vainilla con tipo bistre, para fondos oscuros.
 */
export function Logo({
  tone = 'default',
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const reversed = tone === 'reversed';
  return (
    <span
      className={cn(
        'patch inline-flex flex-col items-center px-6 py-3',
        reversed ? 'bg-vanilla' : 'bg-bistre',
        className,
      )}
    >
      <span
        className={cn(
          'font-display text-2xl leading-none tracking-[-0.02em] md:text-[1.75rem]',
          reversed ? 'text-bistre' : 'text-columbia',
        )}
        style={{ fontWeight: 900 }}
      >
        {brand.name}
      </span>
      <span
        className={cn(
          'mt-1 text-lockup uppercase',
          reversed ? 'text-bistre' : 'text-vanilla',
        )}
      >
        {brand.descriptor}
      </span>
    </span>
  );
}

/**
 * Sello — monograma sobre círculo celeste. El monograma va en bistre:
 * el brand kit lo dibuja en flame, pero naranja sobre celeste da 2.58:1 y
 * no alcanza el mínimo legible.
 * Sello — monograma. Favicons, marcas de agua, cualquier cosa bajo 120px.
 */
export function Seal({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex aspect-square flex-col items-center justify-center rounded-full bg-columbia',
        className,
      )}
      aria-hidden
    >
      <span
        className="font-display text-[1.15em] leading-[0.82] text-bistre"
        style={{ fontWeight: 900 }}
      >
        S
        <br />V
      </span>
      <span className="mt-[0.35em] text-[0.28em] uppercase tracking-[0.2em] text-bistre/80">
        {brand.sealCaption}
      </span>
    </span>
  );
}
