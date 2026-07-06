"use client";

const BEAMS = [
  { left: "10%", delay: "0s", duration: "7s", width: "2px", color: "rgba(246,246,246,0.5)" },
  { left: "30%", delay: "2.2s", duration: "9s", width: "1px", color: "rgba(238,238,238,0.45)" },
  { left: "52%", delay: "1.1s", duration: "8s", width: "2px", color: "rgba(249,249,249,0.4)" },
  { left: "72%", delay: "3.4s", duration: "10s", width: "1px", color: "rgba(246,246,246,0.45)" },
  { left: "88%", delay: "0.6s", duration: "7.5s", width: "2px", color: "rgba(238,238,238,0.4)" },
];

export default function Beams() {
  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950">
      <style>{"@keyframes hovera-beam { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }"}</style>
      {BEAMS.map((beam, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute top-0 h-2/5 motion-reduce:[animation-play-state:paused]"
          style={{
            left: beam.left,
            width: beam.width,
            background: "linear-gradient(to bottom, transparent, " + beam.color + ", transparent)",
            animation: "hovera-beam " + beam.duration + " linear " + beam.delay + " infinite",
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(246,246,246,0.12), transparent 60%)",
        }}
      />
    </div>
  );
}
