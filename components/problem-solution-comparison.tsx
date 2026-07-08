"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

const ROWS = [
  {
    problem: "Los clientes no te encuentran cuando buscan en Google",
    solution: "Apareces en las búsquedas con una web optimizada",
  },
  {
    problem: "Pierdes ventas y reservas fuera de tu horario",
    solution: "Tu web vende o gestiona reservas las 24 horas",
  },
  {
    problem: "Compites con negocios que ya tienen presencia online",
    solution: "Destacas frente a la competencia con una imagen profesional",
  },
  {
    problem: "Tu web actual es lenta, anticuada o no se ve bien en el móvil",
    solution: "Diseño moderno, rápido y adaptado a cualquier dispositivo",
  },
];

export function ProblemSolutionComparison() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-400/80">
          <X className="h-4 w-4" />
          Sin una web profesional
        </h3>
        <ul className="space-y-4">
          {ROWS.map((row) => (
            <li key={row.problem} className="flex items-start gap-3 text-sm text-white/60">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/60" />
              {row.problem}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "rounded-2xl border border-primary/30 bg-primary/[0.06] p-6 shadow-[0_0_40px_-15px] shadow-primary/40"
        )}
      >
        <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <Check className="h-4 w-4 text-success" />
          Con WebLocal
        </h3>
        <ul className="space-y-4">
          {ROWS.map((row) => (
            <li key={row.solution} className="flex items-start gap-3 text-sm text-white/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {row.solution}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
