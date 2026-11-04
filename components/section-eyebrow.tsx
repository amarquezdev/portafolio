import { cn } from "@/lib/utils";

/** Etiqueta sobre el título de cada sección, estilo índice de mapa: (01) ── Servicios. */
export function SectionEyebrow({
  step,
  children,
  className,
}: {
  step: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
    >
      <span className="text-primary">({String(step).padStart(2, "0")})</span>
      <span className="h-px w-10 bg-white/20" />
      {children}
    </div>
  );
}
