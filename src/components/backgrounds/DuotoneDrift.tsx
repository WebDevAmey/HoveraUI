export default function DuotoneDrift() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 25% 40%, rgba(255,45,85,.9), transparent 60%)",
          mixBlendMode: "difference",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 75% 60%, rgba(45,212,191,.9), transparent 60%)",
          mixBlendMode: "difference",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent, rgba(0,0,0,.7))",
        }}
      />
    </div>
  );
}
