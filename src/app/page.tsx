import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';

// Placeholder — la Home real se construye cuando llegue el copy del cliente.
export default function Home() {
  return (
    <main className="candy-stripe flex min-h-screen flex-col items-center justify-center gap-10 p-6">
      <Logo />
      <Link
        href="/styleguide"
        className="bg-paper px-4 py-2 text-label uppercase text-flame"
      >
        Sistema de diseño
      </Link>
    </main>
  );
}
