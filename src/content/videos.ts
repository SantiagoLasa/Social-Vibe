// Reels alojados en YouTube. El sitio NO sirve el video: solo la miniatura,
// y el reproductor se carga recién al hacer clic (ver VideoFacade).
//
// CÓMO SUMAR UN VIDEO
//   1. Subirlo a YouTube. Puede ser "no listado" — se ve con el enlace pero
//      no aparece en el canal ni en búsquedas.
//   2. Copiar el ID de la URL: youtu.be/AQUI_VA_EL_ID
//      o youtube.com/watch?v=AQUI_VA_EL_ID
//   3. Agregar una entrada acá con ese id, un título y una miniatura.
//
// La miniatura (`poster`) es una clave del manifest de imágenes: cualquier
// archivo de assets-raw/. Sirve un fotograma exportado del video o una de
// las fotos existentes. Se elige a mano a propósito: la miniatura decide si
// alguien le da play.

export type Reel = {
  id: string;
  /** ID de YouTube, no la URL completa. */
  youtubeId: string;
  title: string;
  /** Clave del manifest de imágenes. */
  poster: string;
};

// TODO: CONTENIDO CLIENTE — los 6 videos están en assets-raw/_source/videos/
// esperando que se suban al canal. Mientras esta lista esté vacía, la
// sección de reels no se renderiza.
export const reels: Reel[] = [];
