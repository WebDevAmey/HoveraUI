"use client";

import { useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: React.ReactNode;
  className?: string;
  /** Root margin passed to IntersectionObserver, lets content mount slightly before it scrolls into view. */
  rootMargin?: string;
}

/**
 * Mounts children only once the wrapper scrolls near the viewport, and keeps them
 * mounted afterward (does not unmount on scroll-away). Used to avoid running dozens
 * of live animated previews at once on the components gallery and landing showcase.
 */
export default function LazyMount({ children, className, rootMargin = "200px" }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {shouldMount ? children : null}
    </div>
  );
}
