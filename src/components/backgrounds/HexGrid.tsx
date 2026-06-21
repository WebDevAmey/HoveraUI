export default function HexGrid() {
  return (
    <div className="relative h-screen bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpolygon points='28,0 56,16 56,50 28,66 0,50 0,16' fill='none' stroke='rgba(255,255,255,0.15)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }}
      />
    </div>
  );
}
