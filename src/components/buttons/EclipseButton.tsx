export default function EclipseButton() {
  return (
    <button className="group relative inline-flex h-14 w-40 items-center justify-center overflow-hidden rounded-full bg-amber-400 font-bold text-black focus-visible:outline-2 focus-visible:outline-offset-2">
      <span className="absolute right-0 top-0 h-14 w-14 rounded-full bg-neutral-950 transition-transform duration-500 ease-out [transform:translateX(50%)] group-hover:[transform:translateX(-10%)]" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-300">
        ECLIPSE
      </span>
    </button>
  );
}
