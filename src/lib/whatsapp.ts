import { brand } from '@/content/brand';

/**
 * Enlace de WhatsApp con mensaje precargado.
 *
 * wa.me abre la app en móvil y WhatsApp Web en escritorio por su cuenta, así
 * que no hace falta detectar dispositivo: un solo href sirve en todos lados
 * y además funciona con clic derecho / abrir en pestaña nueva, cosa que un
 * onClick con window.open rompería.
 */
export function whatsappUrl(message: string): string {
  const digits = brand.contact.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
