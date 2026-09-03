# MEMO — Social Vibe Media Agency

> Memoria viva del proyecto. Se lee al empezar una sesión y se actualiza al cerrarla.
> El contenido pendiente **del cliente** vive aparte, en `CONTENT-TODO.md`.

## Status

**Última actualización:** 2026-09-02

### En curso
- Nada en código. El proyecto está esperando una acción externa.

### Hecho hace poco
- [x] 2026-09-02 — Sitio publicado en `https://social-vibe.santi-lasa99.workers.dev` (Workers Static Assets), cerrado a buscadores.
- [x] 2026-09-02 — Testimonios eliminados; el sitio pasa a cuatro segmentos.
- [x] 2026-09-02 — *Who we are* gana su gesto de patch; *Contact* pasa a verde con parallax.
- [x] 2026-09-02 — Los reels se publican en el build; R2 descartado.

### Próximo
1. Comprar el dominio (Santiago) y avisar cuál quedó.
2. Conectarlo al Worker en Settings → Domains.
3. Contratar el mail y crear la casilla.
4. Abrir el sitio a buscadores: `indexable: true` + `url` real en `src/content/brand.ts`, y cambiar el mail de contacto.

### Bloqueado / señalado
- 🚩 **El dominio.** `socialvibe.agency` —el que el brand kit asumía— **está registrado y en uso por otra agencia de marketing digital** (responde 200, título "Your Full Service Digital Marketing Agency"). No es un dominio parkeado. Además de la URL, abre un tema de marca que hay que hablar con Jeniffer: dos agencias del mismo rubro con el mismo nombre.
  - Libres al 02/09: `socialvibema.com` (recomendado, calca el handle `@socialvibe.ma`), `socialvibemiami.com`, `socialvibecreative.com`, `hellosocialvibe.com`, `socialvibemedia.co`, `socialvibe.us`.
  - Ocupados: `socialvibe.com`, `.co`, `.media`, `.studio`, `socialvibemedia.com`, `socialvibeagency.com`.
- 🚩 **Los portfolios viejos de Jeniffer siguen publicados con texto de plantilla de Canva sin reemplazar** ("An intriguing caption that describes the room goes here..."). Hay que avisarle.
- El mail de contacto del sitio es `jeniffersocially@gmail.com`. Cambia cuando exista la casilla del dominio.

## Decisiones

### 2026-09-02 — Los reels se sirven desde el sitio, no desde R2
**Decisión:** publicarlos como assets estáticos vía `scripts/copy-reels.mjs`, no subirlos a un bucket.
**Por qué:** el motivo original para R2 era que no cobra transferencia, pero Pages/Workers tampoco, y R2 exige dejar una tarjeta cargada. Cloudflare **no tiene tope de gasto**, así que un excedente se cobra solo. Los números no justificaban el riesgo: 360 archivos contra un límite de 20.000, y el reel más pesado 4,4 MB contra 25 MiB por archivo.
**Cuándo revisarlo:** si algún video superara los 25 MiB, o si la biblioteca creciera mucho.

### 2026-09-02 — Los testimonios se eliminan, no se esperan
**Decisión:** sacar la sección entera en vez de dejarla con estado vacío.
**Por qué:** era el único bloqueante del proyecto. Se revisaron los dos portfolios buscando citas reales y **no existen**: lo que parecen testimonios son bloques "Work Examples" con el nombre del cliente, y "Testimonial/Review" figura en `jensugc.com` como *tipo de contenido que ella produce* (videos formato testimonio para marcas), no como algo que un cliente dijo de ella.
**Nota:** el gesto de la comanda quedó en el historial. Si algún día llegan citas reales, se recupera de ahí.

### 2026-09-02 — Contact pasa de rayas a verde
**Decisión:** cambiar el fondo de la sección de contacto.
**Por qué:** los testimonios eran el único bloque verde de la página. Sin ellos el recorrido perdía su única superficie profunda. El verde es el que el kit reserva para el sello, y la carpeta celeste contrasta mucho mejor sobre verde que sobre las rayas.

### 2026-09-02 — El parallax de Contact mueve la carpeta como una sola pieza
**Decisión:** la carpeta (tarjeta + solapa) es una capa y el CTA es la otra, a ~2.1× de velocidad.
**Por qué:** el plan original era mover la solapa y la tarjeta a distinta velocidad, pero la solapa está pegada a la carpeta: despegarlas rompe el objeto en vez de dar profundidad.

### 2026-09-02 — El pestillo del titular de la bandeja lleva histéresis
**Decisión:** el titular se cierra pasado el progreso 0.42 y se vuelve a abrir por debajo de 0.18.
**Por qué:** cerrarlo para siempre (versión anterior) dejaba la escena decapitada: quien subía a releer encontraba media pantalla de rayas vacías. Abrirlo sin histéresis devolvía el bug original —el titular reapareciendo a media opacidad sobre las capturas—. Por debajo de 0.18 no hay ninguna captura a la vista (la primera empieza en 0.30), así que ahí puede volver sin pelear con nada.

### 2026-09-02 — Se publica con noindex hasta que exista el dominio
**Decisión:** `brand.indexable = false` mientras tanto, con `brand.url` apuntando a la URL real de Workers.
**Por qué:** un canonical que declara un dominio inexistente es peor que no publicar. El doble candado (robots.txt `Disallow: /` + meta `noindex, nofollow`) hace falta completo: el robots.txt solo no impide que se indexe una URL a la que se llega por un enlace directo.

## Knowledge

**Stack y deploy**
- Next.js 15 con `output: 'export'` y `trailingSlash: true`. Salida en `out/`.
- Se despliega por **Workers Static Assets** (no Pages), configurado en `wrangler.jsonc`: assets-only, sin `main`, con `not_found_handling: "404-page"`.
- Build en Cloudflare: build command `pnpm build`, deploy command `npx wrangler deploy`.
- `.nvmrc` fija Node 22. Los scripts usan `import.meta.dirname`, que necesita ≥20.11.

**Comandos**
- `pnpm dev` — servidor local en :3000. **No genera `public/media/`**: si está vacío, correr `pnpm build` (o `pnpm images` + `pnpm reels`) al menos una vez.
- `pnpm build` — imágenes → reels → OG → next build → fix-lang.
- `npx wrangler deploy --dry-run` — valida `wrangler.jsonc` sin publicar ni pedir auth.

**Dónde vive qué**
- Fuentes pesadas en `assets-raw/` (versionadas, ~116 MB). `public/media/` se **genera** y está en `.gitignore`.
- Los 5 MP4 viven en `assets-raw/_source/` y `scripts/copy-reels.mjs` los copia en cada build.
- El dominio y el flag de indexación salen los dos de `src/content/brand.ts` — de ahí se propagan a `layout.tsx`, `robots.ts` y `sitemap.ts`.

**Gotchas**
- ⚠️ **El panel de navegador no logra componer capturas de esta página después de scrollear** — devuelve pantallas en blanco o con el header corrido, local y en producción. No es un bug del sitio. Para verificar animaciones, **medir los transforms por JS** en vez de mirar capturas. Para fotografiar una sección, ocultar por JS las anteriores (`display:none`) para que quede arriba de todo.
- ⚠️ Si la pestaña del panel está en segundo plano, `requestAnimationFrame` se pausa y **motion deja de actualizar**: los parallax se leen congelados aunque el scroll cambie. Traer la pestaña al frente antes de medir (`tabs_select`).
- Next serializa los hreflang como `hrefLang`. Un `grep hreflang` sensible a mayúsculas no los encuentra — están igual.
- `scripts/faststart.mjs` mueve el átomo `moov` al principio de un MP4. Los originales del iPhone dan `moov@-1 mdat@32`; los convertidos, `moov@36 mdat@3567`. `copy-reels.mjs` valida esto y avisa.

**Marca**
- El sitio **no muestra precios** (decisión del cliente). Los paquetes se conversan por WhatsApp.
- Español neutro de Miami (tuteo), no rioplatense.
- El patch va inclinado −1.6° exacto, sin sombras ni gradientes (brand kit p.6).

## Session Log

### 2026-09-02
- Los reels salieron de R2 y pasaron a publicarse en el build; se evitó activar R2 y dejar una tarjeta cargada.
- Se eliminaron los testimonios tras verificar que no existen en ningún portfolio; el sitio quedó en cuatro segmentos.
- *Who we are* ganó su gesto de patch y *Contact* pasó a verde con parallax de dos capas.
- Primer deploy a producción, cerrado a buscadores. Verificado contra la URL real.
- Se descubrió que `socialvibe.agency` está tomado por una agencia competidora.
- Se registró un dominio con un error de tipeo: `socialvibemediaagengy.com` ("agengy"). El correcto, `socialvibemediaagency.com`, sigue libre. Pendiente de resolver.
- Bug corregido: el titular de la escena de la bandeja desaparecía para siempre al bajar y no volvía al subir.
