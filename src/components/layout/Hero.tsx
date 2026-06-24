import { backgrounds } from "@/data/background";

export default function Hero() {
  const gradientCount = backgrounds.filter((b) => b.category === "gradient").length;
  const patternCount = backgrounds.filter((b) => b.category === "pattern").length;

  return (
    <section className="py-20 text-center" aria-label="Hero">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" aria-hidden="true" />
        Open Source · Free to use
      </div>

      <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
        Beautiful{" "}
        <span className="text-cyan-600 dark:text-cyan-400">
          Background Patterns
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
        Production-ready CSS and Tailwind backgrounds. Preview live, copy the
        code, drop it in your project.
      </p>

      <div className="mt-10 flex justify-center gap-10">
        {[
          { value: String(backgrounds.length), label: "Patterns" },
          { value: String(gradientCount), label: "Gradients" },
          { value: String(patternCount), label: "CSS Patterns" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
            <div className="mt-0.5 text-xs text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
