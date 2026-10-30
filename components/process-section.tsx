const STEPS = [
  {
    name: "Conversamos",
    description: "Vemos si necesitas la ficha, la web o las dos.",
  },
  {
    name: "Te mando la cotización",
    description: "Precio y plazo claros antes de empezar.",
  },
  {
    name: "Hago el trabajo",
    description: "Te voy mostrando avances para que opines.",
  },
  {
    name: "Entrego y te explico",
    description: "Con un documento de indicaciones para mantenerlo.",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-white sm:text-3xl">
          Así{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            trabajo contigo
          </span>
        </h2>

        <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {/* Línea que une los pasos: vertical en celular, horizontal en escritorio */}
          <span className="pointer-events-none absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-primary/10 md:hidden" />
          <span className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-4 hidden h-px bg-gradient-to-r from-primary/60 via-primary/30 to-primary/10 md:block" />

          {STEPS.map((step, index) => (
            <li
              key={step.name}
              className="group relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
            >
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-black text-xs font-semibold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground md:mb-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold text-white">{step.name}</h3>
                <p className="mt-1 text-sm text-white/60">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
