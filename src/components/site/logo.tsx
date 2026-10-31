import Link from "next/link";

/** A 3×3 dot mark: one cell lit, the rest at rest. */
export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 rounded-md text-ink" aria-label="HoveraUI home">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        {[0, 1, 2].flatMap((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 6 + 1}
              y={row * 6 + 1}
              width="4"
              height="4"
              rx="1"
              fill={row === 0 && col === 2 ? "var(--hv-accent)" : "currentColor"}
              opacity={row === 0 && col === 2 ? 1 : 0.85}
            />
          )),
        )}
      </svg>
      <span className="text-[15px] font-medium tracking-[-0.02em]">
        Hovera<span className="text-ink-2">UI</span>
      </span>
    </Link>
  );
}
