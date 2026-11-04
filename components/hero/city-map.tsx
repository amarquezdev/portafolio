import { memo } from "react";

import { cn } from "@/lib/utils";

/**
 * Mapa de ciudad estilizado (de noche) para el fondo del hero. Todo en coordenadas de un
 * lienzo de 1200×800 que se recorta para cubrir la pantalla, así que lo importante va cerca
 * del centro: en celular solo se ve la franja x ≈ 440–760.
 *
 * `step` viene de la escena del hero: 1 caen los pines, 2 se marca tu negocio y la ruta.
 */

const W = 1200;
const H = 800;
const GRID = 56;

// Calles en una cuadrícula girada; cada cuarta es avenida
const STREETS = (() => {
  const lines: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
  for (let i = 0, x = -400; x <= W + 400; x += GRID, i++) {
    lines.push({ x1: x, y1: -400, x2: x, y2: H + 400, major: i % 4 === 0 });
  }
  for (let i = 0, y = -400; y <= H + 400; y += GRID, i++) {
    lines.push({ x1: -400, y1: y, x2: W + 400, y2: y, major: i % 4 === 0 });
  }
  return lines;
})();

const AVENUES = [
  "M -40 120 L 1240 700",
  "M 180 -40 C 320 260, 520 420, 1240 520",
];

const RIVER = "M -60 640 C 220 560, 380 720, 620 620 S 980 420, 1260 470";

const PARKS = [
  { x: 520, y: 150, w: 110, h: 70 },
  { x: 880, y: 300, w: 80, h: 120 },
  { x: 300, y: 420, w: 90, h: 60 },
];

// Negocios de la zona; el destacado es el tuyo
const PINS = [
  { x: 560, y: 240 },
  { x: 880, y: 170 },
  { x: 470, y: 520 },
  { x: 1010, y: 560 },
  { x: 760, y: 660 },
  { x: 640, y: 110 },
  { x: 330, y: 300 },
  { x: 800, y: 470 },
];
// A la izquierda de la tarjeta del perfil en escritorio, para que no quede tapado
const FEATURED = { x: 612, y: 330 };
const YOU = { x: 590, y: 480 };
const TILT = -14; // giro de la cuadrícula de calles, en grados

/**
 * Ruta que sigue las calles: se calcula en el sistema de la cuadrícula (antes de girarla), donde
 * las calles son rectas cada GRID. Sale a la calle más cercana, avanza, dobla en las esquinas y
 * entra al destino. Se dibuja dentro del mismo giro que las calles, así calza con ellas.
 */
const ROUTE = (() => {
  const rad = (-TILT * Math.PI) / 180;
  const unrotate = ({ x, y }: { x: number; y: number }) => {
    const dx = x - W / 2;
    const dy = y - H / 2;
    return { x: W / 2 + dx * Math.cos(rad) - dy * Math.sin(rad), y: H / 2 + dx * Math.sin(rad) + dy * Math.cos(rad) };
  };
  const snap = (v: number) => Math.round((v + 400) / GRID) * GRID - 400;
  const a = unrotate(YOU);
  const b = unrotate(FEATURED);
  const streetA = snap(a.x);
  const streetB = snap(b.x);
  const crossing = snap((a.y + b.y) / 2);
  return `M ${a.x} ${a.y} H ${streetA} V ${crossing} H ${streetB} V ${b.y} H ${b.x}`;
})();

// Pin de gota con la punta en (0, 0): cabeza redonda y cuerpo afinado hacia abajo
const PIN_PATH = "M0 0 C -2.5 -5.5 -10 -10.5 -10 -18.5 A 10 10 0 1 1 10 -18.5 C 10 -10.5 2.5 -5.5 0 0 Z";
// Caída corta con rebote al llegar
const DROP = "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

/** Calles, parques, avenidas y río: no cambian, así que se dibujan una sola vez. */
const MapBase = memo(function MapBase() {
  return (
    <>
      <g transform={`rotate(${TILT} ${W / 2} ${H / 2})`}>
        {STREETS.map(({ major, ...l }, i) => (
          <line
            key={i}
            {...l}
            pathLength={1}
            className="map-draw"
            stroke="white"
            strokeOpacity={major ? 0.1 : 0.045}
            strokeWidth={major ? 2 : 1}
            style={{ animationDelay: `${(i % 20) * 40}ms` }}
          />
        ))}
        {PARKS.map((p) => (
          <rect
            key={`${p.x}-${p.y}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx={6}
            className="fill-primary/[0.05] stroke-primary/15"
          />
        ))}
      </g>

      {AVENUES.map((d) => (
        <path key={d} d={d} pathLength={1} className="map-draw" fill="none" stroke="white" strokeOpacity={0.12} strokeWidth={3} />
      ))}

      <path d={RIVER} fill="none" className="stroke-water" strokeOpacity={0.12} strokeWidth={30} strokeLinecap="round" />
      <path d={RIVER} pathLength={1} className="map-draw stroke-water" fill="none" strokeOpacity={0.4} strokeWidth={1.5} />
    </>
  );
});

export function CityMap({ step, className }: { step: number; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="pin-gray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a6072" />
          <stop offset="1" stopColor="var(--pin)" />
        </linearGradient>
        <filter id="pin-shadow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <MapBase />

      {/* Ruta por las calles desde quien busca hasta tu negocio: borde oscuro y línea azul */}
      <g
        transform={`rotate(${TILT} ${W / 2} ${H / 2})`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="[&>path]:transition-[stroke-dashoffset] [&>path]:duration-1000 [&>path]:ease-out"
      >
        <path d={ROUTE} pathLength={1} strokeDasharray={1} strokeDashoffset={step >= 2 ? 0 : 1} strokeWidth={8} className="stroke-[color-mix(in_oklch,var(--primary),black_50%)]" />
        <path
          d={ROUTE}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={step >= 2 ? 0 : 1}
          strokeWidth={5}
          className="stroke-primary"
        />
      </g>

      {/* Inicio: dónde está quien busca. Punto con borde blanco y halo que respira */}
      <g transform={`translate(${YOU.x} ${YOU.y})`}>
        <circle r={10} className="animate-map-ripple fill-water/25 [transform-box:fill-box] [transform-origin:center]" />
        <circle r={16} className="fill-water/10" />
        <circle r={6.5} className="fill-water stroke-white" strokeWidth={2.5} />
      </g>

      {/* Negocios de la zona: pines de gota grises que caen con rebote */}
      {PINS.map((p, i) => (
        <g key={`${p.x}-${p.y}`} transform={`translate(${p.x} ${p.y})`}>
          <ellipse rx={5} ry={1.8} className="fill-black/60" filter="url(#pin-shadow)" style={{ opacity: step >= 1 ? 1 : 0 }} />
          <g
            className={DROP}
            style={{
              transform: step >= 1 ? "translateY(0)" : "translateY(-18px)",
              opacity: step >= 1 ? 1 : 0,
              transitionDelay: step >= 1 ? `${i * 70}ms` : "0ms",
            }}
          >
            <path d={PIN_PATH} fill="url(#pin-gray)" stroke="rgb(255 255 255 / 0.18)" strokeWidth={1} transform="scale(0.85)" />
            <circle cy={-15.7} r={3.2} className="fill-background" />
          </g>
        </g>
      ))}

      {/* Destino: tu negocio. El mismo pin que los demás, algo más grande, que pasa a azul cuando llega la ruta */}
      <g transform={`translate(${FEATURED.x} ${FEATURED.y})`}>
        <ellipse rx={7} ry={2.4} className="fill-black/60" filter="url(#pin-shadow)" style={{ opacity: step >= 1 ? 1 : 0 }} />
        <g
          className={DROP}
          style={{
            transform: step >= 1 ? "translateY(0)" : "translateY(-18px)",
            opacity: step >= 1 ? 1 : 0,
            transitionDelay: step >= 1 ? `${PINS.length * 70}ms` : "0ms",
          }}
        >
          <path
            d={PIN_PATH}
            className={cn("transition-[fill] duration-500", step >= 2 ? "fill-primary" : "fill-pin")}
            stroke="rgb(255 255 255 / 0.18)"
            strokeWidth={1}
            transform="scale(1.3)"
          />
          <circle cy={-24} r={4.6} className="fill-background" />
        </g>
      </g>
    </svg>
  );
}
