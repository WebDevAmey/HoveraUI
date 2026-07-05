export default function ScanRingButton() {
  return (
    <button className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2">
      <span className="absolute inset-0 rounded-full border border-cyan-400/70 opacity-0 scale-50 transition-all delay-0 duration-300 group-hover:scale-100 group-hover:opacity-100" />
      <span className="absolute inset-0 rounded-full border border-cyan-400/50 opacity-0 scale-50 transition-all delay-100 duration-300 group-hover:scale-125 group-hover:opacity-100" />
      <span className="absolute inset-0 rounded-full border border-cyan-400/30 opacity-0 scale-50 transition-all delay-200 duration-300 group-hover:scale-150 group-hover:opacity-100" />
      <span className="absolute inset-0 rounded-full border border-cyan-400/10 opacity-0 scale-50 transition-all delay-300 duration-300 group-hover:scale-[1.75] group-hover:opacity-100" />
      <span className="relative z-10 text-xs font-semibold tracking-wide">SCAN</span>
    </button>
  );
}
