"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

import { Glows } from "@/components/glows";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { cn } from "@/lib/utils";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

// Dudas que suelen frenar a alguien antes de escribir. Respuestas cortas: el detalle va en la cotización.
const FAQS = [
  {
    question: "¿Qué incluye el diagnóstico gratuito?",
    answer:
      "Me mandas el nombre de tu negocio por WhatsApp, reviso tu ficha de Google y te digo qué está mal y qué conviene corregir. Sin costo ni compromiso.",
  },
  {
    question: "¿Cuánto se demora?",
    answer:
      "Depende de lo que necesites: ordenar una ficha es mucho más rápido que hacer una web. Te doy el plazo exacto en la cotización, antes de empezar.",
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
      "Te dejo un documento con indicaciones para mantener tu ficha o tu web al día. Si más adelante necesitas un cambio, me escribes.",
  },
];

export function FaqSection() {
  // Una pregunta abierta a la vez; la primera parte abierta para mostrar que se despliegan
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="relative isolate px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Glows preset="process" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-10 text-center sm:mb-12">
          <SectionEyebrow step={4}>Preguntas</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">Preguntas frecuentes</h2>
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
                    ? "bg-gradient-to-r from-[#ffb27a] via-primary to-[#ffd3b0] shadow-[0_10px_40px_-12px_rgb(242_107_29/0.45)]"
                    : "bg-black/5"
                )}
              >
                <div className="rounded-[calc(1.75rem-1.5px)] bg-white">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 py-3 pl-5 pr-3 text-left sm:pl-6"
                  >
                    <span className="w-4 shrink-0 text-xs text-muted-foreground">{index + 1}</span>
                    <span className="flex-1 text-sm font-medium text-foreground sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        isOpen
                          ? "bg-white text-foreground ring-1 ring-black/15"
                          : "bg-foreground text-white"
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

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">¿Tienes otra pregunta?</p>
          <a
            href={WHATSAPP_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-1 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Escríbeme
            <ArrowUpRight className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}
