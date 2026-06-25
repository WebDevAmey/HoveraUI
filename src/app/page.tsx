import Hero from "@/components/layout/Hero";
import Grid from "@/components/Grid";
import ButtonGrid from "@/components/ButtonGrid";
import LoaderGrid from "@/components/LoaderGrid";
import NavbarGrid from "@/components/NavbarGrid";
import Footer from "@/components/layout/Footer";
import HomeShell from "@/components/layout/HomeShell";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
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

        <div className="flex h-screen flex-col overflow-hidden">
          <TopNav />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar />

            <HomeShell>
              <div className="mx-auto max-w-5xl px-6 pb-20">
                <Hero />
                <Grid />
                <ButtonGrid />
                <LoaderGrid />
                <NavbarGrid />
              </div>
              <Footer />
            </HomeShell>
          </div>
        </div>
      </PreviewProvider>
    </AppProvider>
  );
}
