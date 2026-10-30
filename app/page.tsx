import { GlassmorphismNav } from "@/components/glassmorphism-nav";
import { HeroSection } from "@/components/hero-section";
import { HowItConnectsSection } from "@/components/how-it-connects-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { FeaturesSection } from "@/components/features-section";
import { CaseStudySection } from "@/components/case-study-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ProcessSection } from "@/components/process-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

// Orden pensado como una historia: cómo te encuentran → dónde se pierden →
// lo que hago y cómo lo hago → prueba (caso y reseñas) → contacto.
export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <main className="relative min-h-screen overflow-hidden">
        <GlassmorphismNav />
        <HeroSection />
        <HowItConnectsSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <ProcessSection />
        <CaseStudySection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
