"use client";

import { useMemo, useState, useEffect } from "react";
import { useFlowThreadProgress, type FlowThreadSection } from "./useFlowThreadProgress";

interface FlowThreadTOCProps {
  sections: FlowThreadSection[];
  className?: string;
}

const ROW_HEIGHT = 36;
const TRACK_TOP = 12;

export default function FlowThreadTOC({ sections, className }: FlowThreadTOCProps) {
  const memoSections = useMemo(() => sections, [sections]);
  const { progress, activeId } = useFlowThreadProgress(memoSections);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const trackLen = (sections.length - 1) * ROW_HEIGHT;
  const fill = trackLen * Math.min(1, Math.max(0, progress));

  const ease = reducedMotion ? "none" : "cy 0.4s cubic-bezier(0.16, 1, 0.3, 1), r 0.35s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <nav aria-label="On this page" className={className}>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        On this page
      </p>
      <div className="relative flex">
        <svg
          width="20"
          height={trackLen + 24}
          viewBox={`0 0 20 ${trackLen + 24}`}
          className="mr-3 shrink-0 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="toc-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--hovera-accent)" stopOpacity={1} />
              <stop offset={progress} stopColor="var(--hovera-accent)" stopOpacity={1} />
              <stop offset={progress} stopColor="var(--border)" stopOpacity={0.35} />
              <stop offset="1" stopColor="var(--border)" stopOpacity={0.35} />
            </linearGradient>
            <radialGradient id="toc-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="var(--hovera-accent)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--hovera-accent)" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Background track */}
          <line
            x1="10"
            y1={TRACK_TOP}
            x2="10"
            y2={TRACK_TOP + trackLen}
            stroke="var(--border)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeOpacity={0.35}
          />

          {/* Progress fill — grows from top */}
          <line
            x1="10"
            y1={TRACK_TOP}
            x2="10"
            y2={TRACK_TOP + fill}
            stroke="url(#toc-fill)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              transition: reducedMotion ? "none" : "y2 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Glow orb at scroll position */}
          <circle
            cx="10"
            cy={TRACK_TOP + fill}
            r={10}
            fill="url(#toc-glow)"
            style={{
              transition: reducedMotion ? "none" : "cy 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {sections.map((s, i) => {
            const isActive = s.id === activeId;
            const cy = TRACK_TOP + i * ROW_HEIGHT;
            const isPast = i * ROW_HEIGHT <= fill;
            return (
              <g key={s.id}>
                {/* Pulse ring */}
                {isActive && (
                  <circle
                    cx="10"
                    cy={cy}
                    r={7}
                    fill="none"
                    stroke="var(--hovera-accent)"
                    strokeWidth={1.5}
                    strokeOpacity={0.5}
                    className={reducedMotion ? "" : "animate-ping"}
                    style={{
                      animationDuration: "2.5s",
                      transformOrigin: `${10}px ${cy}px`,
                    }}
                  />
                )}
                {/* Dot */}
                <circle
                  cx="10"
                  cy={cy}
                  r={isActive ? 5 : 3}
                  fill={
                    isActive
                      ? "var(--hovera-accent)"
                      : isPast
                        ? "var(--hovera-accent)"
                        : "var(--border)"
                  }
                  stroke={isActive || isPast ? "var(--hovera-accent)" : "none"}
                  strokeWidth={1.5}
                  style={{
                    transition: ease,
                    transformOrigin: `${10}px ${cy}px`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Labels */}
        <ul className="flex flex-col" style={{ rowGap: `${ROW_HEIGHT - 20}px` }}>
          {sections.map((s) => {
            const isActive = s.id === activeId;
            return (
              <li key={s.id} style={{ height: 20 }}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative block text-sm"
                >
                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
