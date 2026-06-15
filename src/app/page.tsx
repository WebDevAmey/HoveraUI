import Hero from "@/components/layout/Hero";
import ComponentGrid from "@/showcase/GridComponent";
import HomeShell from "@/components/layout/HomeShell";
import PreviewBackground from "@/components/PreviewBackground";
import { PreviewProvider } from "@/context/PreviewContext";

export default function Home() {
  return (
    <PreviewProvider>
      <PreviewBackground />

      <HomeShell>
        <Hero />

        <section className="max-w-7xl mx-auto px-6">

          <ComponentGrid />

        </section>
      </HomeShell>
    </PreviewProvider>
  );
}
