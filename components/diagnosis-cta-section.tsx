import { ArrowRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WHATSAPP_DIAGNOSIS_URL } from "@/lib/whatsapp";

export function DiagnosisCTASection() {
  return (
    <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-3xl border border-primary/30 bg-primary/[0.06] p-8 text-center shadow-[0_0_40px_-15px] shadow-primary/40 sm:flex-row sm:p-10 sm:text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/15 animate-pulse-glow">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            ¿No sabes cómo está tu ficha de Google?
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Mándame el nombre de tu negocio y te doy un diagnóstico: qué está mal y
            qué se puede arreglar. Es gratis y no te compromete a nada.
          </p>
        </div>
        <Button variant="white" size="lg" className="group shrink-0" asChild>
          <a href={WHATSAPP_DIAGNOSIS_URL} target="_blank" rel="noopener noreferrer">
            Pedir diagnóstico
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </section>
  );
}
