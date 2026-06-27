export default function Crosshatch() {
  return (
    <div className="relative h-screen w-full bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,.08) 0px,
              rgba(255,255,255,.08) 1px,
              transparent 1px,
              transparent 16px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255,255,255,.08) 0px,
              rgba(255,255,255,.08) 1px,
              transparent 1px,
              transparent 16px
            )
          `,
        }}
      />
    </div>
  );
}
