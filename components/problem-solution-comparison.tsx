"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

const ROWS = [
  {
    problem: "Google muestra un horario antiguo y la gente llega con el local cerrado",
    solution: "El horario queda igual en Google y en tu web",
  },
  {
    problem: "El teléfono de la ficha ya no existe o nadie contesta",
    solution: "El botón de llamar o escribir llega a tu WhatsApp de verdad",
  },
  {
    problem: "Hay dos fichas del mismo local, una con el nombre antiguo",
    solution: "Hago la gestión con Google para que quede una sola, con el nombre de hoy",
  },
  {
    problem: "Las fotos son de hace años o las subió un cliente",
    solution: "Fotos actuales del local y de tu trabajo",
  },
  {
    problem: "No tienes web, o la que tienes no se ve bien en el celular",
    solution: "Una web simple que carga rápido en el celular",
  },
];

export function ProblemSolutionComparison() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-400/80">
          <X className="h-4 w-4" />
          Lo que encuentro seguido
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
          Cómo lo dejo
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
