import { cn } from "@/lib/utils";

/**
 * Destellos decorativos: manchas grandes y difuminadas en tonos cálidos que flotan
 * lento detrás del contenido. Dan color para que el vidrio (.glass) se note.
 * La sección que los contiene necesita `relative isolate` para quedar detrás del texto.
 * No se recortan en el borde de la sección: así se mezclan con la sección vecina en vez
 * de cortarse en línea recta. El recorte horizontal lo hace el contenedor de la página.
 */
const PRESETS = {
  hero: [
    "left-[-6%] top-[12%] h-[28rem] w-[28rem] bg-primary/25 animate-float-slow",
    "right-[-4%] top-[4%] h-[24rem] w-[24rem] bg-[#ffb27a]/40 animate-float-medium",
    "left-1/2 bottom-[2%] h-72 w-[36rem] -translate-x-1/2 bg-[#ffd3b0]/60 animate-pulse-slow",
  ],
  connects: [
    "left-[10%] top-[30%] h-80 w-80 bg-primary/20 animate-float-medium",
    "right-[8%] bottom-[5%] h-96 w-96 bg-[#ffc49a]/45 animate-float-slow",
  ],
  case: [
    "left-[25%] top-[8%] h-96 w-96 bg-[#ffc49a]/40 animate-float-slow",
    "right-[5%] bottom-[20%] h-80 w-80 bg-primary/15 animate-float-medium",
  ],
  testimonials: [
    "left-[5%] top-[35%] h-80 w-80 bg-[#ffc49a]/45 animate-float-medium",
    "right-[15%] top-[20%] h-72 w-72 bg-primary/15 animate-float-slow",
  ],
  features: [
    "right-[5%] -top-10 h-72 w-72 bg-primary/10 animate-float-slow",
    "left-[5%] bottom-0 h-80 w-80 bg-[#ffd3b0]/50 animate-float-medium",
  ],
} as const;

export function Glows({ preset, className }: { preset: keyof typeof PRESETS; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      {PRESETS[preset].map((blob) => (
        <span key={blob} className={cn("glow-blob absolute rounded-full blur-[100px]", blob)} />
      ))}
    </div>
  );
}
