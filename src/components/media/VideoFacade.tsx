'use client';

import { useState } from 'react';
import { Picture } from './Picture';
import { cn } from '@/lib/cn';

// Facade de video: se muestra la miniatura y el reproductor de YouTube se
// carga RECIÉN al hacer clic.
//
// Por qué importa: un iframe de YouTube trae cerca de un megabyte de
// scripts y cookies de Google apenas se pinta la página. Con seis reels,
// eso hundiría la velocidad del sitio y rastrearía a gente que ni siquiera
// le dio play. Así, quien no mira el video no paga nada.
//
// Se usa youtube-nocookie.com, que difiere el seguimiento hasta la
// reproducción.

export function VideoFacade({
  youtubeId,
  title,
  poster,
  posterAlt = '',
  className,
}: {
  youtubeId: string;
  title: string;
  poster: string;
  posterAlt?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn('patch relative overflow-hidden bg-bistre', className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Reproducir: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Picture
            src={poster}
            alt={posterAlt}
            sizes="(min-width: 768px) 300px, 70vw"
            className="absolute inset-0 h-full"
            imgClassName="h-full w-full object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-flame text-paper transition-transform duration-200 group-hover:scale-110">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
