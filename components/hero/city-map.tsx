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
const FEATURED = { x: 700, y: 330 };
const YOU = { x: 590, y: 480 };
const ROUTE = `M ${YOU.x} ${YOU.y} L 612 432 L 668 420 L 684 372 L ${FEATURED.x} ${FEATURED.y}`;

const PIN_PATH = "M0 0 C -5 -9 -11 -15 -11 -23 A 11 11 0 1 1 11 -23 C 11 -15 5 -9 0 0 Z";

/** Calles, parques, avenidas y río: no cambian, así que se dibujan una sola vez. */
const MapBase = memo(function MapBase() {
  return (
    <>
      <g transform={`rotate(-14 ${W / 2} ${H / 2})`}>
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
        <filter id="pin-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <MapBase />

      {/* Ruta desde donde está el cliente hasta tu negocio */}
      <path
        d={ROUTE}
        pathLength={1}
        fill="none"
        className="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-out"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1}
        strokeDashoffset={step >= 2 ? 0 : 1}
        filter="url(#pin-glow)"
      />
      <g transform={`translate(${YOU.x} ${YOU.y})`}>
        <circle r={14} className="fill-water/20" />
        <circle r={6} className="fill-water stroke-background" strokeWidth={2} />
      </g>

      {PINS.map((p, i) => (
        <g key={`${p.x}-${p.y}`} transform={`translate(${p.x} ${p.y})`}>
          <g
            className="transition-all duration-500 ease-out [transform-box:fill-box]"
            style={{
              transform: step >= 1 ? "translateY(0)" : "translateY(-24px)",
              opacity: step >= 1 ? 1 : 0,
              transitionDelay: step >= 1 ? `${i * 70}ms` : "0ms",
            }}
          >
            <path d={PIN_PATH} fill="#403c37" stroke="#0c0b0a" strokeWidth={1.5} />
            <circle cy={-23} r={4} fill="#0c0b0a" />
          </g>
        </g>
      ))}

      {/* Tu negocio: cae último y se enciende */}
      <g transform={`translate(${FEATURED.x} ${FEATURED.y})`}>
        {step >= 2 && (
          <circle cy={-2} r={18} className="animate-map-ripple fill-primary/30 [transform-box:fill-box] [transform-origin:center]" />
        )}
        <g
          className="transition-all duration-500 ease-out"
          style={{
            transform: step >= 1 ? "translateY(0) scale(1.35)" : "translateY(-30px) scale(1.35)",
            opacity: step >= 1 ? 1 : 0,
            transitionDelay: step >= 1 ? `${PINS.length * 70}ms` : "0ms",
          }}
        >
          <path
            d={PIN_PATH}
            className={cn("transition-colors duration-500", step >= 2 ? "fill-primary" : "fill-[#403c37]")}
            stroke="#0c0b0a"
            strokeWidth={1.5}
            filter={step >= 2 ? "url(#pin-glow)" : undefined}
          />
          <circle cy={-23} r={4} fill="#0c0b0a" />
        </g>
      </g>
    </svg>
  );
}
