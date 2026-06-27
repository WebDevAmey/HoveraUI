export default function DotMatrix() {
  return (
    <div className="relative h-screen w-full bg-black">

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

    </div>
  );
}