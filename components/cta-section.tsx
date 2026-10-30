import { ArrowRight } from "lucide-react";

import { Button, ButtonArrow } from "@/components/ui/button";
import { WHATSAPP_BOTH_URL, WHATSAPP_MAPS_URL, WHATSAPP_WEB_URL } from "@/lib/whatsapp";

export function CTASection() {
  return (
    <section id="contacto" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-[#e2560c] p-10 text-center text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_20px_50px_-20px_rgb(242_107_29/0.6)] sm:p-16">
        <div className="glow-blob pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 animate-pulse-slow rounded-full bg-white/25 blur-3xl" />
        <div className="glow-blob pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 animate-float-slow rounded-full bg-[#ffd3b0]/30 blur-3xl" />
        <div className="glow-blob pointer-events-none absolute -right-16 top-1/3 h-60 w-60 animate-float-medium rounded-full bg-[#b23f00]/30 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl font-semibold text-white sm:text-5xl">
            Escríbeme y vemos qué necesita tu negocio
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/85">
            Puede ser la ficha de Google, la web o las dos. Te respondo yo, por
            WhatsApp, y te mando la cotización sin compromiso.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="white" size="lg" withArrow asChild>
              <a href={WHATSAPP_MAPS_URL} target="_blank" rel="noopener noreferrer">
                Arreglar mi ficha de Google
                <ButtonArrow tone="primary" />
              </a>
            </Button>
            <Button variant="dark" size="lg" withArrow asChild>
              <a href={WHATSAPP_WEB_URL} target="_blank" rel="noopener noreferrer">
                Cotizar un sitio web
                <ButtonArrow tone="light" />
              </a>
            </Button>
          </div>
          <a
            href={WHATSAPP_BOTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            ¿Necesitas las dos? Te cotizo la ficha y la web juntas
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
