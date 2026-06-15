export default function Aurora() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(124,58,237,.6), transparent 40%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 80%, rgba(6,182,212,.6), transparent 40%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent, rgba(0,0,0,.8))",
        }}
      />

    </div>
  );
}