const STACK = ["React", "Next.js", "Tailwind CSS", "Framer Motion"];

export default function TechStack() {
  return (
    <div className="border-b border-border bg-secondary/20 px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {STACK.map((name) => (
          <span key={name} className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
