import type { Metadata } from "next";
import GuideLayout, { GuideSection } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Short answers to the questions that come up.",
};

export default function Page() {
  return (
    <GuideLayout slug="faq" title="FAQ" lead="Short answers to the questions that come up.">

      <GuideSection title="Can I change the accent color?">
        <p>
          Yes. Override the <code>--hovera-accent</code> and <code>--accent-locked</code> CSS custom
          properties in your <code>globals.css</code> to any color you need. Each component file you install
          is yours to edit.
        </p>
      </GuideSection>
      <GuideSection title="Is this a component framework?">
        <p>
          No. Each install copies one self-contained file into your project. There is no runtime package,
          no versioned dependency on HoveraUI, nothing to upgrade or unwind.
        </p>
      </GuideSection>
      <GuideSection title="What happened to the old components?">
        <p>
          The 2026-07 curation retired ~50 generic or color-dependent items to keep only signature effects.
          Retired install URLs return 404; the survivors and their history are in the{" "}
          <a href="https://github.com/WebDevAmey/HoveraUI/blob/main/CHANGELOG.md" className="text-foreground underline underline-offset-4">changelog</a>.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
