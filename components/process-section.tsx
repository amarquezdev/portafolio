import { Search, Palette, Code2, Rocket } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    name: "Conversamos",
    description: "Me cuentas de tu negocio y vemos si necesitas la ficha de Google, la web o las dos.",
    icon: Search,
    float: "animate-float-slow",
  },
  {
    number: "02",
    name: "Te mando la cotización",
    description: "Con precio y plazo claros, antes de empezar. Si no te convence, no pasa nada.",
    icon: Palette,
    float: "animate-float-medium",
  },
  {
    number: "03",
    name: "Hago el trabajo",
    description: "Ordeno la ficha o armo la web, y te voy mostrando avances para que opines.",
    icon: Code2,
    float: "animate-float",
  },
  {
    number: "04",
    name: "Entrego y te explico",
    description: "Te dejo todo funcionando, con un documento de indicaciones para que sepas cómo mantenerlo.",
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
            Así{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              trabajo contigo
            </span>
          </h2>
          <p className="mt-4 text-white/60">
            Hablas conmigo desde el primer mensaje hasta la entrega.
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
