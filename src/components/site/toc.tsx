"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * "On this page": the section you are reading is marked by a short bar that glides along a
 * hairline as you scroll. Links jump; the bar follows.
 */
export function Toc({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0]?.id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top < 160) current = section.id;
      }
      // At the very bottom the last short section may never reach the line; give it the mark.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1]?.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  useLayoutEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const bar = barRef.current;
    if (!link || !bar) return;
    bar.style.transform = `translateY(${link.offsetTop}px)`;
    bar.style.height = `${link.offsetHeight}px`;
    bar.style.opacity = "1";
  }, [active]);

  return (
    <nav aria-label="On this page" className="text-[13px]">
      <p className="mb-3 text-[12px] font-medium text-ink-3">On this page</p>
      <ol ref={listRef} className="relative border-l border-line">
        <span
          ref={barRef}
          aria-hidden="true"
          className="absolute -left-px top-0 w-px bg-ink opacity-0 transition-[transform,height] duration-[240ms] ease-[var(--hv-ease-out)] motion-reduce:transition-none"
        />
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              data-id={section.id}
              aria-current={active === section.id ? "location" : undefined}
              className="block py-1.5 pl-4 text-ink-3 transition-colors duration-150 hover:text-ink-2 aria-[current=location]:text-ink"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
