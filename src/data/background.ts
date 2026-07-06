import type React from "react";
import type { BackgroundItem } from "@/types";
import Spotlight from "@/components/backgrounds/Spotlight";
import SonarArc from "@/components/backgrounds/SonarArc";
import AuroraFlow from "@/components/backgrounds/AuroraFlow";
import Beams from "@/components/backgrounds/Beams";
import ParticleField from "@/components/backgrounds/ParticleField";
import Meteors from "@/components/backgrounds/Meteors";

export const backgrounds: BackgroundItem[] = [
  {
    name: "Spotlight",
    slug: "spotlight",
    category: "gradient",
    component: Spotlight as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 50% 0%,
          rgba(168,85,247,.4),
          transparent 60%
        ),
        radial-gradient(
          80% 80% at 50% 100%,
          rgba(59,130,246,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  },
  {
    name: "Sonar Arc",
    slug: "sonar-arc",
    category: "pattern",
    component: SonarArc as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-black">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        repeating-radial-gradient(
          circle at 50% 130%,
          transparent 0px,
          transparent 36px,
          rgba(45,212,191,.22) 38px,
          transparent 40px
        )
      \`,
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background: "linear-gradient(to top, rgba(0,0,0,.9), transparent 60%)",
    }}
  />
</div>`,
  },
  {
    name: "Aurora Flow",
    slug: "aurora-flow",
    category: "gradient",
    component: AuroraFlow as React.ComponentType,
    description: "Three drifting aurora blobs in continuous motion, transform-only and reduced-motion safe.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AuroraFlow() {
  const prefersReducedMotion = useReducedMotion();

  const drift = (xs: number[], ys: number[], duration: number) =>
    prefersReducedMotion
      ? undefined
      : {
          x: xs,
          y: ys,
          transition: { duration, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const },
        };

  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950">
      <motion.div
        aria-hidden
        animate={drift([0, 120, -60], [0, -80, 40], 18)}
        className="absolute -top-1/4 left-1/4 h-[60vh] w-[60vh] rounded-full bg-violet-600/30 blur-[120px] will-change-transform"
      />
      <motion.div
        aria-hidden
        animate={drift([0, -100, 80], [0, 60, -50], 22)}
        className="absolute top-1/3 right-1/5 h-[50vh] w-[50vh] rounded-full bg-cyan-500/25 blur-[110px] will-change-transform"
      />
      <motion.div
        aria-hidden
        animate={drift([0, 70, -90], [0, -50, 70], 26)}
        className="absolute bottom-0 left-1/3 h-[45vh] w-[45vh] rounded-full bg-fuchsia-500/20 blur-[100px] will-change-transform"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.7))]" />
    </div>
  );
}`,
  },
  {
    name: "Beams",
    slug: "beams",
    category: "gradient",
    component: Beams as React.ComponentType,
    description: "Falling light beams on a dark field, pure CSS keyframes with a paused reduced-motion state.",
    code: `"use client";

const BEAMS = [
  { left: "10%", delay: "0s", duration: "7s", width: "2px", color: "rgba(139,92,246,0.5)" },
  { left: "30%", delay: "2.2s", duration: "9s", width: "1px", color: "rgba(34,211,238,0.45)" },
  { left: "52%", delay: "1.1s", duration: "8s", width: "2px", color: "rgba(232,121,249,0.4)" },
  { left: "72%", delay: "3.4s", duration: "10s", width: "1px", color: "rgba(139,92,246,0.45)" },
  { left: "88%", delay: "0.6s", duration: "7.5s", width: "2px", color: "rgba(34,211,238,0.4)" },
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
          background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12), transparent 60%)",
        }}
      />
    </div>
  );
}`,
  },
  {
    name: "Particle Field",
    slug: "particle-field",
    category: "pattern",
    component: ParticleField as React.ComponentType,
    description: "A drifting canvas particle field that renders a static frame under reduced motion.",
    code: `"use client";

import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let width = 0;
    let height = 0;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
      a: Math.random() * 0.5 + 0.15,
    }));

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduced) {
          p.x = (p.x + p.vx + 1) % 1;
          p.y = (p.y + p.vy + 1) % 1;
        }
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 181, 253, " + p.a + ")";
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.1), transparent 55%)",
        }}
      />
    </div>
  );
}`,
  },
  {
    name: "Meteors",
    slug: "meteors",
    category: "pattern",
    component: Meteors as React.ComponentType,
    description: "Meteor streaks falling across a dotted night field, pure CSS and reduced-motion safe.",
    code: `"use client";

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
}`,
  },
];
