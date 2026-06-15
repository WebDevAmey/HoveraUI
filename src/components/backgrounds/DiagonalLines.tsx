export default function DiagonalLines() {
  return (
    <div className="relative h-screen bg-black">

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,.1) 0px,
              rgba(255,255,255,.1) 2px,
              transparent 2px,
              transparent 30px
            )
          `,
        }}
      />

    </div>
  );
}