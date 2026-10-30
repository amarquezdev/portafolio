"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Clock,
  Globe,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Glows } from "@/components/glows";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Button, ButtonArrow } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import {
  WHATSAPP_BOTH_URL,
  WHATSAPP_MAPS_URL,
  WHATSAPP_WEB_TYPE_URLS,
  WHATSAPP_WEB_URL,
} from "@/lib/whatsapp";

// Precio "desde" de cada servicio. El de la web es el de una landing en WordPress.
const MAPS_PRICE_FROM = 80000; // PENDIENTE: confirmar precio real
const WEB_PRICE_FROM = 250000;

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
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/** Avanza por `steps` pasos cada `interval` ms y reinicia el ciclo mientras está activo. */
function useStepCycle(active: boolean, steps: number, interval: number, start = 500, hold = 1800) {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!active) return;
    setStep(0);
    const timers = Array.from({ length: steps }, (_, i) =>
      setTimeout(() => setStep(i + 1), start + (i + 1) * interval)
    );
    const reset = setTimeout(
      () => {
        setStep(0);
        setCycle((c) => c + 1);
      },
      start + steps * interval + hold
    );
    return () => [...timers, reset].forEach(clearTimeout);
  }, [active, cycle, steps, interval, start, hold]);

  return step;
}

/* ---------------- Demo servicio: ficha de Google ---------------- */

// Fotos de ejemplo: antes grises y sin imagen, después con color (como fotos actuales)
const PHOTO_TONES = [
  "from-[#f6b38a] to-[#b4532a]",
  "from-[#e9d5c4] to-[#8a6a55]",
  "from-[#fbd0a6] to-[#d9752f]",
];

function MapsProfileDemo({ active }: { active: boolean }) {
  // 1: horario · 2: teléfono · 3: fotos · 4: sin duplicado y con buenas reseñas
  const step = useStepCycle(active, 4, 750, 600, 2200);
  const done = step >= 4;

  return (
    <div className="flex h-56 flex-col gap-3 rounded-lg bg-neutral-900 p-4">
      {/* Encabezado: nombre, valoración y categoría */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">Tu negocio</p>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/50">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3 transition-colors duration-300",
                    i === 0 || done ? "fill-primary text-primary" : "fill-transparent text-white/20"
                  )}
                  style={{ transitionDelay: done ? `${i * 110}ms` : "0ms" }}
                />
              ))}
            </span>
            <span>· Peluquería</span>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 text-[10px] transition-all duration-500",
            done ? "scale-90 border-transparent text-transparent opacity-0" : "border-red-400/40 text-red-400/80"
          )}
        >
          Ficha duplicada
        </span>
      </div>

      {/* Fotos */}
      <div className="grid grid-cols-3 gap-1.5">
        {PHOTO_TONES.map((tone, i) => (
          <div key={tone} className="relative h-10 overflow-hidden rounded-md bg-white/5">
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-opacity duration-700",
                tone,
                step >= 3 ? "opacity-90" : "opacity-0"
              )}
              style={{ transitionDelay: step >= 3 ? `${i * 120}ms` : "0ms" }}
            />
          </div>
        ))}
      </div>

      {/* Datos de la ficha */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 shrink-0 text-white/40" />
          <span className={cn("transition-colors duration-500", step >= 1 ? "text-success" : "text-red-400/80")}>
            {step >= 1 ? "Abierto · cierra a las 20:00" : "Cerrado"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" />
          <span className={cn("transition-colors duration-500", step >= 2 ? "text-white/80" : "text-white/30 line-through")}>
            {step >= 2 ? "+56 9 1234 5678" : "+56 32 123 4567"}
          </span>
        </div>
      </div>

      <span className="mt-auto text-[11px] text-white/50">
        {done ? "Ficha ordenada y al día" : "Revisando la ficha..."}
      </span>
    </div>
  );
}

/* ---------------- Demo servicio: sitio web ---------------- */

function WebsiteDemo({ active }: { active: boolean }) {
  // Pocas piezas y con aire: menú, portada con imagen y botón de WhatsApp
  const step = useStepCycle(active, 4, 600, 500, 2200);
  const show = (n: number) =>
    cn(
      "transition-all duration-500",
      step >= n ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
    );

  return (
    <div className="flex h-56 flex-col rounded-lg bg-neutral-900 p-2.5">
      <div className="mb-3 flex items-center gap-1 border-b border-white/10 pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-2 flex items-center gap-1 text-[9px] text-white/40">
          <Globe className="h-2.5 w-2.5" />
          tunegocio.cl
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-3 px-1">
        {/* Menú */}
        <div className={cn("flex items-center justify-between", show(1))}>
          <span className="h-2.5 w-10 rounded-full bg-white/30" />
          <div className="flex items-center gap-2">
            <span className="h-1 w-5 rounded-full bg-white/20" />
            <span className="h-1 w-5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Portada: texto a la izquierda, imagen a la derecha */}
        <div className="grid flex-1 grid-cols-2 items-center gap-3">
          <div className={cn("flex flex-col gap-1.5", show(2))}>
            <span className="h-3 w-full rounded bg-white/70" />
            <span className="h-3 w-2/3 rounded bg-white/70" />
            <span className="mt-1 h-1 w-5/6 rounded-full bg-white/20" />
            <span className="mt-2 h-4 w-16 rounded-full bg-primary" />
          </div>
          <div className={cn("h-full max-h-28 rounded-md bg-gradient-to-br from-[#f6b38a] to-[#b4532a]", show(3))} />
        </div>

        {/* Botón flotante de WhatsApp */}
        <span
          className={cn(
            "absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-500",
            step >= 4 ? "scale-100 opacity-100" : "scale-50 opacity-0"
          )}
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

/* ---------------- Demo 1: Tienda Online ---------------- */

const PRODUCTS = [
  { name: "Producto A", price: 14990 },
  { name: "Producto B", price: 24990 },
  { name: "Producto C", price: 9990 },
];

function EcommerceDemo({ active }: { active: boolean }) {
  const cartCount = useStepCycle(active, PRODUCTS.length, 800, -100, 2600);
  const total = PRODUCTS.slice(0, cartCount).reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="flex h-40 flex-col justify-between rounded-lg bg-neutral-900 p-3">
      <div className="grid grid-cols-3 gap-2">
        {PRODUCTS.map((product, i) => (
          <div
            key={product.name}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg border py-3 transition-all duration-500",
              i < cartCount
                ? "border-primary/40 bg-primary/10"
                : "border-white/10 bg-white/5"
            )}
          >
            <ShoppingCart
              className={cn(
                "h-3.5 w-3.5 transition-colors",
                i < cartCount ? "text-primary" : "text-white/30"
              )}
            />
            <span className="text-[9px] text-white/50">
              ${product.price.toLocaleString("es-CL")}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/50">Carrito ({cartCount})</span>
        <span className="font-semibold text-white">${total.toLocaleString("es-CL")}</span>
      </div>
    </div>
  );
}

/* ---------------- Demo 2: Sistema de Reservas ---------------- */

function BookingDemo({ active }: { active: boolean }) {
  const booked = useStepCycle(active, 1, 1200, 0, 3000) >= 1;
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <div className="flex h-40 flex-col justify-center rounded-lg bg-neutral-900 p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs text-white/60">
        <Calendar className="h-3.5 w-3.5" />
        Esta semana
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day}
            className={cn(
              "flex h-5 items-center justify-center rounded text-[10px] transition-all duration-500",
              day === 15 && booked
                ? "scale-110 bg-primary font-semibold text-primary-foreground"
                : "bg-white/5 text-white/50"
            )}
          >
            {day}
          </div>
        ))}
      </div>
      <span className="mt-2 text-[11px] text-white/50">
        {booked ? "Reserva confirmada para el día 15" : "Buscando disponibilidad..."}
      </span>
    </div>
  );
}

/* ---------------- Demo 3: Landing Page ---------------- */

function LandingBuildDemo({ active }: { active: boolean }) {
  const step = useStepCycle(active, 4, 550);

  return (
    <div className="flex h-40 flex-col rounded-lg bg-neutral-900 p-2.5">
      <div className="mb-2 flex items-center gap-1 border-b border-white/10 pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-2 h-2 w-16 rounded-full bg-white/10" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <div
          className={cn(
            "h-5 rounded bg-primary/40 transition-all duration-500",
            step >= 1 ? "w-full" : "w-0"
          )}
        />
        <div
          className={cn(
            "h-2.5 rounded bg-white/20 transition-all duration-500",
            step >= 2 ? "w-2/3 opacity-100" : "w-0 opacity-0"
          )}
        />
        <div
          className={cn(
            "flex-1 rounded bg-white/10 transition-opacity duration-500",
            step >= 3 ? "opacity-100" : "opacity-0"
          )}
        />

        <div className="mt-1 flex items-center justify-between">
          <div
            className={cn(
              "flex h-5 items-center gap-1 rounded-full bg-primary px-2 transition-all duration-500",
              step >= 4 ? "scale-100 opacity-100" : "scale-75 opacity-0"
            )}
          >
            <MessageCircle className="h-3 w-3 text-primary-foreground" />
            <span className="h-1.5 w-8 rounded-full bg-primary-foreground/60" />
          </div>
          {step >= 4 && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-primary">
              <Check className="h-3 w-3" />
              Botón a WhatsApp listo
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Demo 4: Web Corporativa ---------------- */

const PAGES = ["Inicio", "Nosotros", "Servicios", "Contacto"];

function SitemapDemo({ active }: { active: boolean }) {
  const connected = useStepCycle(active, PAGES.length, 500, 0, 2300);

  return (
    <div className="flex h-40 flex-col justify-center gap-3 rounded-lg bg-neutral-900 p-3">
      <div className="grid grid-cols-2 gap-2">
        {PAGES.map((page, i) => (
          <div
            key={page}
            className={cn(
              "flex h-9 items-center justify-center rounded-md border text-[10px] transition-all duration-500",
              i < connected
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-white/10 bg-white/5 text-white/40"
            )}
          >
            {page}
          </div>
        ))}
      </div>
      <span className="text-center text-[11px] text-white/50">
        Varias páginas conectadas entre sí
      </span>
    </div>
  );
}

/* ---------------- Servicios principales ---------------- */

const SERVICES = [
  {
    icon: MapPin,
    title: "Perfil de Google Maps",
    priceFrom: MAPS_PRICE_FROM,
    description:
      "Reviso y corrijo tu ficha para que la gente vea los datos correctos cuando te busca.",
    items: [
      "Horario, teléfono, dirección y categoría",
      "Fotos actuales del local y de tu trabajo",
      "Gestión con Google de fichas duplicadas o con nombre antiguo",
      "QR para pedir reseñas en el mesón",
    ],
    cta: "Arreglar mi ficha",
    href: WHATSAPP_MAPS_URL,
    scrollTo: null,
    Demo: MapsProfileDemo,
  },
  {
    icon: Globe,
    title: "Sitio web",
    priceFrom: WEB_PRICE_FROM,
    description:
      "Páginas profesionales y rápidas, en plantilla o a medida, que se ven bien en el celular.",
    items: [
      "Desde una landing de una página hasta una tienda",
      "Sistema de reservas si trabajas con hora",
      "Botón directo a tu WhatsApp",
    ],
    cta: "Ver tipos de web",
    href: null,
    scrollTo: "#tipos-de-web",
    Demo: WebsiteDemo,
  },
] as const;

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);
  const active = inView || hovered;
  const Icon = service.icon;
  const Demo = service.Demo;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Desde ${service.priceFrom.toLocaleString("es-CL")}
        </span>
      </div>
      <h3 className="mb-1.5 text-2xl font-semibold text-foreground">{service.title}</h3>
      <p className="mb-5 text-sm text-neutral-500">{service.description}</p>

      <ul className="mb-6 space-y-2.5">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Demo active={active} />
        {service.scrollTo ? (
          <Button
            size="lg"
            withArrow
            className="mt-6 w-full justify-between pl-6"
            onClick={() => scrollToSection(service.scrollTo)}
          >
            {service.cta}
            <ButtonArrow direction="down" />
          </Button>
        ) : (
          <Button size="lg" withArrow className="mt-6 w-full justify-between pl-6" asChild>
            <a href={service.href} target="_blank" rel="noopener noreferrer">
              {service.cta}
              <ButtonArrow />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Tipos de web ---------------- */

const FEATURES = [
  {
    icon: ShoppingCart,
    title: "Tiendas Online",
    description: "Vendes por internet con pago en línea, carrito y control de stock.",
    cta: "Cotizar este tipo",
    href: WHATSAPP_WEB_TYPE_URLS.ecommerce,
    Demo: EcommerceDemo,
  },
  {
    icon: Calendar,
    title: "Sistemas de Reserva",
    description: "Tus clientes eligen día y hora sin tener que llamarte.",
    cta: "Cotizar este tipo",
    href: WHATSAPP_WEB_TYPE_URLS.booking,
    Demo: BookingDemo,
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Una sola página con lo importante de tu negocio y un botón directo a tu WhatsApp.",
    cta: "Cotizar este tipo",
    href: WHATSAPP_WEB_TYPE_URLS.landing,
    Demo: LandingBuildDemo,
  },
  {
    icon: Building2,
    title: "Webs Corporativas",
    description: "Varias páginas: inicio, quiénes son, qué hacen y cómo contactarlos.",
    cta: "Cotizar este tipo",
    href: WHATSAPP_WEB_TYPE_URLS.corporate,
    Demo: SitemapDemo,
  },
] as const;

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);
  const active = inView || hovered;
  const Icon = feature.icon;
  const Demo = feature.Demo;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mb-1.5 text-lg font-semibold text-foreground">
        {feature.title}
      </h3>
      <p className="mb-4 flex-1 text-sm text-neutral-500">{feature.description}</p>
      <Demo active={active} />
      <Button variant="white" withArrow className="mt-5 w-full justify-between pl-5" asChild>
        <a href={feature.href} target="_blank" rel="noopener noreferrer">
          {feature.cta}
          <ButtonArrow tone="primary" />
        </a>
      </Button>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="servicios"
      className="relative isolate px-4 py-24 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.2 0 0 / 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          // Se desvanece arriba y abajo para no marcar el borde de la sección
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />
      <Glows preset="features" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <SectionEyebrow step={3}>Lo que hago</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">
            Para arreglarlo,{" "}
            <span className="text-primary">hago dos cosas</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Puedes contratar uno o ambos servicios. El precio final depende del estado actual de tu perfil o de lo que necesite tu web.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mb-24 mt-10 flex flex-col items-center gap-4 rounded-3xl bg-primary p-6 text-center text-primary-foreground shadow-sm sm:flex-row sm:p-7 sm:text-left">
          <div className="flex shrink-0 items-center -space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white">
              <Globe className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-display text-lg font-semibold">¿Necesitas las dos?</p>
            <p className="text-sm text-white/85">
              Te cotizo la ficha y la web juntas.
            </p>
          </div>
          <Button variant="white" size="lg" withArrow className="shrink-0" asChild>
            <a href={WHATSAPP_BOTH_URL} target="_blank" rel="noopener noreferrer">
              Cotizar las dos
              <ButtonArrow tone="primary" />
            </a>
          </Button>
        </div>

        <div id="tipos-de-web" className="mx-auto mb-12 max-w-3xl text-center">
          <h3 className="text-2xl font-semibold text-foreground sm:text-4xl">
            ¿Qué tipo de web necesitas?
          </h3>
          <p className="mx-auto mt-3 flex max-w-lg items-center justify-center gap-2 text-sm text-neutral-500">
            <Layers className="h-4 w-4" />
            Todas se pueden hacer en plantilla o a medida
          </p>
          <a
            href={WHATSAPP_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            ¿No sabes cuál te sirve? Escríbeme y lo definimos
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
