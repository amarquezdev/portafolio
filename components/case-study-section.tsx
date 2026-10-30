"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ExternalLink, Globe, Lock, MapPin, Sparkles } from "lucide-react";

import { Glows } from "@/components/glows";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Capturas en public/images/casos/. La de la ficha puede ser más alta que el marco del
// celular: se desplaza sola para mostrarla completa. Si un enlace queda vacío, su botón no se muestra.
const CASE = {
  name: "Studio Clau Miranda",
  summary:
    "Una salon de belleza donde creé el sitio web con sistema de reservas en línea 100% personalizado y optimización de su perfil de Google para potenciar sus numeros. Así se ve hoy.",
  web: {
    image: "/images/casos/studio-clau-web.jpg",
    // Proporción del marco del navegador: debe coincidir con la captura para no recortarla
    aspect: "16 / 10",
    url: "https://studioclaumiranda.cl",
    items: [
      "Sistema de reservas: la clienta elige día y hora",
      "Pensada para verse bien en el celular",
      "Botón directo al WhatsApp del estudio",
    ],
  },
  maps: {
    image: "/images/casos/studio-clau-ficha.jpg",
    url: "",
    items: [
      "Reubicación y detalle de servicios del salón",
      "Fotos actuales del estudio y de los trabajos",
      "QR para pedir reseñas al terminar la atención",
    ],
  },
  // Nota en primera persona (no es una cita de la clienta): explica qué cambió.
  note:
    "Antes, para pedir hora había que llamar al estudio y agendar a mano con muchos errores y perdida de tiempo. Ahora las clientas reservan solas desde la web, a la hora que deseen sin depender de un llamado, y el perfil de Google muestra la información relevante.",
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

// Solo en escritorio: panel con borde y dos filas compartidas con el panel vecino.
const PANEL =
  "lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-y-8 lg:rounded-3xl lg:bg-white lg:p-8 lg:shadow-sm lg:ring-1 lg:ring-black/5";

function WorkList({ title, icon: Icon, items }: { title: string; icon: typeof Globe; items: string[] }) {
  return (
    <div className="mt-6 lg:mt-0">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
        <Icon className="h-4 w-4" />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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
    <section id="caso" className="relative isolate px-4 py-24 sm:px-6 lg:px-8">
      <Glows preset="case" />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className={cn("mx-auto mb-14 max-w-5xl text-center", reveal("[animation-delay:0s]"))}>
          <SectionEyebrow step={5}>Un caso real</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">
            {CASE.name}:{" "}
            <span className="text-primary">
              web y ficha de Google
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">{CASE.summary}</p>
        </div>

        {/* En escritorio cada bloque es un panel; comparten filas (subgrid) para que
            las capturas y las listas queden alineadas a la misma altura. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Sitio web */}
          <div className={cn(PANEL, "lg:col-span-3", reveal("[animation-delay:0.15s]"))}>
            <div className="animate-float-slow lg:self-center">
              <div className="overflow-hidden rounded-2xl bg-neutral-200 p-2.5 pt-0 shadow-xl shadow-black/10 ring-1 ring-black/10">
                <div className="flex items-center gap-1.5 px-1.5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 flex flex-1 items-center gap-1.5 truncate rounded-full bg-white px-3 py-1 text-xs text-muted-foreground ring-1 ring-black/5">
                    <Lock className="h-3 w-3 shrink-0 text-neutral-400" />
                    {CASE.web.url ? CASE.web.url.replace(/^https?:\/\//, "") : "sitio web"}
                  </span>
                </div>
                <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: CASE.web.aspect }}>
                  <Image
                    src={CASE.web.image}
                    alt={`Sitio web de ${CASE.name}`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-[50%_0%]"
                  />
                </div>
              </div>
            </div>
            <WorkList title="Lo que hice en la web" icon={Globe} items={CASE.web.items} />
          </div>

          {/* Ficha de Google */}
          <div className={cn(PANEL, "lg:col-span-2", reveal("[animation-delay:0.3s]"))}>
            <div className="animate-float-medium lg:self-center">
              <div className="mx-auto w-full max-w-[260px] rounded-[2.25rem] bg-neutral-200 p-2.5 shadow-xl shadow-black/10 ring-1 ring-black/10">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-neutral-900">
                  <Image
                    src={CASE.maps.image}
                    alt={`Ficha de Google Maps de ${CASE.name}`}
                    fill
                    sizes="260px"
                    className="animate-screen-pan object-cover object-top"
                  />
                  {/* Isla superior del celular */}
                  <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
                </div>
              </div>
            </div>
            <WorkList title="Lo que hice en la ficha" icon={MapPin} items={CASE.maps.items} />
          </div>
        </div>

        <div
          className={cn(
            "mx-auto mt-14 max-w-3xl rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-6 shadow-sm sm:p-8 lg:mt-12 lg:max-w-none",
            reveal("[animation-delay:0.45s]")
          )}
        >
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-4 w-4" />
            Qué cambió
          </p>
          <p className="max-w-3xl font-display text-lg text-white sm:text-2xl">{CASE.note}</p>

          {(CASE.web.url || CASE.maps.url) && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {CASE.web.url && (
                <Button variant="white" asChild>
                  <a href={CASE.web.url} target="_blank" rel="noopener noreferrer">
                    Ver el sitio
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {CASE.maps.url && (
                <Button variant="white" asChild>
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
