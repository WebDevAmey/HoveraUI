import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import CommandPaletteWithTrigger from "@/components/landing/CommandPaletteWithTrigger";
import Hero from "@/components/landing/Hero";
import TechStack from "@/components/landing/TechStack";
import StatsRow from "@/components/landing/StatsRow";
import DiscoverPaths from "@/components/landing/DiscoverPaths";
import ShowcaseGrid from "@/components/landing/ShowcaseGrid";
import NewArrivals from "@/components/landing/NewArrivals";
import StoryStrip from "@/components/landing/StoryStrip";
import Marquee from "@/components/landing/Marquee";
import FinalCTA from "@/components/landing/FinalCTA";

export const metadata: Metadata = {
  title: "Hovera UI — Hover-first React component library",
  description:
    "A shadcn-compatible library of hover-first buttons, loaders, navbars and backgrounds. Preview live, copy the code, or install via the CLI.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandPaletteWithTrigger />
      <Hero />
      <TechStack />
      <StatsRow />
      <DiscoverPaths />
      <ShowcaseGrid />
      <NewArrivals />
      <StoryStrip />
      <Marquee />
      <FinalCTA />
      <Footer />
    </div>
  );
}
