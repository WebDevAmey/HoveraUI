export default function Hero() {
  return (
    <section className="py-16 text-center" aria-label="Hero">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
        Open Source · Free to use
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Beautiful{" "}
        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Background Patterns
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        Production-ready CSS and Tailwind backgrounds. Preview live, copy the
        code, drop it in your project.
      </p>

      <div className="mt-10 flex justify-center gap-10">
        {[
          { value: "10", label: "Patterns" },
          { value: "2", label: "Categories" },
          { value: "1-click", label: "Copy & paste" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="mt-0.5 text-xs text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
