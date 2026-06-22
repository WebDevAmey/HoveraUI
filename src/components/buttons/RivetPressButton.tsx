export default function RivetPressButton() {
  return (
    <button className="group relative inline-flex h-14 w-44 items-center justify-center rounded-md border-2 border-neutral-700 bg-gradient-to-b from-neutral-800 to-neutral-900 font-bold tracking-wide text-neutral-300">
      <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-neutral-600 transition-all delay-0 duration-300 group-hover:bg-amber-400 group-hover:shadow-[0_0_6px_2px_rgba(251,191,36,0.8)]" />
      <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neutral-600 transition-all delay-75 duration-300 group-hover:bg-amber-400 group-hover:shadow-[0_0_6px_2px_rgba(251,191,36,0.8)]" />
      <span className="absolute bottom-1.5 left-1.5 h-2 w-2 rounded-full bg-neutral-600 transition-all delay-150 duration-300 group-hover:bg-amber-400 group-hover:shadow-[0_0_6px_2px_rgba(251,191,36,0.8)]" />
      <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-neutral-600 transition-all delay-200 duration-300 group-hover:bg-amber-400 group-hover:shadow-[0_0_6px_2px_rgba(251,191,36,0.8)]" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-300">
        RIVETED
      </span>
    </button>
  );
}
