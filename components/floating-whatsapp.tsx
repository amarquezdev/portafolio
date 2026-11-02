"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

/**
 * Solo en celular: botón fijo a WhatsApp que aparece al dejar atrás el hero.
 * Reemplaza los botones de cotizar que antes se repetían en cada sección.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_CONTACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribirme por WhatsApp"
      className={cn(
        "fixed bottom-4 right-4 z-30 flex h-12 items-center gap-2 rounded-full bg-primary pl-4 pr-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 sm:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <MessageCircle className="h-5 w-5" />
      Escríbeme
    </a>
  );
}
