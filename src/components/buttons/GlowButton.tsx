export default function GlowButton({ isHovered }: { isHovered?: boolean }) {
  return (
    <button
      className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white"
      style={{
        transition: "transform 300ms, box-shadow 300ms",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered ? "0 0 30px rgba(139, 92, 246, 0.8)" : "none",
      }}
    >
      Glow Button
    </button>
  );
}
