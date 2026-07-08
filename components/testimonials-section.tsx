import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-column";
import { StatsColumn } from "@/components/ui/stats-column";

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Nuestra web anterior era de 2015. Con WebLocal tenemos una tienda online que por fin vende algo por su cuenta.",
    name: "Marta Gómez",
    role: "Dueña, Tienda de Decoración Luz",
    initials: "MG",
  },
  {
    text: "El sistema de reservas nos quitó todas las llamadas para agendar citas. Ahora los clientes reservan solos desde el móvil.",
    name: "Javier Ruiz",
    role: "Dueño, Peluquería Bella",
    initials: "JR",
  },
  {
    text: "Necesitábamos algo rápido y con buena imagen. La landing page que nos hicieron se pagó sola en el primer mes.",
    name: "Lucía Fernández",
    role: "Fundadora, Estudio Lucía F.",
    initials: "LF",
  },
  {
    text: "Nos hicieron una web corporativa completa, con todas las secciones que necesitábamos. Se nota que entendieron el negocio.",
    name: "Carlos Medina",
    role: "Gerente, Despacho Medina & Asociados",
    initials: "CM",
  },
  {
    text: "Elegimos WordPress para tener algo rápido y económico, y quedó exactamente como lo imaginamos.",
    name: "Ana Torres",
    role: "Dueña, Panadería El Trigal",
    initials: "AT",
  },
  {
    text: "El proceso fue muy claro desde el primer día. Sabíamos en qué fase estábamos en todo momento.",
    name: "Diego Ramírez",
    role: "Dueño, Gimnasio PowerFit",
    initials: "DR",
  },
];

const COL1 = TESTIMONIALS.slice(0, 2);
const COL2 = TESTIMONIALS.slice(2, 4);
const COL3 = TESTIMONIALS.slice(4, 6);

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Negocios que ya confiaron en nosotros
          </h2>
          <p className="mt-4 text-white/60">
            Resultados reales de negocios locales que dieron el salto a una web profesional.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <div className="h-[420px]">
            <TestimonialsColumn testimonials={COL1} duration={22} />
          </div>
          <div className="hidden h-[420px] sm:block">
            <TestimonialsColumn testimonials={COL2} duration={28} />
          </div>
          <div className="hidden h-[420px] lg:block">
            <TestimonialsColumn testimonials={COL3} duration={25} />
          </div>
        </div>

        <StatsColumn />
      </div>
    </section>
  );
}
