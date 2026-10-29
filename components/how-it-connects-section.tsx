import { ArrowRight, Globe, MapPin, MessageCircle, Search } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
  {
    name: "Te buscan en Google",
    description: "Escriben el nombre de tu local, o algo como “manicure Reñaca”.",
    icon: Search,
    float: "animate-float-slow",
  },
  {
    name: "Ven tu ficha",
    description: "Miran el horario, las fotos y las reseñas antes de decidir.",
    icon: MapPin,
    float: "animate-float-medium",
  },
  {
    name: "Entran a tu web",
    description: "Revisan tus servicios y precios, o reservan una hora.",
    icon: Globe,
    float: "animate-float",
  },
  {
    name: "Te escriben por WhatsApp",
    description: "Con un botón, sin andar buscando tu número.",
    icon: MessageCircle,
    float: "animate-float-delayed",
  },
];

export function HowItConnectsSection() {
  return (
    <section id="como-funciona" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute right-1/4 top-10 h-72 w-72 animate-pulse-slow rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Así llega un cliente{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              hasta tu WhatsApp
            </span>
          </h2>
          <p className="mt-4 text-white/60">
            La ficha y la web son partes del mismo camino. Si en una parte hay un
            dato malo, ahí se pierde la persona.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.name} className="relative">
                <div
                  className={cn(
                    "group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]",
                    step.float
                  )}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{step.description}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-primary/60 lg:block" />
                )}
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-white/50">
          Aunque me contrates solo uno de los dos servicios, reviso que la ficha y
          la web digan lo mismo.
        </p>
      </div>
    </section>
  );
}
