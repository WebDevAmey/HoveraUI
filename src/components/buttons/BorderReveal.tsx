export default function BorderReveal() {
  return (
    <button className="relative rounded-lg bg-black px-8 py-3 text-white group">
      <span className="absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-white" />
      <span className="relative">Border Reveal</span>
    </button>
  );
}
