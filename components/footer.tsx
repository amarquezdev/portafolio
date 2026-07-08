import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, Facebook } from "lucide-react";

const FOOTER_LINKS = {
  Servicios: [
    { label: "Tiendas Online", href: "/#servicios" },
    { label: "Sistemas de Reserva", href: "/#servicios" },
    { label: "Landing Pages", href: "/#servicios" },
    { label: "Webs Corporativas", href: "/#servicios" },
  ],
  Empresa: [
    { label: "Proceso", href: "/#proceso" },
    { label: "Precios", href: "/#precios" },
    { label: "Contacto", href: "/#contacto" },
  ],
  Legal: [
    { label: "Política de Privacidad", href: "/#" },
    { label: "Términos de Servicio", href: "/#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2" aria-label="AmarquezDev, ir al inicio">
              <Image
                src="/images/am-logo.svg"
                alt="Logo de AmarquezDev"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-lg font-semibold text-white">AmarquezDev</span>
            </Link>
            <p className="mb-5 text-sm text-white/50">
              Diseño y desarrollo web para pequeños y medianos negocios locales.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="AmarquezDev en LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="AmarquezDev en Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="AmarquezDev en Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
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
          &copy; {new Date().getFullYear()} AmarquezDev. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
