export default function ChamberDoorButton() {
  return (
    <button className="group relative inline-block h-14 w-48 cursor-pointer bg-transparent [perspective:1000px] [transform-style:preserve-3d]">
      <div className="absolute inset-0 z-0 rounded bg-cyan-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

      <span className="absolute left-0 top-0 z-10 flex h-[50%] w-full origin-top items-end justify-center overflow-hidden border-x-2 border-t-2 border-white bg-neutral-900 font-bold text-white transition-transform duration-300 group-hover:[transform:rotateX(60deg)]">
        <span className="translate-y-[50%]">OPEN CHAMBER</span>
      </span>

      <span className="absolute bottom-0 left-0 z-10 flex h-[50%] w-full origin-bottom items-start justify-center overflow-hidden border-x-2 border-b-2 border-white bg-neutral-900 font-bold text-white transition-transform duration-300 group-hover:[transform:rotateX(-60deg)]">
        <span className="-translate-y-[50%]">OPEN CHAMBER</span>
      </span>
    </button>
  );
}
