"use client";

import { useMemo, useState, useEffect } from "react";
import { useFlowThreadProgress, type FlowThreadSection } from "./useFlowThreadProgress";

interface FlowThreadTOCProps {
  sections: FlowThreadSection[];
  className?: string;
}

const ROW_HEIGHT = 36;

export default function FlowThreadTOC({ sections, className }: FlowThreadTOCProps) {
  const memoSections = useMemo(() => sections, [sections]);
  const { progress, activeId } = useFlowThreadProgress(memoSections);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state from a media query, an external system
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const totalHeight = (sections.length - 1) * ROW_HEIGHT;
  const fillHeight = reducedMotion ? totalHeight * Math.ceil(progress) : totalHeight * progress;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <div className="relative flex">
        <svg
          width="16"
          height={totalHeight + 16}
          viewBox={`0 0 16 ${totalHeight + 16}`}
          className="mr-3 shrink-0 overflow-visible"
          aria-hidden="true"
        >
          <line
            x1="8"
            y1="8"
            x2="8"
            y2={totalHeight + 8}
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="8"
            x2="8"
            y2={8 + fillHeight}
            stroke="var(--hovera-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transition: reducedMotion ? "none" : "y2 0.25s ease-out" }}
          />
          {sections.map((s, i) => {
            const isActive = s.id === activeId;
            return (
              <circle
                key={s.id}
                cx="8"
                cy={8 + i * ROW_HEIGHT}
                r={isActive ? 4 : 3}
                fill={isActive ? "var(--hovera-accent)" : "var(--border)"}
                className={isActive ? "flow-node-active" : ""}
                style={{ transformOrigin: `8px ${8 + i * ROW_HEIGHT}px` }}
              />
            );
          })}
        </svg>

        <ul className="flex flex-col gap-0" style={{ rowGap: `${ROW_HEIGHT - 20}px` }}>
          {sections.map((s) => (
            <li key={s.id} style={{ height: 20 }}>
              <a
                href={`#${s.id}`}
                aria-current={s.id === activeId ? "true" : undefined}
                className={`text-sm transition-colors ${
                  s.id === activeId ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
