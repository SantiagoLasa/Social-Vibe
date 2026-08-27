'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import type { Copy } from '@/content/copy';
import type { Locale } from '@/content/brand';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Logo } from './Logo';
import { CloseIcon, MenuIcon } from '../ui/icons';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav({ copy, locale }: { copy: Copy; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy: marca la sección visible. rootMargin recorta la franja de
  // decisión al centro del viewport para que no titile entre dos secciones.
  useEffect(() => {
    const sections = copy.nav.items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [copy.nav.items]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const otherLocale: Locale = locale === 'en' ? 'es' : 'en';
  const otherHref = otherLocale === 'en' ? '/' : '/es';

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled && !open && 'bg-[var(--nav-scrim)] backdrop-blur-[10px]',
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between gap-6">
            <a href="#top" aria-label="Social Vibe">
              <Logo className="scale-[0.62] origin-left md:scale-75" />
            </a>

            <nav className="hidden items-center gap-8 lg:flex" aria-label={copy.nav.label}>
              {copy.nav.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cn(
                    'relative py-1 text-label uppercase transition-colors duration-200',
                    active === item.id ? 'text-flame' : 'text-bistre hover:text-flame',
                  )}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-flame"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </a>
              ))}
              <Link
                href={otherHref}
                className="text-label uppercase text-bistre/60 transition-colors duration-200 hover:text-flame"
              >
                {otherLocale}
              </Link>
              <a
                href="#contact"
                className="patch bg-bistre px-5 py-2.5 text-label uppercase text-vanilla transition-colors duration-200 hover:bg-flame"
              >
                {copy.nav.cta}
              </a>
            </nav>

            <button
              type="button"
              className="text-bistre lg:hidden"
              aria-label={open ? copy.a11y.closeMenu : copy.a11y.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="candy-stripe fixed inset-0 z-40 flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <motion.nav
              className="flex flex-1 flex-col items-start justify-center gap-6 px-8 pt-20"
              aria-label={copy.nav.label}
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.06 } } }}
            >
              {copy.nav.items.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  variants={{
                    closed: { opacity: 0, y: 20 },
                    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                  className="font-display text-display-m text-bistre"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  closed: { opacity: 0, y: 20 },
                  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
                className="flex items-center gap-5 pt-4"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="patch bg-bistre px-6 py-3 text-label uppercase text-vanilla"
                >
                  {copy.nav.cta}
                </a>
                <Link href={otherHref} className="text-label uppercase text-bistre/70">
                  {otherLocale}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
