"use client";

import { LayoutTemplate } from "lucide-react";

import { Glows } from "@/components/glows";
import RotatingText from "@/components/RotatingText";
import { Button, ButtonArrow } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { WHATSAPP_DIAGNOSIS_URL } from "@/lib/whatsapp";

const LOCAL_BUSINESSES = [
  "Studio Clau Miranda",
  "Asesoria Legal E Integral C&M",
  "Todo en Vidrio",
];

export function HeroSection() {
  // La animación recorre la mitad de la cinta, así que se repite en múltiplos de 2.
  const businesses = Array.from({ length: 4 }, () => LOCAL_BUSINESSES).flat();

  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center px-4 pt-32 sm:px-6 lg:px-8 pb-16 text-center animate-fade-in-hero">
      <Glows preset="hero" />
      <div className="animate-fade-in-badge opacity-0 [animation-delay:0.1s]">
        <div className="mb-8 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Negocios en todo Chile
        </div>
      </div>

      <h1 className="animate-fade-in-heading opacity-0 [animation-delay:0.25s] max-w-4xl text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
        Que tu negocio se vea bien
        <br />
        en{" "}
        <RotatingText
          texts={["Google Maps", "tu sitio web"]}
          mainClassName="inline-flex items-center justify-center overflow-hidden rounded-2xl bg-primary px-4 py-1 text-primary-foreground align-middle"
          staggerFrom="last"
          staggerDuration={0.025}
          rotationInterval={2500}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
        />
      </h1>

      <p className="animate-fade-in-subheading opacity-0 [animation-delay:0.4s] mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
        Organizo tu ficha de Google y hago sitios web profesionales para tu empresa. Puedes contratar uno o ambos. El fin es llegar a tus clientes y brindar una experiencia satisfactoria y libre de dudas.
      </p>

      <div className="animate-fade-in-buttons opacity-0 [animation-delay:0.55s] mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button size="lg" withArrow asChild>
          <a href={WHATSAPP_DIAGNOSIS_URL} target="_blank" rel="noopener noreferrer">
            Diagnostico gratuito de mi perfil
            <ButtonArrow />
          </a>
        </Button>
        <Button variant="white" size="lg" onClick={() => scrollToSection("#servicios")}>
          <LayoutTemplate className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
          Ver servicios
        </Button>
      </div>

      <div className="animate-fade-in-trust opacity-0 [animation-delay:0.8s] mt-24 w-full max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
          Negocios con los que he trabajado
        </p>

        <div className="relative hidden overflow-hidden sm:block">
          {/* Espacio con padding en cada nombre y no con gap: si no, el bucle salta medio espacio */}
          <div className="flex w-max animate-slide-left will-change-transform">
            {businesses.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 pr-16 text-xl font-semibold text-neutral-400"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden sm:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-slide-left-mobile will-change-transform">
            {businesses.map((name, i) => (
              <span
                key={`m-${name}-${i}`}
                className="shrink-0 pr-10 text-base font-semibold text-neutral-400"
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
