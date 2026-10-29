import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WHATSAPP_MAPS_URL, WHATSAPP_WEB_URL } from "@/lib/whatsapp";

export function CTASection() {
  return (
    <section id="contacto" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-white/[0.03] to-transparent p-10 text-center sm:p-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 animate-pulse-slow rounded-full bg-primary/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Escríbeme y vemos qué necesita tu negocio
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Puede ser la ficha de Google, la web o las dos. Te respondo yo, por
            WhatsApp, y te mando la cotización sin compromiso.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="white" size="lg" className="group" asChild>
              <a href={WHATSAPP_MAPS_URL} target="_blank" rel="noopener noreferrer">
                Arreglar mi ficha de Google
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={WHATSAPP_WEB_URL} target="_blank" rel="noopener noreferrer">
                Cotizar un sitio web
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
