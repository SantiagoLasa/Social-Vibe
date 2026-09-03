# Contenido pendiente del cliente — Social Vibe Media Agency

Registro vivo de todo lo que está como placeholder. Actualizar al cerrar cada
ítem, indicando fecha y quién lo confirmó.

## Estructura del sitio (confirmada)

One-pager con anclas. Cuatro segmentos, cada uno con su gesto animado, todos
construidos:

| Segmento | Gesto |
|---|---|
| Who we are | El patch se pega sobre la página (entra a −6°, se asienta en −1.6°) |
| Our services | El menú se despliega en paneles |
| Our work | La bandeja se abre y aparecen los resultados |
| Contact us | La carpeta se abre sobre verde, con parallax de dos capas |

**Testimonios: descartados** (02/09). Eran el único bloqueante. Se revisaron los
dos portfolios de Jeniffer buscando citas reales y no hay: lo que parecen
testimonios son bloques "Work Examples" con el nombre del cliente, y la palabra
"Testimonial/Review" aparece en jensugc.com como *tipo de contenido que ella
produce*, no como cita de un cliente. Decisión del cliente: sacar la sección en
vez de esperar. Si algún día llegan citas reales, el gesto de la comanda está en
el historial (commit anterior a este).

## Multimedia recibido (31/08)

Carpeta "WEBSITE MEDIA" de Jeniffer. Estado:

| Carpeta | Contenido | Estado |
|---|---|---|
| PHOTOS | 16 fotos, 4000×6000 (2:3 vertical), ~6 MB c/u | ✅ En `assets-raw/photos/` |
| Results | 8 capturas de métricas de Instagram | ✅ En `assets-raw/results/` |
| VIDEOS | 6 archivos `.mov`, 133 MB total | ✅ En `assets-raw/_source/videos/` |

**Métricas relevadas de las capturas:**

- Barra de engagement: 502K views · 57K likes · 189 comentarios · 1.241 compartidos · 2.773 guardados
- Barra de engagement: 374K views · 48K likes · 248 comentarios · 1.935 compartidos · 4.621 guardados
- Insights: 136,2K views · +1,1K seguidores · 63 publicaciones
- Insights: 113K views · 2,5K interacciones · +385 seguidores · 104 publicaciones
- Insights: 73,8K views · +88 seguidores · 67 publicaciones
- Mensual: 136.179 views · +989 seguidores netos
- Views: 112.781 · 63,7% seguidores / 36,3% no seguidores · 12.212 cuentas alcanzadas
- Dashboard (Abr 15 – May 14): 24K alcance **+89,6%** · 645 cuentas activadas **+72,5%** · 16K seguidores

### Videos — resuelto

Los 6 .mov del iPhone se convirtieron con HandBrake a 720×1280, sin audio,
~2 Mbps. De 133 MB a 23 MB. Se usan 5 (se descartó el de 41 s por peso).
Los cinco quedaron listos para reproducción web con scripts/faststart.mjs.

Se reproducen en bucle y en silencio, cargando solo cuando entran en
pantalla. Se sirven desde el propio sitio: los MP4 están versionados en
`assets-raw/_source/` y `scripts/copy-reels.mjs` los publica en cada build.

Se evaluó **Cloudflare R2** y se descartó: Cloudflare Pages tampoco cobra
transferencia, admite 25 MiB por archivo (el reel más pesado son 4,4 MB) y no
pide tarjeta. R2 recién haría falta si algún video superara ese límite.

## Hallazgos de los portfolios actuales

Revisados `jensugc.com/social-media` (gastronomía) y `jenssocialss.com/dahbyk-179q`
(general). Ambos son sitios de Canva con la misma plantilla.

- **Servicios**: ese portfolio lista cuatro, pero el PDF de paquetes (más reciente) trae ocho. Se usan los ocho del PDF.
- **Clientes de gastronomía** (ya en `src/content/clients.ts`): La Fresa Francesa, Lima Bakery, Big Joe, Pink Cafe, Silverlake Bistro, Avalon Miami, Delicias del Perú.
- **El portfolio general no nombra clientes** — solo dice "Work Examples". Si queremos mostrar variedad fuera de gastronomía, hacen falta esos nombres y piezas.
- ⚠️ **Los dos sitios tienen texto de plantilla sin reemplazar**: "An intriguing caption that describes the room goes here. Use a flattering photo, then describe away!". Avisarle a Jeniffer — está publicado hoy.
- ⚠️ **Marca anterior**: ambos firman "BY JENS SOCIALS". Definir si Social Vibe reemplaza a Jens Socials o convive.
- [ ] **Secciones que hoy existen y habría que decidir si migran**: "Photo Examples", "Analytics", "Brands we have worked with".

## Assets para la escena de la bandeja (cloche reveal) — resuelto

La escena usa fotos reales en dos capas, no arte placeholder: el brazo con
guante y la bandeja (`assets-raw/scene/tray-arm.png`) y la tapa suelta
(`assets-raw/scene/cloche-lid.png`), ambas PNG con fondo transparente y del
mismo encuadre, que es lo que permite levantar la tapa.


## Datos de marca a confirmar

- [ ] **Dominio definitivo** — `brand.url` asume `https://socialvibe.agency`.
- [ ] **URL de TikTok** (Instagram ya resuelto: instagram.com/socialvibe.ma).
- [ ] **Archivos de logo originales** — hoy el lockup está reconstruido en HTML/CSS con las fuentes reales. Si tienen SVG/AI del original, mejor.

## Contenido de página

- [ ] **H1 y subtítulo del hero** (en ambos idiomas).
- [ ] **Bio del equipo**.
- [ ] **FAQ**.
- [ ] **Privacy Policy y Terms of Service**.
- [ ] **Claves de producción** — Resend, Turnstile y correos de destino, si el sitio lleva formulario.

## Confirmado

- [x] 2026-08-27 — Paleta, tipografías, reglas de logo, patrones y voz: brand kit v1.0 (`social-vibe-brand-kit.pptx.pdf`).
- [x] 2026-08-27 — Nombre: "Social Vibe **Media** Agency" (no "Marketing").
- [x] 2026-08-27 — Datos de la tarjeta del kit son reales: Jeniffer, Founder & Strategy · hello@socialvibe.agency · @socialvibe.
- [x] 2026-08-27 — WhatsApp de Jeniffer: +1 (786) 442-4758. Todos los CTA "Let's talk / Hablemos" abren ese chat con mensaje precargado.
- [x] 2026-08-27 — Variante de español: neutro de Miami (tuteo), no rioplatense. El público es cubano, venezolano, colombiano y peruano.

- [x] 2026-08-31 — Servicios: los ocho del PDF "CONTENT CREATION PACKAGE" (p.02), con sus descripciones. Decisión del cliente: **el sitio no muestra precios** — los tres paquetes (Starter / Signature / Full Experience) quedan para la conversación por WhatsApp.
- [x] 2026-08-31 — Contactos definitivos, los del PDF de paquetes: jeniffersocially@gmail.com y @socialvibe.ma. Reemplazan a los de la tarjeta del brand kit.
- [x] 2026-09-02 — El mail del sitio pasa a `info@socialvibemediaagency.com`, la casilla del dominio propio. Reemplaza al Gmail personal.
- [x] 2026-08-31 — Noveno servicio agregado por el cliente: Website Design (no está en el PDF; su descripción es borrador nuestro).
