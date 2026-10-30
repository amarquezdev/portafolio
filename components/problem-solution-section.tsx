import { ProblemSolutionComparison } from "@/components/problem-solution-comparison";

export function ProblemSolutionSection() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Si Google dice una cosa y tu web otra,
            <br className="hidden sm:block" /> la gente duda
          </h2>
          <p className="mt-4 text-white/60">
            Estos son los problemas que más encuentro en los negocios de la zona.
          </p>
        </div>
        <ProblemSolutionComparison />
      </div>
    </section>
  );
}
