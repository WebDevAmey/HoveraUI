import type { Metadata } from "next";
import GuideLayout, { GuideSection, GuideCode } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "Installation",
  description: "Two ways to install: the @hovera registry shorthand, or a plain registry URL. Both use the standard shadcn CLI.",
};

export default function Page() {
  return (
    <GuideLayout slug="installation" title="Installation" lead="Two ways to install: the @hovera registry shorthand, or a plain registry URL. Both use the standard shadcn CLI.">

      <GuideSection title="Registry shorthand (recommended)">
        <p>Add the registry once to your project&apos;s <code>components.json</code>:</p>
        <GuideCode>{'"registries": { "@hovera": "https://<registry-host>/r/{name}.json" }'}</GuideCode>
        <p>Then install any component by slug:</p>
        <GuideCode>{"npx shadcn@latest add @hovera/spotlight-card"}</GuideCode>
      </GuideSection>
      <GuideSection title="Direct URL">
        <GuideCode>{"npx shadcn@latest add https://<registry-host>/r/spotlight-card.json"}</GuideCode>
      </GuideSection>
      <GuideSection title="Manual">
        <p>
          Every component page has a Code tab with the full source — copy it into{" "}
          <code>components/ui/&lt;slug&gt;.tsx</code>. Components declaring dependencies (framer-motion,
          @radix-ui/react-tabs, cmdk) need those installed.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
