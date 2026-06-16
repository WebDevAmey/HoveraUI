"use client";

export default function HomeShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative z-10 min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
      {children}
    </main>
  );
}
