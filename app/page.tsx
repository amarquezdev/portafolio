import Aurora from "@/components/Aurora";
import { GlassmorphismNav } from "@/components/glassmorphism-nav";
import { HeroSection } from "@/components/hero-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { FeaturesSection } from "@/components/features-section";
import { ProcessSection } from "@/components/process-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingCalculatorSection } from "@/components/pricing-calculator-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora
            colorStops={["#475569", "#64748b", "#475569"]}
            amplitude={1.2}
            blend={0.6}
            speed={0.8}
          />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <ProblemSolutionSection />
          <FeaturesSection />
          <ProcessSection />
          <TestimonialsSection />
          <PricingCalculatorSection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
