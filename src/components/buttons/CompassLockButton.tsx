export default function CompassLockButton() {
  return (
    <button className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950">
      <span className="absolute top-1 h-2 w-[1px] bg-neutral-600" />
      <span className="absolute bottom-1 h-2 w-[1px] bg-neutral-600" />
      <span className="absolute left-1 h-[1px] w-2 bg-neutral-600" />
      <span className="absolute right-1 h-[1px] w-2 bg-neutral-600" />
      <span className="absolute h-0 w-0 origin-center border-x-[5px] border-b-[14px] border-x-transparent border-b-rose-500 transition-transform duration-500 ease-out [transform:rotate(20deg)] group-hover:[transform:rotate(200deg)]" />
      <span className="absolute h-1.5 w-1.5 rounded-full bg-neutral-300" />
    </button>
  );
}
