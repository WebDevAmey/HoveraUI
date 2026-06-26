"use client";

import { useEffect, useRef, useState } from "react";

interface RevealSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function RevealSection({ id, children, className }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`${className ?? ""} ${hasRevealed ? "animate-clip-reveal" : "opacity-0"}`}
    >
      {children}
    </section>
  );
}
