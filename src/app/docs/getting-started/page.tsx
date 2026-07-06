import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout, { GuideSection, GuideCode } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "Getting started",
  description: "HoveraUI is a monochrome effect library: ~36 signature interactions rendered entirely in black and white, installable one file at a time through the shadcn CLI.",
};

export default function Page() {
  return (
    <GuideLayout slug="getting-started" title="Getting started" lead="HoveraUI is a monochrome effect library: ~36 signature interactions rendered entirely in black and white, installable one file at a time through the shadcn CLI.">

      <GuideSection title="Pick an effect">
        <p>
          Browse the <Link href="/components" className="text-foreground underline underline-offset-4">component gallery</Link> — every
          preview is live. Hover, press, and move your cursor; the effects are the product.
        </p>
      </GuideSection>
      <GuideSection title="Install it">
        <GuideCode>{"npx shadcn@latest add @hovera/displacement-text"}</GuideCode>
        <p>
          The exact file you previewed lands in <code>components/ui/</code> in your project, with any npm
          dependencies installed automatically. No wrapper package, no lock-in — see the{" "}
          <Link href="/docs/installation" className="text-foreground underline underline-offset-4">installation guide</Link> for the registry setup.
        </p>
      </GuideSection>
      <GuideSection title="Use it">
        <GuideCode>{'import DisplacementText from "@/components/ui/displacement-text"\n\nexport function Hero() {\n  return <DisplacementText text="HOVERA" />\n}'}</GuideCode>
      </GuideSection>
    </GuideLayout>
  );
}
