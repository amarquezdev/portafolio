"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

// hideOnMobile: en celular se muestran solo 4 puntos para no alargar la sección
const ROWS = [
  {
    problem: "Google muestra un horario desactualizado y el cliente se encuentra con el local cerrado",
    solution: "Google muestra el horario que tienes hoy",
  },
  {
    problem: "El teléfono de la ficha ya no corresponde o no hay un medio rapido de contacto",
    solution: "El botón de llamar o escribir llega a tu WhatsApp de verdad",
  },
  {
    problem: "Hay perfiles duplicados del mismo local, con reseñas e imagenes repartidas en ambos",
    solution: "Hago la gestión con Google para tener un perfil unificado y optimizado",
  },
  {
    problem: "Las fotos del perfil son antiguas o no hay ninguna",
    solution: "Adjunto tus fotos actuales del local y de tus servicios",
    hideOnMobile: true,
  },
  {
    problem: "No tiene web, no hay manera sencilla de agendar o no hay catalogo",
    solution: "Un enlace directo de reserva enlazado a tu sitio web",
  },
];

export function ProblemSolutionComparison() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-500">
          <X className="h-4 w-4" />
          Lo que encuentro seguido
        </h3>
        <ul className="space-y-4">
          {ROWS.map((row) => (
            <li
              key={row.problem}
              className={cn("flex items-start gap-3 text-sm text-muted-foreground", row.hideOnMobile && "hidden sm:flex")}
            >
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              {row.problem}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-7 shadow-sm">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <Check className="h-4 w-4" />
          Cómo lo soluciono
        </h3>
        <ul className="space-y-4">
          {ROWS.map((row) => (
            <li
              key={row.solution}
              className={cn("flex items-start gap-3 text-sm text-white/85", row.hideOnMobile && "hidden sm:flex")}
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {row.solution}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
