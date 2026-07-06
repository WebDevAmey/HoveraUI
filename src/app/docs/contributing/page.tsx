import type { Metadata } from "next";
import GuideLayout, { GuideSection } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "Contributing",
  description: "Adding a component is a pull request — no forms, no backend. Every component ships as a single self-contained file.",
};

export default function Page() {
  return (
    <GuideLayout slug="contributing" title="Contributing" lead="Adding a component is a pull request — no forms, no backend. Every component ships as a single self-contained file.">

      <GuideSection title="The flow">
        <p>
          Create the component under <code>src/components/&lt;category&gt;/</code>, add its entry (with the
          exact source as the <code>code</code> string) in <code>src/data/</code>, add a doc entry, and run
          the four gates: <code>build:registry</code>, <code>build</code>, <code>lint</code>,{" "}
          <code>tsc --noEmit</code>. Full details live in{" "}
          <a href="https://github.com/WebDevAmey/HoveraUI/blob/main/CONTRIBUTING.md" className="text-foreground underline underline-offset-4">CONTRIBUTING.md</a>.
        </p>
      </GuideSection>
      <GuideSection title="Design constraint">
        <p>
          Every component should work in both light and dark mode. Effects rely on hover-first interactions:
          light, shadow, blur, displacement, motion, and tasteful accent colors.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
