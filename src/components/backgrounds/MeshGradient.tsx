export default function MeshGradient() {
  return (
    <div className="relative h-screen bg-black overflow-hidden">

      <div
        className="
          absolute
          left-0
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-purple-500
          blur-[150px]
          opacity-40
        "
      />

      <div
        className="
          absolute
          right-0
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500
          blur-[150px]
          opacity-40
        "
      />

    </div>
  );
}