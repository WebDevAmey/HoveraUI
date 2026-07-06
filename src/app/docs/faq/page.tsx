import type { Metadata } from "next";
import GuideLayout, { GuideSection } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Short answers to the questions that come up.",
};

export default function Page() {
  return (
    <GuideLayout slug="faq" title="FAQ" lead="Short answers to the questions that come up.">

      <GuideSection title="Why black and white only?">
        <p>
          Every effect library leans on color and gradients. HoveraUI is the counter-bet: effects strong
          enough to carry attention with nothing but light and motion. The constraint is the brand.
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
