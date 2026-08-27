import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline';

// Flame es el único acento, y va uno por layout (brand kit p.7): el botón
// primario se reserva para el CTA real.
const styles: Record<Variant, string> = {
  primary: 'bg-flame text-paper hover:bg-bistre',
  outline: 'border border-bistre/25 text-bistre hover:border-flame hover:text-flame',
};

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'className' | 'children' | 'href'>;

export function Button({ variant = 'primary', href, className, children, ...rest }: Props) {
  return (
    <a
      href={href}
      className={cn(
        'patch inline-flex items-center justify-center px-7 py-3 text-label uppercase transition-colors duration-200',
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
