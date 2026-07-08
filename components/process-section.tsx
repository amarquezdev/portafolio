import { Search, Palette, Code2, Rocket } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    name: "Descubrimiento",
    description: "Entendemos tu negocio, tu público y qué necesita tu web para funcionar de verdad.",
    icon: Search,
    float: "animate-float-slow",
  },
  {
    number: "02",
    name: "Diseño",
    description: "Te mostramos una propuesta visual a medida antes de escribir una sola línea de código.",
    icon: Palette,
    float: "animate-float-medium",
  },
  {
    number: "03",
    name: "Desarrollo",
    description: "Construimos tu sitio en WordPress o a medida, según lo que mejor se adapte a tu proyecto.",
    icon: Code2,
    float: "animate-float",
  },
  {
    number: "04",
    name: "Lanzamiento y soporte",
    description: "Publicamos tu web y te acompañamos con soporte y mejoras después del lanzamiento.",
    icon: Rocket,
    float: "animate-float-delayed",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 animate-pulse-slow rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Así es{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              trabajar con nosotros
            </span>
          </h2>
          <p className="mt-4 text-white/60">
            Un proceso claro, de principio a fin, sin sorpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.name}
                className={cn(
                  "group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]",
                  step.float
                )}
              >
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-[11px] font-semibold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.name}</h3>
                <p className="mt-2 text-sm text-white/60">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
