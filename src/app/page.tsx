import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import CommandPaletteWithTrigger from "@/components/landing/CommandPaletteWithTrigger";
import { PixelHero } from "@/components/landing/PixelHero";
import TechStack from "@/components/landing/TechStack";
import StatsRow from "@/components/landing/StatsRow";
import SignatureShowcase from "@/components/landing/SignatureShowcase";
import ShowcaseGrid from "@/components/landing/ShowcaseGrid";
import AnticipatoryScenes from "@/components/landing/AnticipatoryScenes";
import StoryStrip from "@/components/landing/StoryStrip";
import Marquee from "@/components/landing/Marquee";
import QuickStart from "@/components/landing/QuickStart";
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
      <main>
        <PixelHero
          word1="Hover"
          word2="First."
          description="Interfaces that respond before you click. Over thirty signature components built around hover, motion, and tasteful color accents."
          primaryCta="Browse components"
          primaryHref="/components"
          secondaryCta="View GitHub"
          githubUrl="https://github.com/WebDevAmey/HoveraUI"
        />
        <TechStack />
        <StatsRow />
        <SignatureShowcase />
        <ShowcaseGrid />
        <AnticipatoryScenes />
        <StoryStrip />
        <Marquee />
        <QuickStart />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
