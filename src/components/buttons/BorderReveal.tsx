export default function BorderReveal({ isHovered }: { isHovered?: boolean }) {
  return (
    <button
      className="rounded-lg border-2 bg-black px-8 py-3 text-white"
      style={{
        transition: "border-color 300ms",
        borderColor: isHovered ? "white" : "transparent",
      }}
    >
      Border Reveal
    </button>
  );
}
