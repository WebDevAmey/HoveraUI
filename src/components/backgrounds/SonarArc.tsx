export default function SonarArc() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-radial-gradient(
              circle at 50% 130%,
              transparent 0px,
              transparent 36px,
              rgba(212,212,212,.22) 38px,
              transparent 40px
            )
          `,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,.9), transparent 60%)",
        }}
      />
    </div>
  );
}
