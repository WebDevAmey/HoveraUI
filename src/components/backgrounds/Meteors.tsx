"use client";

const METEORS = [
  { left: "8%", top: "-5%", delay: "0s", duration: "3.2s" },
  { left: "24%", top: "-12%", delay: "1.4s", duration: "4.1s" },
  { left: "42%", top: "-8%", delay: "0.6s", duration: "3.6s" },
  { left: "58%", top: "-15%", delay: "2.2s", duration: "4.6s" },
  { left: "71%", top: "-6%", delay: "0.9s", duration: "3.0s" },
  { left: "84%", top: "-10%", delay: "1.8s", duration: "4.3s" },
  { left: "93%", top: "-4%", delay: "0.3s", duration: "3.8s" },
];

export default function Meteors() {
  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950">
      <style>{"@keyframes hovera-meteor { from { transform: rotate(215deg) translateX(0); opacity: 1; } 70% { opacity: 1; } to { transform: rotate(215deg) translateX(-120vh); opacity: 0; } }"}</style>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {METEORS.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute h-0.5 w-0.5 rounded-full bg-white motion-reduce:[animation-play-state:paused]"
          style={{
            left: m.left,
            top: m.top,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
            animation: "hovera-meteor " + m.duration + " linear " + m.delay + " infinite",
          }}
        >
          <span
            className="absolute top-1/2 left-0 h-px w-16 -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, rgba(139,92,246,0.9), transparent)",
            }}
          />
        </span>
      ))}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 120%, rgba(139,92,246,0.12), transparent 60%)",
        }}
      />
    </div>
  );
}
