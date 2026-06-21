export default function PrismSpectrum() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,0,80,.55) 38%, rgba(255,200,0,.55) 44%, rgba(0,255,140,.55) 50%, rgba(0,180,255,.55) 56%, rgba(160,0,255,.55) 62%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.85))",
        }}
      />
    </div>
  );
}
