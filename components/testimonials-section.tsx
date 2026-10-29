import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-column";

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Nuestra web anterior era de 2015. Con Macno tenemos una tienda online que por fin vende algo por su cuenta.",
    name: "Raul Baca",
    role: "Dueño, Todo en Vidrio",
    initials: "RB",
  },
  {
    text: "El sistema de reservas nos quitó todas las llamadas para agendar citas. Ahora los clientes reservan solos desde el móvil.",
    name: "Claudia Miranda",
    role: "Fundadora, Studio Clau Miranda",
    initials: "CM",
  },
  {
    text: "Nos hicieron una web corporativa completa, con todas las secciones que necesitábamos. Se nota que entendieron el negocio.",
    name: "Marcia Perez",
    role: "Dueña, Asesoria Legal E Integral C&M",
    initials: "MP",
  },
];

const MASK = "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]";

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Lo que dicen los negocios con los que trabajé
          </h2>
          <p className="mt-4 text-white/60">
            Clientes de la zona, con sus palabras.
          </p>
        </div>

        {/* Celular y tablet: una columna con las tres reseñas */}
        <div className={`mx-auto h-[420px] max-w-xl lg:hidden ${MASK}`}>
          <TestimonialsColumn testimonials={TESTIMONIALS} duration={20} />
        </div>

        {/* Escritorio: una reseña por columna */}
        <div className={`hidden grid-cols-3 gap-6 lg:grid ${MASK}`}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="h-[200px]">
              <TestimonialsColumn testimonials={[t]} duration={[10, 12, 11][i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
