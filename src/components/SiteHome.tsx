import { getCopy, type Copy } from '@/content/copy';
import type { Locale } from '@/content/brand';
import { Nav } from './layout/Nav';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero';
import { WhoWeAre } from './sections/WhoWeAre';
import { Services } from './sections/Services';
import { Work } from './sections/Work';
import { Contact } from './sections/Contact';

// One-pager: los cuatro segmentos en una sola página, con el nav apuntando a
// anclas. Cada sección trae su propio gesto animado.
export function SiteHome({ locale }: { locale: Locale }) {
  const copy: Copy = getCopy(locale);

  return (
    <>
      <a
        href="#who-we-are"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-bistre"
      >
        {copy.a11y.skipToContent}
      </a>
      <Nav copy={copy} locale={locale} />
      <main>
        <Hero copy={copy} />
        <WhoWeAre copy={copy} />
        <Services copy={copy} locale={locale} />
        <Work copy={copy} />
        <Contact copy={copy} />
      </main>
      <Footer copy={copy} />
    </>
  );
}
