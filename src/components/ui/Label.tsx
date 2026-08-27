import { cn } from '@/lib/cn';

// Versalitas con tracking ancho — Jost 500, el "label" del brand kit.
export function Label({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p className={cn('text-label uppercase text-flame', className)} {...rest}>
      {children}
    </p>
  );
}
