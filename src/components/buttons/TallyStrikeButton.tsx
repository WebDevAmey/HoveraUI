export default function TallyStrikeButton() {
  return (
    <button className="group inline-flex h-14 w-44 items-center justify-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-950 font-mono text-sm text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2">
      <span className="relative z-10 mr-2">TALLY</span>
      <span className="h-5 w-[2px] origin-bottom scale-y-0 bg-rose-500 transition-transform delay-0 duration-200 group-hover:scale-y-100" />
      <span className="h-5 w-[2px] origin-bottom scale-y-0 bg-rose-500 transition-transform delay-100 duration-200 group-hover:scale-y-100" />
      <span className="h-5 w-[2px] origin-bottom scale-y-0 bg-rose-500 transition-transform delay-200 duration-200 group-hover:scale-y-100" />
      <span className="h-5 w-[2px] origin-bottom rotate-[20deg] scale-y-0 bg-rose-500 transition-transform delay-300 duration-200 group-hover:scale-y-100" />
    </button>
  );
}
