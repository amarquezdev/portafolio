"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

/**
 * Botón fijo a WhatsApp (celular y escritorio) que aparece al dejar atrás el hero y se oculta al
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
        // En celular se ve completo; en escritorio parte solo con el ícono y se abre al pasar el mouse
        "group fixed bottom-4 right-4 z-30 flex h-12 items-center rounded-full bg-primary pl-3.5 pr-5 text-sm font-medium text-primary-foreground shadow-md shadow-black/40 transition-all duration-300 sm:bottom-6 sm:right-6 sm:pr-3.5 sm:hover:pr-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      <span className="ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 sm:ml-0 sm:max-w-0 sm:opacity-0 sm:group-hover:ml-2 sm:group-hover:max-w-24 sm:group-hover:opacity-100">
        Escríbeme
      </span>
    </a>
  );
}
