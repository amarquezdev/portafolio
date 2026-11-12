"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

/**
 * Solo en celular: botón fijo a WhatsApp que aparece al dejar atrás el hero y se oculta al
 * llegar a la tarjeta de contacto, para no mostrar dos botones de WhatsApp a la vez.
 * Reemplaza los botones de cotizar que antes se repetían en cada sección.
 */
export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  // Se oculta mientras se ve la tarjeta de contacto o el footer: ya tienen su propio WhatsApp
  const [nearContact, setNearContact] = useState(false);
  const visible = pastHero && !nearContact;

  useEffect(() => {
    function onScroll() {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.getElementById("contacto"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null
    );
    const showing = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? showing.add(entry.target) : showing.delete(entry.target)));
      setNearContact(showing.size > 0);
    });
    targets.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
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
