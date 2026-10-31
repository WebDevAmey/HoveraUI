"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="text-[13px]">
      <h2 className="label mb-3">On this page</h2>
      <ul className="space-y-px border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1 pl-3 transition-colors",
                active === item.id ? "border-ink text-ink" : "border-transparent text-ink-2 hover:text-ink",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
