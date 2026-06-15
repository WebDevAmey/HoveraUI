import Link from "next/link";

interface CardProps {
  title: string;
  slug: string;
  children: React.ReactNode;
}

export default function ComponentCard({
  title,
  slug,
  children,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden">

      <div className="h-72 relative overflow-hidden">
        {children}
      </div>

      <div className="p-4 flex items-center justify-between">
        <h3>{title}</h3>

        <Link
          href={`/preview/${slug}`}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Preview →
        </Link>
      </div>

    </div>
  );
}