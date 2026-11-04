"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Globe, LayoutTemplate, Lock, MessageCircle, Phone, Search, Star } from "lucide-react";

import { CityMap } from "@/components/hero/city-map";
import { Button, ButtonArrow } from "@/components/ui/button";
import { PhoneMockup, ScreenScroll } from "@/components/ui/phone-mockup";
import { cn, scrollToSection } from "@/lib/utils";
import { WHATSAPP_DIAGNOSIS_URL } from "@/lib/whatsapp";

// Línea fija en vez de cinta animada: con pocos nombres la cinta se repetía y lucía vacía.
// Cuando haya 6 u 8 clientes (ideal con logos) vale la pena volver a una cinta.
const LOCAL_BUSINESSES = ["Studio Clau Miranda", "Todo en Vidrio", "Asesoría C&M"];

const QUERY = "peluquería cerca de mí";

// Datos reales del caso (capturas en public/images/casos/)
const PROFILE = { name: "Studio Clau Miranda", rating: "5.0", reviews: 64, category: "Peluquería" };
const SITE = "studioclaumiranda.cl";

/**
 * La escena cuenta los dos servicios sin texto: alguien busca, caen los pines, se enciende tu
 * negocio con la ruta y aparece tu perfil ordenado; luego toca "Sitio web" y llega a tu web.
 * Pasos: 0 escribe, 1 pines y resultados, 2 ruta y tu negocio destacado, 3 se abre el perfil,
 * 4 toca "Sitio web", 5 web en el celular.
 */
function useSearchStory(active: boolean) {
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(QUERY.length);
      setStep(5);
      return;
    }
    if (!active) return;
    setTyped(0);
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = cycle === 0 ? 1400 : 600; // la primera vez espera a que se dibuje el mapa
    for (let i = 1; i <= QUERY.length; i++) {
      timers.push(setTimeout(() => setTyped(i), start + i * 55));
    }
    const typedAt = start + QUERY.length * 55;
    timers.push(setTimeout(() => setStep(1), typedAt + 300));
    timers.push(setTimeout(() => setStep(2), typedAt + 1300));
    timers.push(setTimeout(() => setStep(3), typedAt + 2200));
    timers.push(setTimeout(() => setStep(4), typedAt + 4400));
    timers.push(setTimeout(() => setStep(5), typedAt + 5100));
    timers.push(setTimeout(() => setCycle((c) => c + 1), typedAt + 10600));
    return () => timers.forEach(clearTimeout);
  }, [cycle, active]);

  return { typed, step };
}

/** Barra de búsqueda que, al llegar a la web, se convierte en la barra de dirección. */
function SearchBar({ typed, onSite }: { typed: number; onSite: boolean }) {
  return (
    <div className="border border-white/10 bg-[#1a1816]/95 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.6)] relative flex h-12 items-center overflow-hidden rounded-full text-sm">
      <div
        className={cn(
          "absolute inset-0 flex items-center gap-3 pl-4 pr-5 transition-all duration-500",
          onSite ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate text-foreground">
          {QUERY.slice(0, typed)}
          <span className="animate-caret ml-px inline-block h-4 w-px translate-y-0.5 bg-primary" />
        </span>
      </div>
      <div
        className={cn(
          "absolute inset-0 flex items-center gap-3 pl-4 pr-5 transition-all duration-500",
          onSite ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <Lock className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate font-mono text-[13px] text-foreground">{SITE}</span>
      </div>
    </div>
  );
}

function ProfileCard({ show, tapping }: { show: boolean; tapping: boolean }) {
  return (
    <div
      className={cn(
        "border border-white/10 bg-[#1a1816]/95 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.6)] w-[17.5rem] rounded-2xl p-4 transition-all duration-500 ease-out",
        show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"
      )}
    >
      <p className="font-display text-base font-semibold leading-tight text-foreground">{PROFILE.name}</p>
      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="text-foreground">{PROFILE.rating}</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3 w-3 fill-primary text-primary transition-opacity duration-300"
              style={{ transitionDelay: show ? `${300 + i * 90}ms` : "0ms", opacity: show ? 1 : 0.2 }}
            />
          ))}
        </span>
        <span>({PROFILE.reviews})</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {PROFILE.category} · <span className="text-success">Abierto</span>
      </p>
      <div className="mt-3 flex gap-1.5 whitespace-nowrap text-[11px]">
        <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-foreground ring-1 ring-white/10">
          <MessageCircle className="h-3 w-3" />
          WhatsApp
        </span>
        <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-foreground ring-1 ring-white/10">
          <Phone className="h-3 w-3" />
          Llamar
        </span>
        {/* El botón que la escena toca para pasar a la web */}
        <span
          className={cn(
            "relative flex items-center gap-1 rounded-full px-2.5 py-1 font-medium transition-all duration-300",
            tapping ? "scale-95 bg-primary text-primary-foreground" : "bg-primary/15 text-primary ring-1 ring-primary/40"
          )}
        >
          {tapping && <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />}
          <Globe className="h-3 w-3" />
          Sitio web
        </span>
      </div>
    </div>
  );
}

// Pines del mini mapa del celular (en %); el primero es tu negocio
// (todos bajo la barra de búsqueda, que ocupa la franja superior)
const MINI_PINS = [
  { x: 58, y: 58 },
  { x: 26, y: 46 },
  { x: 80, y: 44 },
  { x: 36, y: 84 },
  { x: 84, y: 80 },
];

/**
 * Primera pantalla del celular: resultados de la búsqueda en Maps, en claro como la app real.
 * Tu negocio aparece primero y se destaca cuando se enciende en el mapa grande.
 */
function SearchResultsScreen({ typed, step }: { typed: number; step: number }) {
  const highlight = step >= 2;
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f4f4f2] text-[#1f1f1f]">
      {/* Mini mapa con calles y pines */}
      <div
        className="relative h-[46%] shrink-0 bg-[#e6e8e3]"
        style={{
          backgroundImage:
            "linear-gradient(104deg, transparent 47%, #fff 47%, #fff 53%, transparent 53%), linear-gradient(14deg, transparent 48%, #fff 48%, #fff 51%, transparent 51%), linear-gradient(to right, rgb(255 255 255/0.7) 2px, transparent 2px), linear-gradient(to bottom, rgb(255 255 255/0.7) 2px, transparent 2px)",
          backgroundSize: "100% 100%, 100% 100%, 34px 34px, 34px 34px",
        }}
      >
        <div className="absolute inset-x-3 top-9 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] shadow-md">
          <Search className="h-3 w-3 shrink-0 text-[#5f6368]" />
          <span className="truncate">{QUERY.slice(0, typed)}</span>
        </div>
        {MINI_PINS.map((pin, i) => {
          const mine = i === 0;
          return (
            <span
              key={i}
              className={cn(
                "absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-full rounded-full rounded-br-none border-2 border-white shadow transition-all duration-500 [rotate:45deg]",
                mine && highlight ? "scale-150 bg-primary" : "bg-[#ea4335]",
                step >= 1 ? "opacity-100" : "translate-y-[-150%] opacity-0"
              )}
              style={{ left: `${pin.x}%`, top: `${pin.y}%`, transitionDelay: step >= 1 ? `${i * 80}ms` : "0ms" }}
            />
          );
        })}
      </div>

      {/* Lista de resultados: tu negocio y otros (sin nombre) */}
      <div className="flex-1 space-y-1.5 overflow-hidden px-2.5 pt-2.5">
        {[0, 1, 2].map((i) => {
          const mine = i === 0;
          return (
            <div
              key={i}
              className={cn(
                "rounded-xl bg-white p-2.5 shadow-sm transition-all duration-500",
                step >= 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                mine && highlight && "ring-2 ring-primary"
              )}
              style={{ transitionDelay: step >= 1 ? `${200 + i * 120}ms` : "0ms" }}
            >
              {mine ? (
                <>
                  <p className="truncate text-[11px] font-semibold">{PROFILE.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[9px] text-[#5f6368]">
                    {PROFILE.rating}
                    <span className="text-[#fbbc04]">★★★★★</span>({PROFILE.reviews})
                  </p>
                  <p className="text-[9px] text-[#5f6368]">
                    {PROFILE.category} · <span className="text-[#188038]">Abierto</span>
                  </p>
                </>
              ) : (
                <>
                  <span className="block h-2 w-3/5 rounded-full bg-[#dadce0]" />
                  <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-[#e8eaed]" />
                  <span className="mt-1 block h-1.5 w-1/3 rounded-full bg-[#e8eaed]" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Etiqueta junto al celular: dice cuál de los dos servicios se está viendo. */
function ServiceTag({ onSite }: { onSite: boolean }) {
  return (
    <div className="border border-white/10 bg-[#1a1816]/95 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.6)] flex h-8 items-center overflow-hidden whitespace-nowrap rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.12em]">
      <span className="text-primary">{onSite ? "02" : "01"}</span>
      <span className="mx-2 h-3 w-px bg-white/20" />
      <span key={onSite ? "web" : "maps"} className="animate-fade-in-up text-foreground">
        {onSite ? "Sitio web" : "Perfil de Google Maps"}
      </span>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const { typed, step } = useSearchStory(inView);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // El mouse mueve el mapa y ladea el celular (en celular solo actúa el scroll)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });
  const mapX = useTransform(smx, (v) => v * -14);
  const mapY = useTransform(smy, (v) => v * -14);
  const tiltY = useTransform(smx, (v) => -8 + v * 10);
  const tiltX = useTransform(smy, (v) => 4 - v * 8);

  // Al bajar, el celular se inclina hacia atrás y se aleja
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, 14]);

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden px-4 pb-36 pt-28 sm:px-6 lg:pb-20 lg:min-h-screen lg:px-8 lg:pt-32"
    >
      {/* Mapa de fondo, con los bordes fundidos al negro. En celular va solo detrás de la
          escena (abajo), para que no compita con el texto ni se agrande de más. */}
      {/* La máscara va en una capa quieta y el movimiento en la interior, para no recalcularla */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[900px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_80%,transparent)] lg:inset-0 lg:h-auto lg:[mask-image:radial-gradient(ellipse_75%_70%_at_55%_45%,black_35%,transparent_100%)]">
        <motion.div style={{ x: mapX, y: mapY }} className="absolute -inset-4 will-change-transform">
          <CityMap step={step} />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <div>
          <div className="animate-fade-in-badge mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground opacity-0 [animation-delay:0.1s]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Sitios web + Google Maps · Chile
          </div>

          <h1 className="animate-fade-in-heading text-[3.4rem] font-semibold leading-[0.92] text-foreground opacity-0 [animation-delay:0.25s] sm:text-7xl lg:text-[5.6rem]">
            Que te encuentren.
            <br />
            Que te <span className="text-primary">elijan.</span>
          </h1>

          <p className="animate-fade-in-subheading mt-7 max-w-md text-base text-muted-foreground opacity-0 [animation-delay:0.4s] sm:text-lg">
            Hago sitios web y ordeno tu perfil de Google Maps para que quien te busca, te encuentre y
            te escriba. Puedes contratar uno o ambos.
          </p>

          <div className="animate-fade-in-buttons mt-9 flex flex-col gap-3 opacity-0 [animation-delay:0.55s] sm:flex-row">
            <Button size="lg" withArrow asChild>
              <a href={WHATSAPP_DIAGNOSIS_URL} target="_blank" rel="noopener noreferrer">
                Diagnóstico gratuito de mi perfil
                <ButtonArrow />
              </a>
            </Button>
            <Button variant="white" size="lg" onClick={() => scrollToSection("#servicios")}>
              <LayoutTemplate className="h-4 w-4" />
              Ver servicios
            </Button>
          </div>

          <div className="animate-fade-in-trust mt-10 flex flex-col gap-1.5 opacity-0 [animation-delay:0.8s]">
            <div className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {LOCAL_BUSINESSES.slice(0, -1).join(", ")} y {LOCAL_BUSINESSES.at(-1)} ya trabajan conmigo
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("#caso")}
              className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Ver el caso real
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Escena: búsqueda, celular con el perfil real y tarjeta del perfil */}
        <div className="animate-fade-in-hero relative mx-auto w-full max-w-[22rem] opacity-0 [animation-delay:0.6s] [perspective:1400px] lg:max-w-none">
          <div className="relative z-20 mx-auto mb-5 w-[85%] max-w-xs lg:absolute lg:-left-8 lg:-top-16 lg:mb-0 lg:w-72">
            <SearchBar typed={typed} onSite={step >= 5} />
          </div>

          <motion.div
            style={{ rotateY: tiltY, rotateX: tiltX, y: phoneY, rotateZ: phoneRotate }}
            className="relative mx-auto w-[15.5rem] [transform-style:preserve-3d] sm:w-[17rem]"
          >
            <PhoneMockup className="shadow-[0_60px_120px_-30px_rgb(0_0_0/0.95),0_0_80px_-20px_rgb(255_107_44/0.25)]">
              <SearchResultsScreen typed={typed} step={step} />
              {/* El perfil sube desde abajo, como al tocar el resultado; el recorrido parte de cero cada vez */}
              <ScreenScroll
                src="/images/casos/studio-clau-ficha.jpg"
                alt={`Perfil de Google Maps de ${PROFILE.name}`}
                width={1215}
                height={2562}
                priority
                sizes="272px"
                scrolling={step >= 3 && step < 5}
                className={cn(
                  "transition-[transform,opacity] duration-700",
                  step < 3 && "translate-y-full",
                  step >= 5 && "-translate-x-1/4 opacity-0"
                )}
              />
              {/* La web entra deslizándose desde la derecha, como al abrir un enlace */}
              <ScreenScroll
                src="/images/casos/studio-clau-web-movil.jpg"
                alt={`Sitio web de ${PROFILE.name} en el celular`}
                width={720}
                height={3120}
                sizes="272px"
                scrolling={step >= 5}
                className={cn(
                  "transition-[transform,opacity] duration-700",
                  step >= 5 ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                )}
              />
            </PhoneMockup>

            {/* Bajo el celular, sin tapar la pantalla */}
            <div className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 lg:-right-6 lg:left-auto lg:translate-x-0">
              <ServiceTag onSite={step >= 5} />
            </div>
          </motion.div>

          <div className="absolute bottom-28 left-1/2 z-20 -translate-x-1/2 lg:-left-24 lg:bottom-10 lg:translate-x-0">
            <ProfileCard show={step === 3 || step === 4} tapping={step === 4} />
          </div>
        </div>
      </div>
    </section>
  );
}
