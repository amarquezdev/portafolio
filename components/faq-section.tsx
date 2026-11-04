"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Glows } from "@/components/glows";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { cn } from "@/lib/utils";

// Dudas que suelen frenar a alguien antes de escribir. Respuestas cortas: el detalle va en la cotización.
const FAQS = [
  {
    question: "¿Qué incluye el diagnóstico gratuito?",
    answer:
      "Me mandas el nombre de tu negocio por WhatsApp, reviso tu perfil de Google Maps y te digo qué está mal y qué conviene corregir. Sin costo ni compromiso.",
  },
  {
    question: "¿Cuánto se demora?",
    answer:
      "Depende de lo que necesites: ordenar un perfil es mucho más rápido que hacer una web. Te doy el plazo exacto en la cotización, antes de empezar.",
  },
  {
    question: "¿El dominio y el hosting están incluidos?",
    answer:
      "La cotización detalla qué incluye y cuánto cuesta mantener la web activa cada año, para que no haya sorpresas después.",
  },
  {
    question: "¿Tenemos que reunirnos en persona?",
    answer: "No. Trabajo con negocios de todo Chile y todo se coordina por WhatsApp.",
  },
  {
    question: "¿Qué pasa después de la entrega?",
    answer:
      "Te dejo un documento con indicaciones para mantener tu perfil o tu web al día. Si más adelante necesitas un cambio, me escribes.",
  },
];

export function FaqSection() {
  // Una pregunta abierta a la vez; la primera parte abierta para mostrar que se despliegan
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="relative isolate px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Glows preset="process" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionEyebrow step={4}>Preguntas</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">
            Lo que suelen <span className="text-primary">preguntarme</span>
          </h2>
        </div>

        <ul className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = open === index;
            return (
              <li
                key={faq.question}
                // El borde con brillo es el fondo degradado que asoma por el padding de 1.5px
                className={cn(
                  "rounded-[1.75rem] p-[1.5px] transition-shadow duration-500",
                  isOpen
                    ? "bg-gradient-to-r from-primary via-water to-primary shadow-[0_10px_50px_-12px_rgb(255_107_44/0.35)]"
                    : "bg-white/[0.07]"
                )}
              >
                <div className="rounded-[calc(1.75rem-1.5px)] bg-card">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 py-3 pl-5 pr-3 text-left sm:pl-6"
                  >
                    <span className="w-5 shrink-0 font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-sm font-medium text-foreground sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        isOpen
                          ? "bg-transparent text-foreground ring-1 ring-white/20"
                          : "bg-foreground text-background"
                      )}
                    >
                      <Plus
                        className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-45")}
                      />
                    </span>
                  </button>

                  {/* Alto animado: la fila pasa de 0fr a 1fr */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-[3.25rem] pr-6 text-sm text-muted-foreground sm:pl-14">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
