export default function PulseSeismographButton() {
  return (
    <button className="group relative inline-flex h-14 w-44 items-center justify-center overflow-hidden rounded-lg border border-emerald-500/30 bg-neutral-950 font-mono text-sm text-emerald-400">
      <span className="absolute z-10 transition-opacity duration-300 group-hover:opacity-0">
        PULSE
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="h-2 w-1 bg-emerald-500 transition-all delay-0 duration-300 group-hover:h-2" />
        <span className="h-2 w-1 bg-emerald-500 transition-all delay-75 duration-300 group-hover:h-6" />
        <span className="h-2 w-1 bg-emerald-500 transition-all delay-150 duration-300 group-hover:h-3" />
        <span className="h-2 w-1 bg-emerald-500 transition-all delay-200 duration-300 group-hover:h-8" />
        <span className="h-2 w-1 bg-emerald-500 transition-all delay-300 duration-300 group-hover:h-2" />
        <span className="h-2 w-1 bg-emerald-500 transition-all delay-[400ms] duration-300 group-hover:h-5" />
      </span>
    </button>
  );
}
