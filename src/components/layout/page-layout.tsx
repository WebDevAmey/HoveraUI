"use client";

import SiteNav from "@/components/layout/SiteNav";
import AppSidebar from "@/components/layout/app-sidebar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/CommandPalette";
import { useApp } from "@/context/AppContext";
import { SidebarProvider } from "@/components/layout/sidebar-provider";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <SidebarProvider>
      <PageLayoutInner>{children}</PageLayoutInner>
    </SidebarProvider>
  );
}

function PageLayoutInner({ children }: PageLayoutProps) {
  const { setCommandOpen } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandPalette />
      <div className="flex flex-1">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <SiteNav onOpenCommand={() => setCommandOpen(true)} />
          <main className="flex-1 overflow-y-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
