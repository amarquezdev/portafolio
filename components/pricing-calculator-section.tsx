"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { evaluate } from "mathjs";
import { Clock, DollarSign, Layers } from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type Approach = "wordpress" | "custom";
type SiteType = "landing" | "corporate" | "booking" | "ecommerce";

const APPROACHES: { value: Approach; label: string; hint: string }[] = [
  { value: "wordpress", label: "WordPress", hint: "Más rápido y económico" },
  { value: "custom", label: "A Medida", hint: "Máxima flexibilidad" },
];

const SITE_TYPES: { value: SiteType; label: string }[] = [
  { value: "landing", label: "Landing Page" },
  { value: "corporate", label: "Web Corporativa" },
  { value: "booking", label: "Sistema de Reservas" },
  { value: "ecommerce", label: "Tienda Online" },
];

const BASE_PRICE: Record<Approach, Record<SiteType, number>> = {
  wordpress: { landing: 180000, corporate: 350000, booking: 450000, ecommerce: 600000 },
  custom: { landing: 350000, corporate: 650000, booking: 850000, ecommerce: 1200000 },
};

const BASE_WEEKS: Record<Approach, Record<SiteType, number>> = {
  wordpress: { landing: 1, corporate: 2, booking: 2, ecommerce: 3 },
  custom: { landing: 2, corporate: 3, booking: 4, ecommerce: 5 },
};

const PAGE_RATE: Record<Approach, number> = { wordpress: 25000, custom: 50000 };
const INTEGRATION_RATE: Record<Approach, number> = { wordpress: 40000, custom: 80000 };

const MAX_PRICE_SCALE = 2000000;
const CIRCLE_CIRCUMFERENCE = 283;

export function PricingCalculatorSection() {
  const [approach, setApproach] = useState<Approach>("wordpress");
  const [siteType, setSiteType] = useState<SiteType>("corporate");
  const [extraPages, setExtraPages] = useState(2);
  const [extraIntegrations, setExtraIntegrations] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { estimatedPrice, estimatedWeeks, offset } = useMemo(() => {
    const price = evaluate("base + pages * pageRate + integrations * intRate", {
      base: BASE_PRICE[approach][siteType],
      pages: extraPages,
      pageRate: PAGE_RATE[approach],
      integrations: extraIntegrations,
      intRate: INTEGRATION_RATE[approach],
    }) as number;

    const weeks = evaluate("base + pages * 0.15 + integrations * 0.3", {
      base: BASE_WEEKS[approach][siteType],
      pages: extraPages,
      integrations: extraIntegrations,
    }) as number;

    const cappedPrice = Math.min(price, MAX_PRICE_SCALE);
    const progress = cappedPrice / MAX_PRICE_SCALE;
    const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

    return {
      estimatedPrice: Math.round(price / 1000) * 1000,
      estimatedWeeks: Math.max(1, Math.round(weeks)),
      offset: dashOffset,
    };
  }, [approach, siteType, extraPages, extraIntegrations]);

  return (
    <section id="precios" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Calcula el presupuesto de tu proyecto
          </h2>
          <p className="mt-4 text-white/60">
            Elige el enfoque, el tipo de web y ajusta los extras para ver una
            estimación al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-3 text-sm text-white/70">Enfoque</p>
              <div className="grid grid-cols-2 gap-3">
                {APPROACHES.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setApproach(option.value)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all duration-300",
                      approach === option.value
                        ? "border-primary/50 bg-primary/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    )}
                  >
                    <span
                      className={cn(
                        "block text-sm font-semibold",
                        approach === option.value ? "text-primary" : "text-white"
                      )}
                    >
                      {option.label}
                    </span>
                    <span className="block text-xs text-white/50">{option.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm text-white/70">Tipo de sitio</p>
              <div className="grid grid-cols-2 gap-2">
                {SITE_TYPES.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSiteType(option.value)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-300",
                      siteType === option.value
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm text-white/70">
                <span>Páginas o secciones adicionales</span>
                <span className="font-semibold text-white">{extraPages}</span>
              </div>
              <Slider value={extraPages} onValueChange={setExtraPages} min={1} max={10} step={1} />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm text-white/70">
                <span>Integraciones extra (pagos, idiomas, CRM...)</span>
                <span className="font-semibold text-white">{extraIntegrations}</span>
              </div>
              <Slider
                value={extraIntegrations}
                onValueChange={setExtraIntegrations}
                min={0}
                max={5}
                step={1}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <div className="relative flex h-52 w-52 items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-white/10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCLE_CIRCUMFERENCE}
                  strokeDashoffset={inView ? offset : CIRCLE_CIRCUMFERENCE}
                  className="text-primary transition-[stroke-dashoffset] duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-white">
                  ${estimatedPrice.toLocaleString("es-CL")}
                </span>
                <span className="text-xs text-white/50">presupuesto estimado</span>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
              <div className="flex flex-col items-center rounded-xl bg-white/5 p-4 text-center">
                <Clock className="mb-2 h-5 w-5 text-primary" />
                <span className="text-lg font-semibold text-white">{estimatedWeeks} sem.</span>
                <span className="text-xs text-white/50">plazo estimado</span>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-white/5 p-4 text-center">
                <Layers className="mb-2 h-5 w-5 text-primary" />
                <span className="text-lg font-semibold text-white">
                  {SITE_TYPES.find((s) => s.value === siteType)?.label}
                </span>
                <span className="text-xs text-white/50">
                  {approach === "wordpress" ? "WordPress" : "A medida"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/40">
              <DollarSign className="h-3.5 w-3.5" />
              Estimación orientativa, el presupuesto final se ajusta a tu proyecto
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
