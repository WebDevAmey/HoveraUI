export default function RippleButton() {
  return (
    <button className="relative overflow-hidden rounded-lg bg-black px-7 py-3 text-white group">
      <span className="absolute inset-0 scale-0 bg-white opacity-0 transition-transform duration-300 group-active:scale-150 group-active:opacity-20" />

      <span className="relative">
        Click Me
      </span>
    </button>
  );
}




