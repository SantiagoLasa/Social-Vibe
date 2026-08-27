import type { Copy } from '@/content/copy';
import { brand } from '@/content/brand';
import { Container } from './Container';
import { Seal } from './Logo';

export function Footer({ copy }: { copy: Copy }) {
  return (
    <footer className="bg-bistre text-vanilla">
      <Container>
        <div className="flex flex-col items-center gap-8 py-16 text-center">
          <Seal className="w-20 text-2xl" />
          <p className="font-mono text-utility uppercase text-vanilla/60">
            {copy.footer.builtIn}
          </p>
          <p className="font-mono text-utility uppercase text-vanilla/45">
            © {new Date().getFullYear()} {brand.name} {brand.descriptor}.{' '}
            {copy.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
