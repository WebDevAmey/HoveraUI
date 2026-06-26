"use client";

import { useEffect, useRef, useState } from "react";

export interface FlowThreadSection {
  id: string;
  label: string;
}

interface FlowThreadState {
  /** 0..1, how far through the tracked sections the user has scrolled. */
  progress: number;
  /** id of the section currently considered active. */
  activeId: string | null;
}

/**
 * Tracks scroll position against a list of section ids and derives a
 * continuous 0..1 progress value plus the active section id. Driven by
 * rAF-throttled scroll/resize listeners reading bounding rects, so it works
 * for both up and down scrolling without relying solely on intersection
 * ratios (which don't give a continuous "between sections" value).
 */
export function useFlowThreadProgress(sections: FlowThreadSection[]): FlowThreadState {
  const [state, setState] = useState<FlowThreadState>({ progress: 0, activeId: sections[0]?.id ?? null });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    function measure() {
      const viewportAnchor = window.innerHeight * 0.35;
      const rects = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .filter((r): r is { id: string; top: number } => r !== null);

      if (rects.length === 0) {
        frame.current = null;
        return;
      }

      let activeIndex = 0;
      for (let i = 0; i < rects.length; i++) {
        if (rects[i].top <= viewportAnchor) activeIndex = i;
      }

      const total = rects.length - 1;
      let progress = total === 0 ? 1 : activeIndex / total;

      // Interpolate within the active section's span for a smoother fill.
      const current = rects[activeIndex];
      const next = rects[activeIndex + 1];
      if (next && total > 0) {
        const span = next.top - current.top;
        if (span > 0) {
          const within = Math.min(1, Math.max(0, (viewportAnchor - current.top) / span));
          progress = (activeIndex + within) / total;
        }
      }

      setState({ progress: Math.min(1, Math.max(0, progress)), activeId: rects[activeIndex].id });
      frame.current = null;
    }

    function onScroll() {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
    // sections is expected to be a stable, memoized array from the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.map((s) => s.id).join(",")]);

  return state;
}
