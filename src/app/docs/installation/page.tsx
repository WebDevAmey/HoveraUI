import type { Metadata } from "next";
import GuideLayout, { GuideSection } from "@/components/docs/GuideLayout";
import { CLIInstall, ManualStep, InstallHeading, PackageCommand } from "@/components/docs/Installation";

export const metadata: Metadata = {
  title: "Installation",
  description: "Add Hovera UI components to your project via CLI or manual copy-paste.",
};

export default function Page() {
  return (
    <GuideLayout
      slug="installation"
      title="Installation"
      lead="Add Hovera UI components to your project via CLI or manual copy-paste. Two approaches, same result."
    >
      <GuideSection title="CLI (recommended)">
        <p>
          Install any component directly with the shadcn CLI. Make sure your project is set up with
          shadcn/ui first, then run:
        </p>
        <CLIInstall componentName="spotlight-card" />
      </GuideSection>

      <GuideSection title="Manual installation">
        <p>
          Follow these steps to add Hovera UI components without the CLI.
        </p>

        <div className="mt-6">
          <InstallHeading>Setup steps</InstallHeading>

          <ManualStep step={1} title="Add the registry URL">
            <p>
              Add the Hovera UI registry to your project&rsquo;s <code>components.json</code>:
            </p>
            <div className="rounded-lg border border-border bg-surface-1 p-4 font-mono text-sm text-foreground">
              {`{ "registries": { "@hovera": "https://backlab.dev/r/{name}.json" } }`}
            </div>
          </ManualStep>

          <ManualStep step={2} title="Install dependencies">
            <p>
              Components may require these peer dependencies. Install them first:
            </p>
            <PackageCommand
              commands={{
                npm: "npm install framer-motion clsx tailwind-merge class-variance-authority",
                pnpm: "pnpm add framer-motion clsx tailwind-merge class-variance-authority",
                bun: "bun add framer-motion clsx tailwind-merge class-variance-authority",
                yarn: "yarn add framer-motion clsx tailwind-merge class-variance-authority",
              }}
            />
          </ManualStep>

          <ManualStep step={3} title="Copy the component source">
            <p>
              Navigate to the component page, switch to the Code tab, and copy the full source into{" "}
              <code>components/ui/&lt;component-name&gt;.tsx</code>.
            </p>
          </ManualStep>
        </div>
      </GuideSection>

      <GuideSection title="Registry URL patterns">
        <p>
          Every component exposes a registry JSON at <code>/r/&lt;slug&gt;.json</code>.
          Point the CLI at it directly without adding it to components.json:
        </p>
        <div className="rounded-lg border border-border bg-surface-1 p-4 font-mono text-sm text-foreground">
          npx shadcn@latest add https://backlab.dev/r/spotlight-card.json
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
