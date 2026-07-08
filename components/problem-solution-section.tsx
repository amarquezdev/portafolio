import { ProblemSolutionComparison } from "@/components/problem-solution-comparison";

export function ProblemSolutionSection() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            No tener una buena web
            <br className="hidden sm:block" /> te está costando clientes
          </h2>
          <p className="mt-4 text-white/60">
            Mira la diferencia que hace una web bien hecha.
          </p>
        </div>
        <ProblemSolutionComparison />
      </div>
    </section>
  );
}
