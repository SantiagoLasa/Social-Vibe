import localFont from 'next/font/local';

// Brand kit p.8 — "Heavy over hairline". Las tres son libres (Google Fonts)
// y van autoalojadas: nada de CDN externo.

// Display · headlines y el wordmark. 900 para display, 700 para headline.
export const bodoni = localFont({
  src: [
    {
      path: '../../public/fonts/BodoniModa-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BodoniModa-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-bodoni',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

// Body, UI, versalitas con tracking ancho.
export const jost = localFont({
  src: [
    {
      path: '../../public/fonts/Jost-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Jost-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-jost',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

// Utility · captions, fechas, precios. Sin preload: es tipografía de detalle,
// no debe competir con el LCP.
export const courier = localFont({
  src: [
    {
      path: '../../public/fonts/CourierPrime-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-courier',
  display: 'swap',
  preload: false,
});
