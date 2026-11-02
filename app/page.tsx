import { GlassmorphismNav } from "@/components/glassmorphism-nav";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { CaseStudySection } from "@/components/case-study-section";
import { ProcessSection } from "@/components/process-section";
import { FaqSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

// Orden corto: qué hago y cuánto cuesta → prueba (caso y reseñas) →
// cómo trabajo → preguntas → contacto.
export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <main className="relative min-h-screen overflow-hidden">
        <GlassmorphismNav />
        <HeroSection />
        <FeaturesSection />
        <CaseStudySection />
        <ProcessSection />
        <FaqSection />
        <CTASection />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}
