export default function ConicSwirl() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(124,58,237,.5), rgba(6,182,212,.5), rgba(236,72,153,.5), rgba(124,58,237,.5))",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent, rgba(0,0,0,.85))",
        }}
      />
    </div>
  );
}
