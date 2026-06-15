interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function ComponentCard({
  title,
  children,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden">

      <div className="h-72 relative">
        {children}
      </div>

      <div className="p-4">
        <h3>{title}</h3>
      </div>

    </div>
  );
}