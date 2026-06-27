export default function NoiseVeil() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0c0f14]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(45,212,191,.35), transparent 55%), radial-gradient(circle at 75% 75%, rgba(236,72,153,.3), transparent 55%)",
          mixBlendMode: "color",
        }}
      />
    </div>
  );
}
