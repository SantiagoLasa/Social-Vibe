import type { Metadata } from 'next';
import { bodoni, courier, jost } from './fonts';
import { brand } from '@/content/brand';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — Social media for food, drink & beauty brands in Miami`,
    template: `%s — ${brand.name}`,
  },
  description:
    'Social Vibe is a Miami social media agency for food, drink and beauty brands. Strategy and copy for businesses whose margins are real.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} ${courier.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
