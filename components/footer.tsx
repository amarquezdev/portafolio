import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, MessageCircle } from "lucide-react";

import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

const INSTAGRAM_URL = "https://www.instagram.com/macno.cl";

const SOCIAL_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-primary/40 hover:text-primary";

const FOOTER_LINKS = {
  Servicios: [
    { label: "Perfil de Google Maps", href: "/#servicios" },
    { label: "Sitios web", href: "/#servicios" },
    { label: "Caso real", href: "/#caso" },
  ],
  Información: [
    { label: "Cómo trabajo", href: "/#proceso" },
    { label: "Precios", href: "/#precios" },
    { label: "Contacto", href: "/#contacto" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
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
              <span className="text-lg font-semibold text-white">Macno</span>
            </Link>
            <p className="mb-5 text-sm text-white/50">
              Fichas de Google Maps y sitios web para negocios de Viña del Mar,
              Reñaca y Concón.
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
              <h4 className="mb-4 text-sm font-semibold text-white">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Macno. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
