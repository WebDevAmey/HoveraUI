export default function MorseSignalButton() {
  return (
    <button className="group inline-flex flex-col items-center gap-2 rounded-lg border border-neutral-500/40 bg-neutral-950 px-8 py-4 font-mono text-sm tracking-widest text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2">
      <span>SEND SIGNAL</span>
      <span className="flex h-1 gap-1">
        <span className="h-1 w-3 rounded-full bg-neutral-500 opacity-15 transition-opacity delay-0 duration-200 group-hover:opacity-100" />
        <span className="h-1 w-3 rounded-full bg-neutral-500 opacity-15 transition-opacity delay-150 duration-200 group-hover:opacity-100" />
        <span className="h-1 w-7 rounded-full bg-neutral-500 opacity-15 transition-opacity delay-300 duration-200 group-hover:opacity-100" />
        <span className="h-1 w-3 rounded-full bg-neutral-500 opacity-15 transition-opacity delay-500 duration-200 group-hover:opacity-100" />
        <span className="h-1 w-7 rounded-full bg-neutral-500 opacity-15 transition-opacity delay-700 duration-200 group-hover:opacity-100" />
      </span>
    </button>
  );
}
