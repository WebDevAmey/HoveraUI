import Hero from "@/components/layout/Hero";
import Grid from "@/components/Grid";
import ButtonGrid from "@/components/ButtonGrid";
import Footer from "@/components/layout/Footer";
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
              <Grid />
              <ButtonGrid />
            </div>
            <Footer />
          </HomeShell>
        </div>
      </PreviewProvider>
    </AppProvider>
  );
}
