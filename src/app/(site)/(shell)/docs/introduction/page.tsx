import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/site/doc-page";
import { registry } from "@/registry";
import { categories } from "@/registry/types";

export const metadata: Metadata = {
  title: "Introduction",
  description: "What HoveraUI is, how it is built, and how to use it.",
};

export default function IntroductionPage() {
  return (
    <DocPage
      title="Introduction"
      lead="HoveraUI is a small library of original React components. Each one is built around a single idea and ships as source you own."
    >
      <h2>What you get</h2>
      <ul>
        <li>
          <strong>{registry.length} components</strong> across {categories.length} groups:{" "}
          {categories.map((c) => c.label.toLowerCase()).join(", ")}.
        </li>
        <li>
          <strong>Live examples.</strong> Every component page runs the real component, in both themes and at phone width.
        </li>
        <li>
          <strong>Source in your project.</strong> Two files per component, a <code>.tsx</code> and a CSS module. Change anything.
        </li>
        <li>
          <strong>No dependencies.</strong> React, a six-line <code>cn</code> helper and one tokens stylesheet. Nothing else.
        </li>
      </ul>

      <h2>Philosophy</h2>
      <p>
        Every component exists because of one idea: a keycap that has a wall, a fill that arrives through a dither
        matrix, a sky behind a cutout. If an idea already lives in another library, it does not belong here. The
        components carry their own materials, from pixel grids to gilt foil, so the site around them stays quiet.
      </p>
      <p>
        Motion implies mass and stays short. Nothing needs animation to work, and every component falls back to a still
        state when the system asks for reduced motion.
      </p>

      <h2>Where to start</h2>
      <ul>
        <li>
          Set up the tokens and helper in <Link href="/docs/installation">Installation</Link>.
        </li>
        <li>
          See every colour, font and easing in <Link href="/docs/tokens">Tokens</Link>.
        </li>
        <li>
          Browse the <Link href="/components">components</Link>, or pick one from the sidebar.
        </li>
      </ul>
    </DocPage>
  );
}
