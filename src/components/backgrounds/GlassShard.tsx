export default function GlassShard() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#050b14]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 20deg at 25% 30%, rgba(255,255,255,.1) 0deg, transparent 25deg, rgba(186,230,253,.18) 50deg, transparent 75deg),
            conic-gradient(from 200deg at 75% 65%, rgba(255,255,255,.08) 0deg, transparent 30deg, rgba(125,211,252,.2) 60deg, transparent 90deg),
            conic-gradient(from 110deg at 55% 15%, rgba(255,255,255,.06) 0deg, transparent 20deg, rgba(224,242,254,.15) 45deg, transparent 70deg)
          `,
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,.8))",
        }}
      />
    </div>
  );
}
