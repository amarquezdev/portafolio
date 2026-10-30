"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { cn, scrollToSection } from "@/lib/utils";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Servicios", href: "#servicios" },
  { label: "Caso real", href: "#caso" },
  { label: "Contacto", href: "#contacto" },
];

const NAVBAR_OFFSET = 100;

export function GlassmorphismNav() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          "fixed top-3 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 transition-all duration-500 md:top-5",
          mounted && "animate-fade-in-nav",
          visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        )}
      >
        <div className="flex items-center justify-between gap-4 glass rounded-full p-1.5 pl-4">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Macno, ir al inicio">
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
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="rounded-full bg-white px-4 py-2 text-xs font-medium text-foreground ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-primary-foreground hover:ring-primary"
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
              className="group/btn hidden h-10 items-center gap-1 rounded-full bg-primary pl-4 pr-1 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:flex"
            >
              Escríbeme
              <span className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 group-hover/btn:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground ring-1 ring-black/5 lg:hidden"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="relative h-5 w-5">
                <Menu
                  className={cn(
                    "absolute inset-0 h-5 w-5 transition-all duration-300",
                    mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 h-5 w-5 transition-all duration-300",
                    mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
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
            <span className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
