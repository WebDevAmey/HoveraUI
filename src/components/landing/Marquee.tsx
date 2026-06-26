// Placeholder example feedback, not real attributed quotes. Swap in real
// testimonials once Hovera UI has them.
const QUOTES = [
  { quote: "The hover states feel intentional instead of decorative.", role: "Example feedback, frontend developer" },
  { quote: "Copy, paste, done. The registry install just works.", role: "Example feedback, indie hacker" },
  { quote: "First component library where the motion doesn't fight the layout.", role: "Example feedback, design engineer" },
  { quote: "Props tables that actually match the code. Refreshing.", role: "Example feedback, open source maintainer" },
];

export default function Marquee() {
  const loop = [...QUOTES, ...QUOTES];

  return (
    <div className="border-b border-border bg-secondary/10 py-12">
      <div className="overflow-hidden" aria-label="Example feedback">
        <div className="animate-marquee flex w-max gap-6 px-4">
          {loop.map((item, i) => (
            <figure
              key={`${item.role}-${i}`}
              className="w-72 shrink-0 rounded-[var(--radius-card)] border border-border bg-card p-5"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs text-muted-foreground">{item.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
