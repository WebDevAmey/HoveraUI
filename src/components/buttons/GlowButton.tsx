export default function GlowButton() {
  return (
    <button
      className="
        px-6
        py-3
        rounded-xl
        bg-violet-600
        text-white
        font-medium

        shadow-[0_0_30px_rgba(139,92,246,0.5)]

        hover:scale-105
        transition-all
        duration-300
      "
    >
      Glow Button
    </button>
  );
}