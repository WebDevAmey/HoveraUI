export default function RadialBloomButton() {
  return (
    <button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-rose-600 bg-transparent px-6 py-3 text-lg font-semibold text-rose-600 transition-colors duration-500 before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-8 before:w-8 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 before:rounded-full before:bg-rose-600 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:text-white hover:before:scale-[6]">
      Radial Bloom
    </button>
  );
}
