/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: el sitio se sirve como HTML/CSS/JS plano en Cloudflare Pages.
  output: 'export',
  // Cada ruta se emite como carpeta/index.html — mapea limpio en hosting estático.
  trailingSlash: true,
  images: {
    // next/image queda deshabilitado en export estático; usamos <Picture /> propio (fase 3).
    unoptimized: true,
  },
};

module.exports = nextConfig;
