"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ExternalLink, Globe, Lock, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { PhoneMockup, ScreenScroll } from "@/components/ui/phone-mockup";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-column";
import { cn } from "@/lib/utils";

// Capturas en public/images/casos/. La del perfil puede ser más alta que el marco del
// celular: se desplaza sola para mostrarla completa. Si un enlace queda vacío, su botón no se muestra.
const CASE = {
  name: "Studio Clau Miranda",
  summary:
    "Studio Clau Miranda, un salón de belleza: le hice la web con reservas en línea y ordené su perfil de Google Maps. Así se ve hoy.",
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
};

// Reseñas de otros negocios, debajo del caso. Para sumar una, basta con agregarla aquí:
// se reparten solas entre las columnas animadas.
const TESTIMONIALS: Testimonial[] = [
  {
    text: "Nuestra web anterior era de 2015. Con Macno tenemos una tienda online que por fin vende algo por su cuenta.",
    name: "Raul Baca",
    role: "Dueño, Todo en Vidrio",
    initials: "RB",
  },
  {
    text: "Nos hicieron una web corporativa completa, con todas las secciones que necesitábamos. Se nota que entendieron el negocio.",
    name: "Marcia Perez",
    role: "Dueña, Asesoria Legal E Integral C&M",
    initials: "MP",
  },
];

const MAX_COLUMNS = 3;
const MASK = "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]";

/** Reparte las reseñas en columnas de forma alternada (1ª, 2ª, 3ª, 1ª...). */
function toColumns(items: Testimonial[]) {
  const count = Math.min(MAX_COLUMNS, items.length);
  return Array.from({ length: count }, (_, col) => items.filter((_, i) => i % count === col));
}

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
  "lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-y-8 lg:rounded-3xl lg:bg-card lg:p-8 lg:ring-1 lg:ring-white/[0.07]";

function WorkList({ title, icon: Icon, items }: { title: string; icon: typeof Globe; items: string[] }) {
  return (
    <div className="mt-6 lg:mt-0">
      <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
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
    <section id="caso" className="relative isolate px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <SectionHeading
          title={
            <>
              Un caso <span className="text-primary">real</span>
            </>
          }
        >
          <p>{CASE.summary}</p>
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
                    Ver el perfil en Google Maps
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </SectionHeading>

        {/* En escritorio cada bloque es un panel; comparten filas (subgrid) para que
            las capturas y las listas queden alineadas a la misma altura. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Sitio web */}
          <div className={cn(PANEL, "lg:col-span-3", reveal("[animation-delay:0.15s]"))}>
            <div className="animate-float-slow lg:self-center">
              <div className="overflow-hidden rounded-2xl bg-secondary p-2.5 pt-0 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/10">
                <div className="flex items-center gap-1.5 px-1.5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 flex flex-1 items-center gap-1.5 truncate rounded-full bg-black/40 px-3 py-1 font-mono text-xs text-muted-foreground ring-1 ring-white/5">
                    <Lock className="h-3 w-3 shrink-0 text-primary" />
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

          {/* Perfil de Google Maps */}
          <div className={cn(PANEL, "lg:col-span-2", reveal("[animation-delay:0.3s]"))}>
            <div className="animate-float-medium lg:self-center">
              <PhoneMockup className="mx-auto w-full max-w-[240px]">
                <ScreenScroll
                  src={CASE.maps.image}
                  alt={`Perfil de Google Maps de ${CASE.name}`}
                  width={1215}
                  height={2562}
                  sizes="240px"
                />
              </PhoneMockup>
            </div>
            <WorkList title="Lo que hice en el perfil" icon={MapPin} items={CASE.maps.items} />
          </div>
        </div>

        <TestimonialsWall />
      </div>
    </section>
  );
}

function TestimonialsWall() {
  const columns = toColumns(TESTIMONIALS);
  // Con una reseña por columna basta una altura baja; con más, la columna se alarga
  const tall = columns.some((col) => col.length > 1);

  return (
    <div className="mt-10 sm:mt-14">
      <p className="mb-6 text-sm font-medium text-muted-foreground">
        Lo que dicen otros negocios
      </p>

      {/* Celular y tablet: una columna con todas las reseñas */}
      <div className={cn("mx-auto h-[380px] max-w-xl lg:hidden", MASK)}>
        <TestimonialsColumn testimonials={TESTIMONIALS} duration={TESTIMONIALS.length * 7} />
      </div>

      {/* Escritorio: hasta tres columnas, cada una a su propio ritmo */}
      <div
        className={cn("hidden gap-6 lg:grid", MASK)}
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((col, i) => (
          <div key={i} className={tall ? "h-[420px]" : "h-[200px]"}>
            <TestimonialsColumn testimonials={col} duration={col.length * 10 + i} />
          </div>
        ))}
      </div>
    </div>
  );
}
