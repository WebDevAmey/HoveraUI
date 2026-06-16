import Hero from "@/components/layout/Hero";
import ComponentGrid from "@/showcase/GridComponent";
import HomeShell from "@/components/layout/HomeShell";
import PreviewBackground from "@/components/PreviewBackground";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import CategoryFilter from "@/components/CategoryFilter";
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

        <HomeShell>
          <Navbar />
          <CategoryFilter />

          <div className="mx-auto max-w-7xl px-6 pb-20">
            <Hero />
            <ComponentGrid />
          </div>
        </HomeShell>
      </PreviewProvider>
    </AppProvider>
  );
}
