export default function GridPattern() {
  return (
    <div className="relative h-screen w-full bg-black">

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
linear-gradient(rgba(168,85,247,.15) 1px, transparent 1px),
linear-gradient(90deg, rgba(59,130,246,.15) 1px, transparent 1px)
`,
          backgroundSize: "40px 40px",
        }}
      />

    </div>
  );
}