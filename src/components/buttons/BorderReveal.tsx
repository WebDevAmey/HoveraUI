export default function BorderReveal({ isHovered }: { isHovered?: boolean }) {
  return (
    <button
      className="rounded-lg border-2 bg-black px-8 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        transition: "border-color 300ms",
        borderColor: isHovered ? "white" : "transparent",
      }}
    >
      Border Reveal
    </button>
  );
}


