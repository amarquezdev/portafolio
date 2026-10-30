import { ChevronDown, ChevronRight, Globe, MapPin, MessageCircle, Search } from "lucide-react";

import { Glows } from "@/components/glows";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    name: "Te buscan en Google",
    description: "Escriben el nombre de tu local, o “negocios cerca de mí”.",
    icon: Search,
    float: "animate-float-slow",
  },
  {
    name: "Ven tu perfil",
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
    description: "Con un botón, sin esperas.",
    icon: MessageCircle,
    float: "animate-float-delayed",
  },
];

export function HowItConnectsSection() {
  return (
    <section id="como-funciona" className="relative isolate px-4 py-24 sm:px-6 lg:px-8">
      <Glows preset="connects" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <SectionEyebrow step={1}>Cómo te encuentran</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">
            Así llega un cliente{" "}
            <span className="text-primary">
              hasta tu WhatsApp
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Antes de agendarte, tu cliente generalmente sigue este proceso hasta llegar a ti.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-14">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            // El último paso (WhatsApp) es el destino: se marca en naranja
            const isLast = index === STEPS.length - 1;
            return (
              <div key={step.name} className="relative">
                <div
                  className={cn(
                    "group relative h-full rounded-3xl p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl",
                    isLast ? "bg-primary text-primary-foreground" : "glass",
                    step.float
                  )}
                >
                  <div
                    className={cn(
                      "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full",
                      isLast ? "bg-white" : "bg-white/70"
                    )}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className={cn("text-lg font-semibold", isLast ? "text-white" : "text-foreground")}>
                    {step.name}
                  </h3>
                  <p className={cn("mt-2 text-sm", isLast ? "text-white/85" : "text-muted-foreground")}>
                    {step.description}
                  </p>
                </div>
                {/* Flecha al centro del espacio entre tarjetas: abajo en celular, a la derecha en escritorio */}
                {index < STEPS.length - 1 && (
                  <>
                    <span className="glass absolute -bottom-11 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-primary sm:hidden">
                      <ChevronDown className="h-4 w-4" />
                    </span>
                    <span className="glass absolute -right-11 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-primary lg:flex">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-muted-foreground">
          Si en uno de estos pasos hay falta de información o un enredo, tu potencial cliente desiste.
        </p>
      </div>
    </section>
  );
}
