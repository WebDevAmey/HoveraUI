"use client";

const LINES = [
  { top: "12%", delay: "0s", duration: "4.2s", width: "34vw", opacity: 0.7 },
  { top: "28%", delay: "1.6s", duration: "6.5s", width: "22vw", opacity: 0.4 },
  { top: "43%", delay: "0.7s", duration: "3.6s", width: "42vw", opacity: 0.85 },
  { top: "58%", delay: "2.8s", duration: "7.2s", width: "18vw", opacity: 0.35 },
  { top: "72%", delay: "1.1s", duration: "5.1s", width: "30vw", opacity: 0.6 },
  { top: "86%", delay: "3.4s", duration: "4.7s", width: "26vw", opacity: 0.5 },
];

export default function LightLines() {
  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950">
      <style>{"@keyframes hovera-light-line { from { transform: translateX(-110%); } to { transform: translateX(110vw); } }"}</style>
      {LINES.map((line, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute h-px motion-reduce:[animation-play-state:paused]"
          style={{
            top: line.top,
            width: line.width,
            opacity: line.opacity,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 45%, #ffffff 50%, rgba(255,255,255,0.9) 55%, transparent)",
            boxShadow: "0 0 12px rgba(255,255,255,0.35)",
            animation:
              "hovera-light-line " + line.duration + " cubic-bezier(0.4, 0, 0.2, 1) " + line.delay + " infinite",
          }}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(9,9,11,0.8))",
        }}
      />
    </div>
  );
}
