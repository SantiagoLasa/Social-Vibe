import { fallbackExt, fallbackSrc, getMedia, srcSetFor } from '@/lib/media';
import { cn } from '@/lib/cn';

type PictureProps = {
  /** Clave del manifest: ruta en assets-raw/ sin extensión, ej. "scene/cloche-lid". */
  src: string;
  alt: string;
  sizes?: string;
  /** Above the fold: eager + fetchpriority high. El resto carga lazy. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

// Reemplazo de next/image para export estático: <picture> con AVIF → WebP →
// respaldo (PNG si hay transparencia, JPG si no), dimensiones explícitas
// para cero CLS y blur placeholder cuando corresponde.
export function Picture({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  imgClassName,
}: PictureProps) {
  const media = getMedia(src);

  return (
    <picture className={cn('block', className)}>
      <source type="image/avif" srcSet={srcSetFor(src, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetFor(src, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(src)}
        srcSet={srcSetFor(src, fallbackExt(src))}
        sizes={sizes}
        alt={alt}
        width={media.width}
        height={media.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={cn('h-auto w-full', imgClassName)}
        style={
          media.blurDataURL
            ? { backgroundImage: `url(${media.blurDataURL})`, backgroundSize: 'cover' }
            : undefined
        }
      />
    </picture>
  );
}
