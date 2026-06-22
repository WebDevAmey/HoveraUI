export default function EmberDrift() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#0a0604]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 82%, rgba(255,130,40,.9) 0%, transparent 1.2%),
            radial-gradient(circle at 28% 64%, rgba(255,90,20,.85) 0%, transparent 0.8%),
            radial-gradient(circle at 41% 88%, rgba(255,170,60,.8) 0%, transparent 1%),
            radial-gradient(circle at 58% 70%, rgba(255,100,10,.85) 0%, transparent 0.9%),
            radial-gradient(circle at 73% 90%, rgba(255,150,50,.8) 0%, transparent 1.1%),
            radial-gradient(circle at 84% 58%, rgba(255,80,0,.9) 0%, transparent 0.7%),
            radial-gradient(circle at 19% 40%, rgba(255,140,40,.6) 0%, transparent 0.6%),
            radial-gradient(circle at 65% 35%, rgba(255,110,20,.55) 0%, transparent 0.5%),
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,70,0,.35), transparent 60%)
          `,
          filter: "blur(1px)",
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
