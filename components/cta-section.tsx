import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section id="contacto" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-white/[0.03] to-transparent p-10 text-center sm:p-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 animate-pulse-slow rounded-full bg-primary/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            ¿Listo para tener la web que tu negocio necesita?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Cuéntanos sobre tu negocio y te preparamos un presupuesto sin
            compromiso, adaptado a lo que realmente necesitas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="white" size="lg" className="group">
              Solicitar Presupuesto Gratis
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Hablar con Nosotros
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
