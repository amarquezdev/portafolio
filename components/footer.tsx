import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, MessageCircle } from "lucide-react";

import { CurrentYear } from "@/components/current-year";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

const INSTAGRAM_URL = "https://www.instagram.com/macno.cl";

const SOCIAL_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-full bg-white text-foreground ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-primary-foreground hover:ring-primary";

const FOOTER_LINKS = {
  Servicios: [
    { label: "Perfil de Google Maps", href: "/#servicios" },
    { label: "Sitios web", href: "/#servicios" },
    { label: "Caso real", href: "/#caso" },
  ],
  Información: [
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Cómo trabajo", href: "/#proceso" },
    { label: "Contacto", href: "/#contacto" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-black/5 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2" aria-label="Macno, ir al inicio">
              <Image
                src="/images/logo-portafolio.png"
                alt="Logo de Macno"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">Macno</span>
            </Link>
            <p className="mb-5 text-sm text-muted-foreground">
              Fichas de Google Maps y sitios web para negocios en Chile.
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn sin enlace por ahora */}
              <span aria-label="Macno en LinkedIn" className={SOCIAL_CLASS}>
                <Linkedin className="h-4 w-4" />
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Macno en Instagram"
                className={SOCIAL_CLASS}
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={WHATSAPP_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribirle a Macno por WhatsApp"
                className={SOCIAL_CLASS}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-black/5 pt-8 text-center text-xs text-muted-foreground">
          &copy; <CurrentYear buildYear={new Date().getFullYear()} /> Macno. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
