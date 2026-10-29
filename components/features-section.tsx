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
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_BOTH_URL, WHATSAPP_MAPS_URL, WHATSAPP_WEB_URL } from "@/lib/whatsapp";

// Precio "desde" de cada servicio. El de la web coincide con la Landing WordPress de la calculadora.
const MAPS_PRICE_FROM = 50000; // PENDIENTE: confirmar precio real
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

function MapsProfileDemo({ active }: { active: boolean }) {
  const step = useStepCycle(active, 3, 800, 600, 2000);

  return (
    <div className="flex h-44 flex-col justify-between rounded-lg bg-neutral-900 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Tu negocio</p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-primary text-primary" />
              ))}
            </div>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[9px] transition-all duration-500",
            step >= 3
              ? "border-white/10 text-white/30 line-through opacity-0"
              : "border-red-400/40 text-red-400/80 opacity-100"
          )}
        >
          Ficha duplicada
        </span>
      </div>

      <div className="space-y-1.5 text-[11px]">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-white/40" />
          <span
            className={cn(
              "transition-colors duration-500",
              step >= 1 ? "text-success" : "text-red-400/80"
            )}
          >
            {step >= 1 ? "Abierto · cierra a las 20:00" : "Cerrado"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-white/40" />
          <span
            className={cn(
              "transition-colors duration-500",
              step >= 2 ? "text-white/80" : "text-white/30 line-through"
            )}
          >
            {step >= 2 ? "+56 9 1234 5678" : "+56 32 123 4567"}
          </span>
        </div>
      </div>

      <span className="text-[11px] text-white/50">
        {step >= 3 ? "Ficha ordenada y al día" : "Revisando la ficha..."}
      </span>
    </div>
  );
}

/* ---------------- Demo servicio: sitio web ---------------- */

function WebsiteDemo({ active }: { active: boolean }) {
  const step = useStepCycle(active, 3, 800, 600, 2000);

  return (
    <div className="flex h-44 flex-col rounded-lg bg-neutral-900 p-2.5">
      <div className="mb-2 flex items-center gap-1 border-b border-white/10 pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-2 flex items-center gap-1 text-[9px] text-white/40">
          <Globe className="h-2.5 w-2.5" />
          tunegocio.cl
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div
          className={cn(
            "h-5 rounded bg-primary/40 transition-all duration-500",
            step >= 1 ? "w-full" : "w-0"
          )}
        />
        <div
          className={cn(
            "flex items-center gap-1.5 text-[10px] text-white/60 transition-opacity duration-500",
            step >= 2 ? "opacity-100" : "opacity-0"
          )}
        >
          <Clock className="h-3 w-3 text-white/40" />
          Lunes a sábado · 10:00 a 20:00
        </div>
        <div className="flex-1" />
        <div
          className={cn(
            "flex h-6 items-center justify-center gap-1.5 self-start rounded-full bg-primary px-3 text-[10px] font-medium text-primary-foreground transition-all duration-500",
            step >= 3 ? "scale-100 opacity-100" : "scale-75 opacity-0"
          )}
        >
          <MessageCircle className="h-3 w-3" />
          Escríbenos por WhatsApp
        </div>
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
    Demo: MapsProfileDemo,
  },
  {
    icon: Globe,
    title: "Sitio web",
    priceFrom: WEB_PRICE_FROM,
    description:
      "Páginas simples y rápidas, en WordPress o a medida, que se ven bien en el celular.",
    items: [
      "Desde una landing de una página hasta una tienda",
      "Sistema de reservas si trabajas con hora",
      "Mismo horario y teléfono que tu ficha de Google",
      "Botón directo a tu WhatsApp",
    ],
    cta: "Cotizar mi web",
    href: WHATSAPP_WEB_URL,
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Desde ${service.priceFrom.toLocaleString("es-CL")}
        </span>
      </div>
      <h3 className="mb-1.5 text-xl font-semibold text-neutral-900">{service.title}</h3>
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
        <Button className="group/btn mt-6 w-full" asChild>
          <a href={service.href} target="_blank" rel="noopener noreferrer">
            {service.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </Button>
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
    Demo: EcommerceDemo,
  },
  {
    icon: Calendar,
    title: "Sistemas de Reserva",
    description: "Tus clientes eligen día y hora sin tener que llamarte.",
    Demo: BookingDemo,
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Una sola página con lo importante de tu negocio y un botón directo a tu WhatsApp.",
    Demo: LandingBuildDemo,
  },
  {
    icon: Building2,
    title: "Webs Corporativas",
    description: "Varias páginas: inicio, quiénes son, qué hacen y cómo contactarlos.",
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
      className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mb-1.5 text-lg font-semibold text-neutral-900">
        {feature.title}
      </h3>
      <p className="mb-4 text-sm text-neutral-500">{feature.description}</p>
      <Demo active={active} />
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden rounded-t-[3rem] bg-white px-4 py-24 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.2 0 0 / 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -top-20 right-10 h-64 w-64 animate-float-slow rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 animate-float-medium rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Puedes contratar uno o los dos
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-5xl">
            Dos servicios,{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient">
              eliges el que necesitas
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-500">
            El precio final depende de cómo esté tu ficha o de lo que necesite tu
            web. Te mando la cotización antes de empezar.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mx-auto mb-24 mt-5 flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 text-center sm:flex-row sm:text-left">
          <div className="flex shrink-0 items-center -space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary/15">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary/15">
              <Globe className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-neutral-900">¿Necesitas las dos?</p>
            <p className="text-sm text-neutral-500">
              Te cotizo la ficha y la web juntas, y las dejo con los mismos datos desde el primer día.
            </p>
          </div>
          <Button className="group/btn shrink-0" asChild>
            <a href={WHATSAPP_BOTH_URL} target="_blank" rel="noopener noreferrer">
              Cotizar las dos
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </Button>
        </div>

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h3 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Cuatro tipos de web, según lo que vendes
          </h3>
          <p className="mx-auto mt-3 flex max-w-lg items-center justify-center gap-2 text-sm text-neutral-500">
            <Layers className="h-4 w-4" />
            Todas se pueden hacer en WordPress o a medida
          </p>
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
