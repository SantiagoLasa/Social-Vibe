# Contenido pendiente del cliente — Social Vibe Media Agency

Registro vivo de todo lo que está como placeholder. Actualizar al cerrar cada
ítem, indicando fecha y quién lo confirmó.

## Estructura del sitio (confirmada)

One-pager con anclas. Cinco segmentos, cada uno con su gesto animado:

| Segmento | Gesto |
|---|---|
| Who we are | El patch se pega sobre la página (tilt −1.6°) |
| Our services | El menú se despliega en paneles |
| Our work | La bandeja se abre y aparecen los resultados ✅ construido |
| What our clients are saying | La comanda de cocina se desenrolla |
| Contact us | La carpeta manila se abre, objetos con parallax |

## Bloqueante para avanzar

- [ ] **Copy en inglés Y español** — el sitio es bilingüe. Siguiendo el propio brand kit ("Spanish posts get their own copy, not a mirror"), el español debe estar *escrito*, no traducido. Definir si lo redacta el cliente o nosotros.
- [ ] **Descripción de cada servicio** — los cuatro títulos ya están confirmados (ver abajo), falta el párrafo de cada uno.
- [ ] **Piezas de portfolio** — las capturas y videos de cada cliente. Jeniffer va a pasar la carpeta de multimedia.
- [ ] **Testimonios reales** — para "What our clients are saying". No se inventan: hacen falta las citas textuales y quién las dijo.
- [ ] **Fotografía** — el kit pide "clean food photo"; hacen falta imágenes reales de food/drink/beauty.

## Hallazgos de los portfolios actuales

Revisados `jensugc.com/social-media` (gastronomía) y `jenssocialss.com/dahbyk-179q`
(general). Ambos son sitios de Canva con la misma plantilla.

- **Servicios confirmados** (ya en `src/content/services.ts`): Strategy · Content Creation · Professional Photography · Social Media Management.
- **Clientes de gastronomía** (ya en `src/content/clients.ts`): La Fresa Francesa, Lima Bakery, Big Joe, Pink Cafe, Silverlake Bistro, Avalon Miami, Delicias del Perú.
- **El portfolio general no nombra clientes** — solo dice "Work Examples". Si queremos mostrar variedad fuera de gastronomía, hacen falta esos nombres y piezas.
- ⚠️ **Los dos sitios tienen texto de plantilla sin reemplazar**: "An intriguing caption that describes the room goes here. Use a flattering photo, then describe away!". Avisarle a Jeniffer — está publicado hoy.
- ⚠️ **Marca anterior**: ambos firman "BY JENS SOCIALS". Definir si Social Vibe reemplaza a Jens Socials o convive.
- [ ] **Secciones que hoy existen y habría que decidir si migran**: "Photo Examples", "Analytics", "Brands we have worked with".

## Assets para la escena de la bandeja (cloche reveal)

La animación ya está construida con arte placeholder vectorial. Para
reemplazarla por lo real hacen falta **dos recortes en capas separadas** —
esto es lo crítico: si viene una sola foto con la tapa puesta, la tapa no se
puede levantar.

- [ ] **Capa 1 — brazo + guante + bandeja vacía.** PNG con fondo transparente.
      La bandeja vacía y despejada: ahí aparecen las capturas.
- [ ] **Capa 2 — la tapa (cloche) sola.** PNG con fondo transparente, misma
      perspectiva, misma escala y misma iluminación que la capa 1.
- [ ] Ambas exportadas **desde la misma toma / mismo encuadre**, mínimo
      2000px de ancho, para que al superponerlas la tapa calce exacta sobre
      la bandeja.

Cómo conseguirlas, de mejor a peor:

1. **Foto propia** (recomendado): cámara en trípode, dos disparos sin mover
   nada — uno con la tapa apoyada, otro con la tapa levantada o fuera de
   cuadro. Luego se recorta la tapa. Es una agencia de food en Miami:
   conseguir una bandeja con tapa es trivial y el resultado es real.
2. **Banco de imágenes** con recorte posterior (remove.bg, Photoshop).
3. **Generación por IA** (Midjourney, Firefly, Nano Banana/Gemini): pedir
   "waiter's arm in black suit and white glove holding a silver cloche tray,
   studio lighting, plain background, product photography". Generar dos
   variantes (con y sin tapa) es inconsistente — mejor generar una sola con
   la tapa y recortarla en dos capas.

- [ ] **Capturas de resultados** (5 piezas) — screenshots reales de Instagram
      con sus métricas. Van en `src/content/results.ts`, hoy con `00.0K`
      como placeholder deliberado: no inventamos números.

## Datos de marca a confirmar

- [ ] **Dominio definitivo** — `brand.url` asume `https://socialvibe.agency`.
- [ ] **Teléfono y WhatsApp**.
- [ ] **URLs exactas de redes** (Instagram, TikTok).
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
