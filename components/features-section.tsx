"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Calendar,
  Layers,
  Rocket,
  ShoppingCart,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

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

/* ---------------- Demo 1: Tienda Online ---------------- */

const PRODUCTS = [
  { name: "Producto A", price: 24 },
  { name: "Producto B", price: 39 },
  { name: "Producto C", price: 18 },
];

function EcommerceDemo({ active }: { active: boolean }) {
  const [cartCount, setCartCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!active) return;
    setCartCount(0);
    const timers = PRODUCTS.map((_, i) =>
      setTimeout(() => setCartCount((c) => c + 1), 700 + i * 800)
    );
    const reset = setTimeout(
      () => {
        setCartCount(0);
        setCycle((c) => c + 1);
      },
      700 + PRODUCTS.length * 800 + 1800
    );
    return () => [...timers, reset].forEach(clearTimeout);
  }, [active, cycle]);

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
            <span className="text-[9px] text-white/50">&euro;{product.price}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/50">Carrito ({cartCount})</span>
        <span className="font-semibold text-white">&euro;{total}</span>
      </div>
    </div>
  );
}

/* ---------------- Demo 2: Sistema de Reservas ---------------- */

function BookingDemo({ active }: { active: boolean }) {
  const [booked, setBooked] = useState(false);
  const [cycle, setCycle] = useState(0);
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  useEffect(() => {
    if (!active) return;
    setBooked(false);
    const t = setTimeout(() => setBooked(true), 1200);
    const reset = setTimeout(() => {
      setBooked(false);
      setCycle((c) => c + 1);
    }, 4200);
    return () => {
      clearTimeout(t);
      clearTimeout(reset);
    };
  }, [active, cycle]);

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
        {booked ? "Reserva confirmada para el día 15" : "Buscando hueco disponible..."}
      </span>
    </div>
  );
}

/* ---------------- Demo 3: Landing Page ---------------- */

function LandingBuildDemo({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [conversion, setConversion] = useState(0);

  useEffect(() => {
    if (!active) return;
    setStep(0);
    const timers = [1, 2, 3, 4].map((s) => setTimeout(() => setStep(s), 500 + s * 550));
    const reset = setTimeout(
      () => {
        setStep(0);
        setCycle((c) => c + 1);
      },
      500 + 4 * 550 + 1800
    );
    return () => [...timers, reset].forEach(clearTimeout);
  }, [active, cycle]);

  useEffect(() => {
    if (step < 4) {
      setConversion(0);
      return;
    }
    let raf: number;
    let start: number | null = null;
    const duration = 700;
    function tick(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setConversion(Math.round(progress * 32));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);

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
              "h-5 w-16 rounded-full bg-primary transition-all duration-500",
              step >= 4 ? "scale-100 opacity-100" : "scale-75 opacity-0"
            )}
          />
          {step >= 4 && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-primary">
              <TrendingUp className="h-3 w-3" />+{conversion}% conversión
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
  const [connected, setConnected] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!active) return;
    setConnected(0);
    const timers = PAGES.map((_, i) =>
      setTimeout(() => setConnected((c) => c + 1), 500 + i * 500)
    );
    const reset = setTimeout(
      () => {
        setConnected(0);
        setCycle((c) => c + 1);
      },
      500 + PAGES.length * 500 + 1800
    );
    return () => [...timers, reset].forEach(clearTimeout);
  }, [active, cycle]);

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
        Estructura multipágina conectada
      </span>
    </div>
  );
}

/* ---------------- Feature config ---------------- */

const FEATURES = [
  {
    icon: ShoppingCart,
    title: "Tiendas Online",
    description:
      "Vende tus productos 24/7 con pasarela de pago, gestión de stock y carrito integrado.",
    Demo: EcommerceDemo,
  },
  {
    icon: Calendar,
    title: "Sistemas de Reserva",
    description:
      "Tus clientes reservan citas o mesas online sin llamadas ni idas y venidas.",
    Demo: BookingDemo,
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Una sola página enfocada 100% en convertir visitas en clientes o leads.",
    Demo: LandingBuildDemo,
  },
  {
    icon: Building2,
    title: "Webs Corporativas",
    description:
      "Sitios multipágina con Inicio, Nosotros, Servicios y Contacto para dar una imagen profesional.",
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
            Sea cual sea tu negocio, tenemos la web adecuada
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-5xl">
            Cuatro formas de{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient">
              hacer crecer tu negocio
            </span>
          </h2>
          <p className="mx-auto mt-4 flex max-w-lg items-center justify-center gap-2 text-sm text-neutral-500">
            <Layers className="h-4 w-4" />
            Disponibles en WordPress a medida o desarrollo 100% personalizado
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
