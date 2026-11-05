"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  Coffee,
  Globe,
  LayoutTemplate,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Scissors,
  Search,
  Smile,
  Star,
  type LucideIcon,
} from "lucide-react";

import { CityMap } from "@/components/hero/city-map";
import { Button, ButtonArrow } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import { WHATSAPP_DIAGNOSIS_URL } from "@/lib/whatsapp";

// Línea fija en vez de cinta animada: con pocos nombres la cinta se repetía y lucía vacía.
// Cuando haya 6 u 8 clientes (ideal con logos) vale la pena volver a una cinta.
const LOCAL_BUSINESSES = ["Studio Clau Miranda", "Todo en Vidrio", "Asesoría C&M"];

/**
 * Rubros de ejemplo que se turnan en cada vuelta de la escena, para que cualquier visitante se
 * vea reflejado. Son ilustrativos (el caso real va más abajo): cada uno trae su búsqueda, los
 * datos del perfil y el estilo de su web, distinto en cada rubro.
 */
type Business = {
  query: string;
  name: string;
  category: string;
  rating: string;
  reviews: number;
  closes: string;
  icon: LucideIcon;
  /** Degradados de las tres "fotos" del perfil */
  tiles: [string, string, string];
  site: {
    bg: string;
    fg: string;
    accent: string;
    accentFg: string;
    art: string;
    headline: [string, string];
    cta: string;
    services: [string, string, string];
  };
};

const BUSINESSES: Business[] = [
  {
    query: "dentista cerca de mí",
    name: "Tu consulta dental",
    category: "Dentista",
    rating: "5.0",
    reviews: 86,
    closes: "Cierra a las 18:30",
    icon: Smile,
    tiles: ["from-[#cfeeea] to-[#2a9d8f]", "from-[#e8f6f4] to-[#7cc4ba]", "from-[#b7e2dc] to-[#1f6f66]"],
    site: {
      bg: "#f3f8f8",
      fg: "#10302f",
      accent: "#2a9d8f",
      accentFg: "#ffffff",
      art: "from-[#d6f0ec] to-[#3aa597]",
      headline: ["Tu sonrisa,", "en buenas manos"],
      cta: "Agendar",
      services: ["Limpieza", "Ortodoncia", "Urgencias"],
    },
  },
  {
    query: "cafetería cerca de mí",
    name: "Tu cafetería",
    category: "Cafetería",
    rating: "4.9",
    reviews: 312,
    closes: "Cierra a las 21:00",
    icon: Coffee,
    tiles: ["from-[#c58b55] to-[#4a2c1a]", "from-[#e9c9a3] to-[#9c6a3f]", "from-[#7a4b2c] to-[#2b1a10]"],
    site: {
      bg: "#2a1c15",
      fg: "#f5ebdf",
      accent: "#e3ab6f",
      accentFg: "#2a1c15",
      art: "from-[#a26a3f] to-[#3b2416]",
      headline: ["Café de especialidad", "en tu barrio"],
      cta: "Ver carta",
      services: ["Espresso", "Pastelería", "Brunch"],
    },
  },
  {
    query: "peluquería cerca de mí",
    name: "Tu peluquería",
    category: "Peluquería",
    rating: "4.9",
    reviews: 128,
    closes: "Cierra a las 20:00",
    icon: Scissors,
    tiles: ["from-[#e9d3bf] to-[#9a6b4b]", "from-[#d8bba3] to-[#6e4c37]", "from-[#f2e4d6] to-[#c0946f]"],
    site: {
      bg: "#f4eee7",
      fg: "#2a211c",
      accent: "#2a211c",
      accentFg: "#f4eee7",
      art: "from-[#e3cdb8] to-[#a87a57]",
      headline: ["Cortes y color", "con hora online"],
      cta: "Reservar hora",
      services: ["Corte", "Color", "Peinado"],
    },
  },
  {
    query: "abogado cerca de mí",
    name: "Tu estudio jurídico",
    category: "Abogado",
    rating: "4.9",
    reviews: 94,
    closes: "Cierra a las 19:00",
    icon: Scale,
    tiles: ["from-[#2c3a55] to-[#0e1424]", "from-[#cfb37a] to-[#7a6232]", "from-[#3b4a68] to-[#151c2e]"],
    site: {
      bg: "#0f1626",
      fg: "#eef1f6",
      accent: "#cfb37a",
      accentFg: "#0f1626",
      art: "from-[#2a3754] to-[#0b101c]",
      headline: ["Asesoría legal", "clara y cercana"],
      cta: "Agendar consulta",
      services: ["Familia", "Laboral", "Civil"],
    },
  },
];

// Superficie de las piezas de la escena: sólida, sin desenfoque (se movería en cada cuadro)
const PANEL = "border border-white/10 bg-card shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]";

// Cuánto se ve cada pieza y cuánto tarda cada una en desvanecerse antes de la siguiente
const PROFILE_MS = 2900;
const FADE_MS = 550;
const SITE_MS = 5000;
// Ritmo de la búsqueda: cada letra al escribir y al borrar
const TYPE_CHAR_MS = 50;
const ERASE_CHAR_MS = 28;

/**
 * La escena cuenta los dos servicios: alguien busca, caen los pines, se enciende un negocio
 * con la ruta, se abre su perfil y se toca "Sitio web"; el perfil se desvanece y recién
 * entonces aparece su web, en el mismo lugar. Al terminar la web se va y empieza otro rubro.
 * Pasos: 0 escribe, 1 pines, 2 ruta, 3 perfil, 4 toca "Sitio web", 5 perfil se va, 6 web,
 * 7 web se va (y la búsqueda se borra letra a letra). Se pausa cuando el hero no está en pantalla.
 */
function useSearchStory(active: boolean) {
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const biz = BUSINESSES[cycle % BUSINESSES.length];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(biz.query.length);
      setStep(6);
      return;
    }
    if (!active) return;
    setTyped(0);
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    // La primera vez espera a que se dibuje el mapa; después la pausa ya la dio el borrado
    const start = cycle === 0 ? 1400 : 350;
    for (let i = 1; i <= biz.query.length; i++) {
      timers.push(setTimeout(() => setTyped(i), start + i * TYPE_CHAR_MS));
    }
    const typedAt = start + biz.query.length * TYPE_CHAR_MS;
    const profileAt = typedAt + 2000;
    const siteAt = profileAt + PROFILE_MS + FADE_MS;
    timers.push(setTimeout(() => setStep(1), typedAt + 300));
    timers.push(setTimeout(() => setStep(2), typedAt + 1200));
    timers.push(setTimeout(() => setStep(3), profileAt));
    timers.push(setTimeout(() => setStep(4), profileAt + PROFILE_MS - 600));
    timers.push(setTimeout(() => setStep(5), profileAt + PROFILE_MS));
    timers.push(setTimeout(() => setStep(6), siteAt));
    timers.push(setTimeout(() => setStep(7), siteAt + SITE_MS));
    // Mientras la web se va, la búsqueda se borra letra a letra (más rápido que al escribir)
    const eraseAt = siteAt + SITE_MS + 300;
    for (let i = 1; i <= biz.query.length; i++) {
      timers.push(setTimeout(() => setTyped(biz.query.length - i), eraseAt + i * ERASE_CHAR_MS));
    }
    const erasedAt = eraseAt + biz.query.length * ERASE_CHAR_MS;
    timers.push(setTimeout(() => setCycle((c) => c + 1), erasedAt + 150));
    return () => timers.forEach(clearTimeout);
  }, [cycle, active, biz.query.length]);

  return { typed, step, biz };
}

function SearchBar({ query, typed }: { query: string; typed: number }) {
  return (
    <div className={cn(PANEL, "flex h-12 items-center gap-3 rounded-full pl-4 pr-5 text-sm")}>
      <Search className="h-4 w-4 shrink-0 text-primary" />
      <span className="truncate text-foreground">
        {query.slice(0, typed)}
        <span className="animate-caret ml-px inline-block h-4 w-px translate-y-0.5 bg-primary" />
      </span>
    </div>
  );
}

/** Encabezado mono de cada pieza: dice qué servicio es. */
function PanelLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px w-4 bg-white/20" />
      {children}
    </p>
  );
}

/** "Foto" del perfil: un degradado del rubro con líneas suaves, en vez de una foto real. */
function Tile({ tone, icon: Icon, className }: { tone: string; icon?: LucideIcon; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", tone, className)}>
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, rgb(255 255 255/0.35) 0 1px, transparent 1px 14px)" }}
      />
      {Icon && <Icon className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white/80" strokeWidth={1.25} />}
    </div>
  );
}

function ProfilePanel({ biz, show, tapping, leaving }: { biz: Business; show: boolean; tapping: boolean; leaving: boolean }) {
  return (
    <div
      className={cn(
        PANEL,
        "relative w-full overflow-hidden rounded-3xl transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        show && "translate-y-0 scale-100 opacity-100",
        !show && !leaving && "pointer-events-none translate-y-6 scale-95 opacity-0",
        // Se desvanece en su lugar, un poco más rápido que al entrar
        leaving && "pointer-events-none scale-[0.97] opacity-0 duration-500"
      )}
    >
      <div className="grid h-36 grid-cols-[2fr_1fr] gap-1 p-1 sm:h-40">
        <Tile tone={biz.tiles[0]} icon={biz.icon} className="rounded-[1.25rem] rounded-r-md" />
        <div className="grid grid-rows-2 gap-1">
          <Tile tone={biz.tiles[1]} className="rounded-md rounded-tr-[1.25rem]" />
          <Tile tone={biz.tiles[2]} className="rounded-md rounded-br-[1.25rem]" />
        </div>
      </div>

      <div className="p-5 pt-4">
        <PanelLabel index="01">Perfil de Google Maps</PanelLabel>
        <p className="mt-2.5 font-display text-xl font-semibold leading-tight text-foreground">{biz.name}</p>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm">
          <span className="font-medium text-foreground">{biz.rating}</span>
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-primary text-primary transition-[opacity,transform] duration-300"
                style={{
                  transitionDelay: show ? `${350 + i * 90}ms` : "0ms",
                  opacity: show ? 1 : 0,
                  transform: show ? "scale(1)" : "scale(0.4)",
                }}
              />
            ))}
          </span>
          <span className="text-muted-foreground">{biz.reviews} opiniones</span>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          {biz.category} · <span className="text-success">Abierto</span> · {biz.closes}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />A 600 m de ti
        </p>

        <div className="mt-4 grid grid-cols-3 gap-1.5 whitespace-nowrap text-xs">
          <span className="flex items-center justify-center gap-1.5 rounded-full bg-white/[0.06] py-2 text-foreground">
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </span>
          <span className="flex items-center justify-center gap-1.5 rounded-full bg-white/[0.06] py-2 text-foreground">
            <Phone className="h-3.5 w-3.5" />
            Llamar
          </span>
          {/* El botón que la escena toca para abrir la web */}
          <span
            className={cn(
              "relative flex items-center justify-center gap-1.5 rounded-full py-2 font-medium transition-all duration-300",
              tapping ? "scale-95 bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
            )}
          >
            {tapping && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />}
            <Globe className="h-3.5 w-3.5" />
            Sitio web
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Maqueta de la web del rubro, dibujada (no es una captura). Las medidas van en cqw (ancho del
 * contenedor) para que se vea como una página real achicada, igual en cualquier tamaño.
 */
function SiteMock({ biz }: { biz: Business }) {
  const { site, icon: Icon } = biz;
  return (
    <div className="absolute inset-0 flex flex-col [container-type:inline-size]" style={{ background: site.bg, color: site.fg }}>
      <div className="flex items-center justify-between px-[5cqw] py-[3.2cqw] text-[2.4cqw]">
        <span className="flex items-center gap-[1.2cqw] font-display text-[3cqw] font-semibold">
          <Icon className="h-[3.4cqw] w-[3.4cqw]" style={{ color: site.accent }} />
          {biz.name}
        </span>
        <span className="flex gap-[3cqw] opacity-60">
          <span>Inicio</span>
          <span>Servicios</span>
          <span>Contacto</span>
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] grid-rows-[minmax(0,1fr)] items-center gap-[4cqw] px-[5cqw]">
        <div>
          <p className="font-display text-[5.6cqw] font-semibold leading-[1.02] tracking-tight">
            {site.headline[0]}
            <br />
            <span className="font-serif font-normal italic">{site.headline[1]}</span>
          </p>
          <span className="mt-[2cqw] block h-[0.9cqw] w-[80%] rounded-full opacity-20" style={{ background: site.fg }} />
          <span className="mt-[1.2cqw] block h-[0.9cqw] w-[60%] rounded-full opacity-20" style={{ background: site.fg }} />
          <span
            className="mt-[3.2cqw] inline-flex rounded-full px-[3.2cqw] py-[1.5cqw] text-[2.3cqw] font-medium"
            style={{ background: site.accent, color: site.accentFg }}
          >
            {site.cta}
          </span>
        </div>
        <div className={cn("relative h-[92%] overflow-hidden rounded-[2.5cqw] bg-gradient-to-br", site.art)}>
          <div
            className="absolute inset-0 opacity-25"
            style={{ backgroundImage: "repeating-linear-gradient(135deg, rgb(255 255 255/0.35) 0 1px, transparent 1px 12px)" }}
          />
          <Icon className="absolute left-1/2 top-1/2 h-[12cqw] w-[12cqw] -translate-x-1/2 -translate-y-1/2 text-white/80" strokeWidth={1.1} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[2cqw] px-[5cqw] pb-[4cqw] pt-[2.5cqw] pr-[12cqw] text-[2.2cqw]">
        {site.services.map((service) => (
          <span key={service} className="rounded-[1.6cqw] border px-[2cqw] py-[1.6cqw]" style={{ borderColor: `${site.fg}22` }}>
            {service}
          </span>
        ))}
      </div>

      {/* Botón flotante de WhatsApp, como en las webs reales */}
      <span className="absolute bottom-[3.5cqw] right-[3.5cqw] flex h-[6cqw] w-[6cqw] items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg">
        <MessageCircle className="h-[3.2cqw] w-[3.2cqw]" />
      </span>
    </div>
  );
}

function BrowserPanel({ biz, show }: { biz: Business; show: boolean }) {
  return (
    <div
      className={cn(
        PANEL,
        "w-full overflow-hidden rounded-2xl transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-[0.96] opacity-0"
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 truncate rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3 shrink-0 text-primary" />
          tunegocio.cl
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
          <span className="text-primary">02</span> · Sitio web
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Acercamiento lento mientras está abierta (solo transform) */}
        <div className={cn("absolute inset-0 transition-transform duration-[6000ms] ease-out", show ? "scale-[1.04]" : "scale-100")}>
          <SiteMock biz={biz} />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const { typed, step, biz } = useSearchStory(inView);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // El mouse mueve el mapa y las piezas a distinta profundidad (solo traslación, sin giros)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 20 });
  const smy = useSpring(my, { stiffness: 70, damping: 20 });
  const mapX = useTransform(smx, (v) => v * -14);
  const mapY = useTransform(smy, (v) => v * -14);
  const nearX = useTransform(smx, (v) => v * 18);
  const nearY = useTransform(smy, (v) => v * 18);

  // Al bajar, la escena sube un poco más lento que la página
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);

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
      className="relative isolate overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:min-h-screen lg:px-8 lg:pb-20 lg:pt-32"
    >
      {/* Mapa de fondo, con los bordes fundidos al negro. En celular va solo detrás de la
          escena (abajo), para que no compita con el texto. La máscara va en una capa quieta
          y el movimiento en la interior, para no recalcularla. */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[900px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_80%,transparent)] lg:inset-0 lg:h-auto lg:[mask-image:radial-gradient(ellipse_75%_70%_at_55%_45%,black_35%,transparent_100%)]">
        <motion.div style={{ x: mapX, y: mapY }} className="absolute -inset-4 will-change-transform">
          <CityMap step={step} />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
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

        {/* Escena: búsqueda y, en el mismo lugar, primero tu perfil y después tu web.
            Las dos piezas comparten la celda de la grilla, así nunca se ven montadas. */}
        <motion.div
          style={{ y: sceneY }}
          className="animate-fade-in-hero relative mx-auto w-full min-w-0 max-w-sm opacity-0 [animation-delay:0.6s] lg:max-w-[30rem]"
        >
          <div className="mx-auto mb-5 lg:w-80">
            <SearchBar query={biz.query} typed={typed} />
          </div>

          <motion.div style={{ x: nearX, y: nearY }} className="grid items-center will-change-transform *:[grid-area:1/1]">
            <div className="mx-auto w-full lg:w-[21rem]">
              <ProfilePanel biz={biz} show={step >= 3 && step < 5} tapping={step === 4} leaving={step >= 5} />
            </div>
            <BrowserPanel biz={biz} show={step === 6} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
