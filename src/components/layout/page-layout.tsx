"use client";

import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/CommandPalette";
import { useApp } from "@/context/AppContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { setCommandOpen } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandPalette />
      <SiteNav onOpenCommand={() => setCommandOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
