export default function ShredderButton() {
  return (
    <button className="group relative inline-block cursor-pointer overflow-hidden rounded border-2 border-neutral-800 bg-neutral-900 px-8 py-3 text-xl font-black tracking-wider text-transparent">
      SHREDDER
      <span className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-rose-500 transition-transform duration-300 ease-out [clip-path:polygon(0_0,_100%_0,_100%_33%,_0_33%,_0_66%,_100%_66%,_100%_100%,_0_100%)] group-hover:translate-y-2">
        SHREDDER
      </span>
      <span className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-cyan-400 transition-transform duration-300 ease-out [clip-path:polygon(0_33%,_100%_33%,_100%_66%,_0_66%,_0_100%,_100%_100%)] group-hover:-translate-y-2">
        SHREDDER
      </span>
    </button>
  );
}
