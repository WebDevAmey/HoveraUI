export default function MagmaVein() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#0c0402]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-conic-gradient(from 0deg at 20% 30%, rgba(255,90,0,.18) 0deg 8deg, transparent 8deg 26deg),
            repeating-conic-gradient(from 45deg at 75% 70%, rgba(255,60,0,.15) 0deg 6deg, transparent 6deg 22deg),
            repeating-conic-gradient(from 90deg at 50% 90%, rgba(255,140,40,.12) 0deg 5deg, transparent 5deg 20deg)
          `,
          filter: "blur(0.5px)",
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
