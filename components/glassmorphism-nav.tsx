"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#precios" },
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
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl transition-all duration-500",
          mounted && "animate-fade-in-nav",
          visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        )}
      >
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md md:px-6 md:py-3">
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="AmarquezDev, ir al inicio">
            <Image
              src="/images/am-logo.svg"
              alt="Logo de AmarquezDev"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="hidden text-lg font-semibold text-white sm:inline">
              AmarquezDev
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick("#contacto")}
              className="group hidden items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 sm:flex"
            >
              Empezar
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white lg:hidden"
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
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-lg transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-6 px-8">
          {NAV_LINKS.map((link, index) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "text-2xl font-medium text-white opacity-0",
                mobileOpen && "animate-mobile-menu-item"
              )}
              style={{ animationDelay: mobileOpen ? `${index * 80}ms` : undefined }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contacto")}
            className={cn(
              "mt-4 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-black opacity-0",
              mobileOpen && "animate-mobile-menu-item"
            )}
            style={{ animationDelay: mobileOpen ? `${NAV_LINKS.length * 80}ms` : undefined }}
          >
            Empezar
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
