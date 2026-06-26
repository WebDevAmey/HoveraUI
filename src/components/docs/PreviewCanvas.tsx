"use client";

import { useEffect, useRef, useState } from "react";

interface PreviewCanvasProps {
  children: React.ReactNode;
  needsLightPreview?: boolean;
}

export default function PreviewCanvas({ children, needsLightPreview }: PreviewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFullscreen]);

  const surfaceClass = needsLightPreview ? "bg-white" : "bg-secondary/30";

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          onClick={() => setIsFullscreen(true)}
          aria-label="Expand preview to fullscreen"
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
        <div className={`flex min-h-[20rem] items-center justify-center overflow-hidden rounded-b-[var(--doc-radius)] p-8 ${surfaceClass}`}>
          {isVisible ? children : <div aria-hidden="true" className="h-full w-full" />}
        </div>
      </div>

      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen preview"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 p-6 backdrop-blur"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen preview"
            className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className={`flex h-full w-full max-w-4xl items-center justify-center rounded-[var(--doc-radius)] ${surfaceClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
