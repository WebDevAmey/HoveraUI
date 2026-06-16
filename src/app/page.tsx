import Hero from "@/components/layout/Hero";
import ComponentGrid from "@/showcase/GridComponent";
import HomeShell from "@/components/layout/HomeShell";
import Sidebar from "@/components/layout/Sidebar";
import PreviewBackground from "@/components/PreviewBackground";
import CommandPalette from "@/components/CommandPalette";
import { Toaster } from "@/components/Toast";
import { PreviewProvider } from "@/context/PreviewContext";
import { AppProvider } from "@/context/AppContext";

export default function Home() {
  return (
    <AppProvider>
      <PreviewProvider>
        <PreviewBackground />
        <Toaster />
        <CommandPalette />

        <div className="flex h-screen overflow-hidden">
          <Sidebar />

          <HomeShell>
            <div className="mx-auto max-w-5xl px-6 pb-20">
              <Hero />
              <ComponentGrid />
            </div>
          </HomeShell>
        </div>
      </PreviewProvider>
    </AppProvider>
  );
}
