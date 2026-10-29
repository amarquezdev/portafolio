"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ExternalLink, Globe, MapPin, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Para cambiar las capturas, reemplaza estos archivos en public/images/casos/
// (o cambia la ruta si usas .png o .jpg). Si un enlace queda vacío, su botón no se muestra.
const CASE = {
  name: "Studio Clau Miranda",
  summary:
    "Le hice el sitio web con reservas en línea y ordené su ficha de Google.",
  web: {
    image: "/images/casos/studio-clau-web.svg",
    url: "",
    items: [
      "Sistema de reservas: la clienta elige día y hora",
      "Pensada para verse bien en el celular",
      "Botón directo al WhatsApp del estudio",
    ],
  },
  maps: {
    image: "/images/casos/studio-clau-maps.svg",
    url: "",
    items: [
      "Horario y teléfono corregidos",
      "Fotos actuales del estudio y de los trabajos",
      "QR para pedir reseñas al terminar la atención",
    ],
  },
  quote: {
    text: "El sistema de reservas nos quitó todas las llamadas para agendar citas. Ahora los clientes reservan solos desde el móvil.",
    author: "Claudia Miranda, fundadora",
  },
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function WorkList({ title, icon: Icon, items }: { title: string; icon: typeof Globe; items: string[] }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
        <Icon className="h-4 w-4" />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudySection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reveal = (delay: string) =>
    cn("opacity-0", inView && "animate-fade-in-up", delay);

  return (
    <section id="caso" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/3 top-20 h-80 w-80 animate-pulse-slow rounded-full bg-primary/10 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className={cn("mx-auto mb-14 max-w-2xl text-center", reveal("[animation-delay:0s]"))}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Caso real
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {CASE.name}:{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              web y ficha de Google
            </span>
          </h2>
          <p className="mt-4 text-white/60">{CASE.summary}</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Sitio web */}
          <div className={cn("lg:col-span-3", reveal("[animation-delay:0.15s]"))}>
            <div className="animate-float-slow">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_-15px] shadow-primary/40 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 flex-1 truncate rounded-full bg-white/5 px-3 py-1 text-xs text-white/40">
                    {CASE.web.url ? CASE.web.url.replace(/^https?:\/\//, "") : "sitio web"}
                  </span>
                </div>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={CASE.web.image}
                    alt={`Sitio web de ${CASE.name}`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <WorkList title="Lo que hice en la web" icon={Globe} items={CASE.web.items} />
          </div>

          {/* Ficha de Google */}
          <div className={cn("lg:col-span-2", reveal("[animation-delay:0.3s]"))}>
            <div className="animate-float-medium">
              <div className="mx-auto w-full max-w-[260px] rounded-[2.25rem] border border-white/15 bg-white/[0.04] p-2.5 shadow-[0_0_40px_-15px] shadow-primary/40 backdrop-blur-sm">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem]">
                  <Image
                    src={CASE.maps.image}
                    alt={`Ficha de Google Maps de ${CASE.name}`}
                    fill
                    sizes="260px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <WorkList title="Lo que hice en la ficha" icon={MapPin} items={CASE.maps.items} />
          </div>
        </div>

        <div
          className={cn(
            "mx-auto mt-14 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8",
            reveal("[animation-delay:0.45s]")
          )}
        >
          <Quote className="mb-3 h-6 w-6 text-primary" />
          <p className="text-base text-white/80 sm:text-lg">{CASE.quote.text}</p>
          <p className="mt-4 text-sm text-white/50">{CASE.quote.author}</p>

          {(CASE.web.url || CASE.maps.url) && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {CASE.web.url && (
                <Button variant="outline" asChild>
                  <a href={CASE.web.url} target="_blank" rel="noopener noreferrer">
                    Ver el sitio
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {CASE.maps.url && (
                <Button variant="outline" asChild>
                  <a href={CASE.maps.url} target="_blank" rel="noopener noreferrer">
                    Ver la ficha en Google Maps
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
