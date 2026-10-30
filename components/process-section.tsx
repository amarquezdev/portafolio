"use client";

import { useEffect, useRef, useState } from "react";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    name: "Conversamos",
    description: "Vemos si necesitas la ficha, la web o las dos.",
  },
  {
    name: "Te envio una cotización",
    description: "Precio y plazo claros antes de empezar.",
  },
  {
    name: "Hago la gestión",
    description: "Te voy enseñando avances.",
  },
  {
    name: "Entrego y te explico",
    description: "Con un documento de indicaciones para mantenerlo.",
  },
];

const STEP_MS = 1600;
const HOLD_MS = 2400; // pausa con todo iluminado antes de reiniciar

/**
 * Recorre los pasos uno por uno mientras la sección está en pantalla, para que la
 * vista siga el orden. Con "reducir movimiento" deja todos los pasos iluminados.
 */
function useStepWalk(count: number) {
  const ref = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(-1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setActive(count - 1);
      return;
    }
    if (!inView) return;
    const timer = setTimeout(
      () => setActive((a) => (a >= count - 1 ? -1 : a + 1)),
      active === -1 ? 400 : active === count - 1 ? HOLD_MS : STEP_MS
    );
    return () => clearTimeout(timer);
  }, [inView, active, count, reduced]);

  return { ref, active };
}

export function ProcessSection() {
  const { ref, active } = useStepWalk(STEPS.length);
  // Avance de la línea naranja entre el primer y el último número (0 a 1)
  const progress = Math.max(0, active) / (STEPS.length - 1);

  return (
    <section id="proceso" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <SectionEyebrow step={4}>Cómo trabajo</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Si me escribes, <span className="text-primary">esto es lo que sigue</span>
          </h2>
        </div>

        <ol ref={ref} className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {/* Línea base y línea de avance: vertical en celular, horizontal en escritorio */}
          <span className="pointer-events-none absolute bottom-4 left-4 top-4 w-px -translate-x-1/2 bg-black/10 md:hidden" />
          <span
            className="pointer-events-none absolute left-4 top-4 w-0.5 -translate-x-1/2 rounded-full bg-primary transition-[height] duration-700 ease-out md:hidden"
            style={{ height: `calc((100% - 2rem) * ${progress})` }}
          />
          <span className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-4 hidden h-px bg-black/10 md:block" />
          <span
            className="pointer-events-none absolute left-[12.5%] top-4 hidden h-0.5 -translate-y-1/2 rounded-full bg-primary transition-[width] duration-700 ease-out md:block"
            style={{ width: `calc(75% * ${progress})` }}
          />

          {STEPS.map((step, index) => {
            const isActive = index === active;
            const isDone = index < active;
            return (
              <li
                key={step.name}
                className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 md:mb-4">
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" />
                  )}
                  <span
                    className={cn(
                      "relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold shadow-sm ring-1 transition-all duration-500",
                      isActive && "scale-110 bg-primary text-primary-foreground ring-primary",
                      isDone && "bg-[#fde8dc] text-primary ring-primary/30",
                      !isActive && !isDone && "bg-white text-primary ring-black/5"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <div>
                  <h3
                    className={cn(
                      "text-base font-semibold transition-colors duration-500",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {step.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm transition-colors duration-500",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
