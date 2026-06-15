import Hero from "@/components/layout/Hero";
import ComponentGrid from "@/showcase/GridComponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Hero />

      <section className="max-w-7xl mx-auto px-6">

        <ComponentGrid />

      </section>

    </main>
  );
}