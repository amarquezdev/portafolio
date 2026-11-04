import { cn } from "@/lib/utils";

/**
 * Destellos decorativos: manchas grandes y difuminadas en naranja y azul que flotan
 * lento detrás del contenido. Dan profundidad al fondo negro y hacen notar el vidrio (.glass).
 * La sección que los contiene necesita `relative isolate` para quedar detrás del texto.
 * No se recortan en el borde de la sección: así se mezclan con la sección vecina en vez
 * de cortarse en línea recta. El recorte horizontal lo hace el contenedor de la página.
 */
const PRESETS = {
  hero: [
    "left-[-6%] top-[12%] h-[28rem] w-[28rem] bg-primary/10 animate-float-slow",
    "right-[-4%] top-[4%] h-[24rem] w-[24rem] bg-water/10 animate-float-medium",
  ],
  case: [
    "left-[25%] top-[8%] h-96 w-96 bg-primary/[0.07] animate-float-slow",
    "right-[5%] bottom-[20%] h-80 w-80 bg-water/[0.07] animate-float-medium",
  ],
  process: [
    "left-[5%] top-[35%] h-80 w-80 bg-water/[0.06] animate-float-medium",
    "right-[15%] top-[20%] h-72 w-72 bg-primary/[0.06] animate-float-slow",
  ],
  features: [
    "right-[5%] -top-10 h-72 w-72 bg-primary/[0.06] animate-float-slow",
    "left-[5%] bottom-0 h-80 w-80 bg-water/[0.06] animate-float-medium",
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
