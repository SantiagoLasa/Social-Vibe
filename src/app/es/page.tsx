import type { Metadata } from 'next';
import { SiteHome } from '@/components/SiteHome';
import { brand } from '@/content/brand';

export const metadata: Metadata = {
  // `absolute` evita que el template del layout agregue el nombre otra vez.
  title: {
    absolute: `${brand.name} — Redes para marcas de comida, bebida y belleza en Miami`,
  },
  description:
    'Social Vibe es una agencia de redes en Miami para marcas de comida, bebida y belleza. Estrategia y textos para negocios donde el margen es real.',
  alternates: {
    canonical: '/es',
    languages: { en: '/', es: '/es' },
  },
};

export default function PageEs() {
  return <SiteHome locale="es" />;
}
