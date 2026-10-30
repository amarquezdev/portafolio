import { SectionEyebrow } from "@/components/section-eyebrow";
import { ProblemSolutionComparison } from "@/components/problem-solution-comparison";

export function ProblemSolutionSection() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionEyebrow step={2}>Dónde se pierden</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">
            Si Google dice una cosa
            <br className="hidden sm:block" /> y tu web otra, <span className="text-primary">el cliente se pierde</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Estos son los principales problemas que más encuentro cuando analizo un negocio, y
            cómo lo corrijo.
          </p>
        </div>
        <ProblemSolutionComparison />
      </div>
    </section>
  );
}
