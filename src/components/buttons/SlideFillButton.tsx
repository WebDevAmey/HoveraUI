export default function SlideFillButton() {
  return (
    <button className="relative z-10 overflow-hidden rounded border-2 border-black bg-amber-500 px-8 py-3 text-black transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:bg-emerald-500 before:translate-y-full before:transition-transform before:duration-300 hover:text-white hover:before:translate-y-0">
      Get in touch
    </button>
  );
}
