export default function DotPattern() {
  return (
    <div className="relative h-screen bg-black">

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.3) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

    </div>
  );
}