export default function Spotlight2() {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              80% 80% at 0% 50%,
              rgba(168,85,247,.4),
              transparent 60%
            ),
            radial-gradient(
              80% 80% at 100% 50%,
              rgba(59,130,246,.4),
              transparent 60%
            )
          `,
        }}
      />
    </div>
  );
}