import { Button, ButtonArrow } from "@/components/ui/button";
import {
  WHATSAPP_BOTH_URL,
  WHATSAPP_DIAGNOSIS_URL,
  WHATSAPP_MAPS_URL,
  WHATSAPP_WEB_URL,
} from "@/lib/whatsapp";
import { SplitWords, wordTiming } from "@/components/split-words";
import { Reveal } from "@/components/reveal";

// El cierre repite la oferta del hero (lo que menos compromete); cotizar queda como atajo.
const QUOTE_LINKS = [
  { label: "Perfil de Google Maps", href: WHATSAPP_MAPS_URL },
  { label: "Sitio web", href: WHATSAPP_WEB_URL },
  { label: "Los dos", href: WHATSAPP_BOTH_URL },
];

export function CTASection() {
  return (
    <section id="contacto" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground sm:px-16 sm:py-20">
        {/* Cuadrícula de calles, como el mapa del hero pero en negro sobre azul */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_80%_20%,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            transform: "rotate(-14deg) scale(1.6)",
          }}
        />

        {/* El texto entra por partes después de la tarjeta */}
        <Reveal variant="stagger" delay={250} className="relative max-w-3xl">
          <h2 className="text-4xl font-semibold leading-[0.95] sm:text-6xl" style={wordTiming(150, 100)}>
            <SplitWords>
              Escríbeme y vemos qué necesita <em className="font-serif font-normal">tu negocio.</em>
            </SplitWords>
          </h2>
          <p className="mt-5 max-w-lg text-primary-foreground/75">
            Empieza con un diagnóstico gratis de tu perfil de Google Maps. Te respondo yo, por WhatsApp,
            sin compromiso.
          </p>
          <div className="mt-9">
            <Button variant="dark" size="lg" withArrow asChild>
              <a href={WHATSAPP_DIAGNOSIS_URL} target="_blank" rel="noopener noreferrer">
                Pedir diagnóstico gratuito
                <ButtonArrow tone="primary" />
              </a>
            </Button>
          </div>
          <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-foreground/75">
            <span>¿Ya sabes lo que quieres? Cotiza:</span>
            {QUOTE_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-foreground underline decoration-primary-foreground/30 underline-offset-4 transition-colors hover:decoration-primary-foreground"
              >
                {link.label}
              </a>
            ))}
          </p>
        </Reveal>
      </Reveal>
    </section>
  );
}
