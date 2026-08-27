// ARTE PLACEHOLDER — geometría vectorial para probar la mecánica de la
// animación. Se reemplaza por los recortes fotográficos reales (ver
// CONTENT-TODO.md → "Assets para la escena de la bandeja").
//
// Las tres piezas comparten el mismo viewBox y se apilan en absolute, así
// la tapa se mueve en el sistema de coordenadas de la bandeja sin desalinear.

export const CLOCHE_VIEWBOX = '0 0 800 620';

const svgProps = {
  viewBox: CLOCHE_VIEWBOX,
  xmlns: 'http://www.w3.org/2000/svg',
  className: 'absolute inset-0 h-full w-full',
  'aria-hidden': true,
} as const;

/** Capa 1 — brazo del mesero, guante y bandeja. Queda quieta. */
export function TrayAndArm() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sv-silver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8E4DC" />
          <stop offset="45%" stopColor="#B9B2A6" />
          <stop offset="100%" stopColor="#8A8377" />
        </linearGradient>
      </defs>

      {/* Manga del saco entrando desde la izquierda */}
      <path
        d="M0 470 C 90 470, 150 452, 215 432 L 245 500 C 175 524, 95 540, 0 540 Z"
        fill="#1C1A18"
      />
      {/* Puño de camisa */}
      <path d="M215 432 L 245 500 L 285 486 L 255 418 Z" fill="#F4F1EA" />
      {/* Guante blanco sosteniendo la base */}
      <ellipse cx="330" cy="452" rx="70" ry="34" fill="#F4F1EA" />

      {/* Bandeja de plata */}
      <ellipse cx="400" cy="430" rx="300" ry="56" fill="url(#sv-silver)" />
      <ellipse cx="400" cy="422" rx="300" ry="52" fill="#D6D1C7" />
      <ellipse cx="400" cy="420" rx="268" ry="42" fill="#EDE9E1" />
      <ellipse cx="400" cy="420" rx="248" ry="34" fill="#DAD5CB" />
    </svg>
  );
}

/** Capa 2 — la tapa. Es lo único que se mueve: sube y rota apenas. */
export function ClocheLid() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sv-dome" x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#F2EFE8" />
          <stop offset="38%" stopColor="#C9C3B7" />
          <stop offset="72%" stopColor="#9C958A" />
          <stop offset="100%" stopColor="#7C766C" />
        </linearGradient>
      </defs>

      {/* Domo */}
      <path
        d="M148 418 C 148 268, 262 168, 400 168 C 538 168, 652 268, 652 418 Z"
        fill="url(#sv-dome)"
      />
      {/* Reflejo — una sola pincelada, sin glow */}
      <path
        d="M232 404 C 232 300, 292 214, 372 198 C 320 236, 288 314, 288 404 Z"
        fill="#FFFFFF"
        opacity="0.42"
      />
      {/* Borde inferior */}
      <ellipse cx="400" cy="418" rx="252" ry="26" fill="#B4AEA2" />
      {/* Perilla */}
      <rect x="382" y="132" width="36" height="42" rx="12" fill="#A9A296" />
      <ellipse cx="400" cy="132" rx="44" ry="20" fill="#D8D3C9" />
      <ellipse cx="400" cy="128" rx="30" ry="13" fill="#EFEBE3" />
    </svg>
  );
}
