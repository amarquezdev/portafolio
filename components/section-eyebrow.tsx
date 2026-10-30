import { cn } from "@/lib/utils";

/** Etiqueta numerada sobre el título de cada sección: marca el paso de la historia. */
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
        "glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-foreground",
        className
      )}
    >
      <span className="font-semibold text-primary">{String(step).padStart(2, "0")}</span>
      <span className="h-3 w-px bg-black/15" />
      {children}
    </div>
  );
}
