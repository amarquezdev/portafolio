"use client";

import { ArrowRight, LayoutTemplate } from "lucide-react";

import RotatingText from "@/components/RotatingText";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { WHATSAPP_BUDGET_URL } from "@/lib/whatsapp";

const LOCAL_BUSINESSES = [
  "Studio Clau Miranda",
  "Asesoria Legal E Integral C&M",
  "Todo en Vidrio",
  "Gimnasio PowerFit",
  "Ferretería Martínez",
  "Panadería El Trigal",
];

export function HeroSection() {
  const businesses = [...LOCAL_BUSINESSES, ...LOCAL_BUSINESSES];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-16 text-center animate-fade-in-hero">
      <div className="animate-fade-in-badge opacity-0 [animation-delay:0.1s]">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Diseño Web para Negocios Locales
        </div>
      </div>

      <h1 className="animate-fade-in-heading opacity-0 [animation-delay:0.25s] max-w-4xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
        Tu negocio necesita
        <br />
        una web que{" "}
        <RotatingText
          texts={["Vende", "Reserva", "Convierte", "Crece", "Destaca"]}
          mainClassName="inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary px-3 py-1 text-primary-foreground align-middle"
          staggerFrom="last"
          staggerDuration={0.025}
          rotationInterval={2000}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
        />
      </h1>

      <p className="animate-fade-in-subheading opacity-0 [animation-delay:0.4s] mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
        Diseñamos y desarrollamos sitios web para pequeños y medianos
        negocios: desde plantillas WordPress listas para lanzar hasta
        desarrollos 100% a medida. Tiendas online, sistemas de reserva,
        landing pages y webs corporativas.
      </p>

      <div className="animate-fade-in-buttons opacity-0 [animation-delay:0.55s] mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button variant="white" size="lg" className="group" asChild>
          <a href={WHATSAPP_BUDGET_URL} target="_blank" rel="noopener noreferrer">
            Solicitar Presupuesto
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="group"
          onClick={() => scrollToSection("#servicios")}
        >
          <LayoutTemplate className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          Ver Servicios
        </Button>
      </div>

      <div className="animate-fade-in-trust opacity-0 [animation-delay:0.8s] mt-24 w-full max-w-5xl">
        <p className="mb-6 text-xs uppercase tracking-widest text-white/40">
          Diseñamos webs para negocios como el tuyo
        </p>

        <div className="relative hidden overflow-hidden sm:block">
          <div className="flex w-max animate-slide-left gap-16">
            {businesses.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-xl font-semibold text-white/30"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden sm:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black to-transparent" />
          <div className="flex w-max animate-slide-left-mobile gap-10">
            {businesses.map((name, i) => (
              <span
                key={`m-${name}-${i}`}
                className="text-base font-semibold text-white/30"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
