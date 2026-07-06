import type { Metadata } from "next";
import GuideLayout, { GuideSection, GuideCode } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "Theming",
  description: "Hovera UI uses CSS custom properties for colors, surfaces, and motion tokens — all customizable from your global stylesheet.",
};

export default function Page() {
  return (
    <GuideLayout slug="theming" title="Theming" lead="Hovera UI uses CSS custom properties for colors, surfaces, and motion tokens — all customizable from your global stylesheet.">

      <GuideSection title="Color tokens">
        <p>
          The brand accent defaults to an indigo-violet palette (<code>--hovera-accent</code>, <code>--accent-locked</code>).
          Override these variables in your <code>globals.css</code> to match your brand:
        </p>
        <GuideCode>{"--hovera-accent: #6d28d9;\n--hovera-accent-foreground: #ffffff;\n--accent-locked: #6d28d9;\n--accent-locked-muted: rgba(109, 40, 217, 0.08);"}</GuideCode>
      </GuideSection>
      <GuideSection title="Surface tokens">
        <p>
          Surfaces use a three-tier depth system: <code>--surface-0</code> (base), <code>--surface-1</code> (elevated),
          and <code>--surface-2</code> (prominent). On dark mode these provide real depth instead of a single flat
          inversion.
        </p>
      </GuideSection>
      <GuideSection title="Dark and light">
        <p>
          The docs site runs both themes via <code>next-themes</code>. Most effects are designed dark-first
          (light on dark); several read equally well inverted. Each component page previews the real rendering.
        </p>
      </GuideSection>
      <GuideSection title="Motion tokens">
        <GuideCode>{"--ease-flow: cubic-bezier(0.16, 1, 0.3, 1);\n--duration-fast: 150ms;\n--duration-base: 300ms;\n--duration-slow: 450ms;"}</GuideCode>
      </GuideSection>
    </GuideLayout>
  );
}
