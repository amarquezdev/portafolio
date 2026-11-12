"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn, scrollToSection } from "@/lib/utils";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Caso real", href: "#caso" },
  { label: "Cómo trabajo", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

const NAVBAR_OFFSET = 100;

/** Retraso (en segundos) de una pieza del navbar al armarse; lo lee la animación vía --d. */
const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function GlassmorphismNav() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function onScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY < 50) {
        setVisible(true);
      } else if (delta > 5) {
        setVisible(false);
      } else if (delta < -5) {
        setVisible(true);
      }
      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    scrollToSection(href, NAVBAR_OFFSET);
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-3 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl sm:w-[calc(100%-1.5rem)] -translate-x-1/2 transition-all duration-500 md:top-5",
          visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        )}
      >
        {/* En celular no hay barra: solo el logo a un lado y el menú al otro, sueltos.
            Al cargar, la barra se despliega desde el centro (como la búsqueda del hero) y
            después aparecen el logo, los links y el botón (estilos .hero-* en globals.css). */}
        <div
          className="hero-unfold flex items-center justify-between gap-4 sm:glass sm:rounded-full sm:p-1.5 sm:pl-4"
          style={delay(0)}
        >
          <Link href="/" className="hero-pop flex shrink-0 items-center gap-2" style={delay(1.0)} aria-label="Macno, ir al inicio">
            <Image
              src="/images/logo-portafolio.png"
              alt="Logo de Macno"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <span className="hidden font-display text-lg font-semibold tracking-tight text-foreground sm:inline">
              Macno
            </span>
          </Link>

          <div className="hidden items-center gap-1.5 lg:flex">
            {NAV_LINKS.map((link, index) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                style={delay(0.8 + index * 0.1)}
                className="hero-build rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={delay(1.2)}
              className="hero-pop group/btn hidden h-10 items-center gap-1 rounded-full bg-primary pl-4 pr-1 text-sm font-medium text-primary-foreground transition-colors hover:shadow-[0_0_30px_-4px_color-mix(in_oklch,var(--primary)_60%,transparent)] sm:flex"
            >
              Escríbeme
              <span className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover/btn:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              style={delay(1.1)}
              className="hero-pop flex h-10 w-10 items-center justify-center rounded-full text-foreground max-sm:justify-end sm:bg-white/5 sm:ring-1 sm:ring-white/10 lg:hidden"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              {/* Tres líneas de largo decreciente, alineadas a la derecha; al abrir forman una X */}
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute right-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-300",
                    mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute right-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-current transition-all duration-300",
                    mobileOpen ? "w-0 opacity-0" : "w-3.5 opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute right-0 h-[1.5px] rounded-full bg-current transition-all duration-300",
                    mobileOpen ? "bottom-1/2 w-5 translate-y-1/2 -rotate-45" : "bottom-0 w-2"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-6 px-8">
          {NAV_LINKS.map((link, index) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "font-display text-2xl font-medium tracking-tight text-foreground opacity-0",
                mobileOpen && "animate-mobile-menu-item"
              )}
              style={{ animationDelay: mobileOpen ? `${index * 80}ms` : undefined }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={WHATSAPP_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "mt-4 flex h-12 items-center gap-1 rounded-full bg-primary pl-6 pr-1.5 text-base font-medium text-primary-foreground opacity-0",
              mobileOpen && "animate-mobile-menu-item"
            )}
            style={{ animationDelay: mobileOpen ? `${NAV_LINKS.length * 80}ms` : undefined }}
          >
            Escríbeme
            <span className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground text-primary">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
