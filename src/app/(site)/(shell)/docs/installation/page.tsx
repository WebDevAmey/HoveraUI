import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/site/code-block";
import { DocPage } from "@/components/site/doc-page";

export const metadata: Metadata = {
  title: "Installation",
  description: "Add HoveraUI components by copying source or with the shadcn CLI.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoveraui.vercel.app";

export default function InstallationPage() {
  return (
    <DocPage title="Installation" lead="Two shared files, then one folder per component.">
      <h2>1. Add the tokens</h2>
      <p>
        Copy <code>tokens.css</code> from the repository into your project and import it from your global stylesheet.
      </p>
      <CodeBlock title="app/globals.css" code={`@import "./hovera-tokens.css";`} />

      <h2>2. Add the cn helper</h2>
      <p>
        Components import it as <code>@/lib/cn</code>. Change the import if your project uses another alias.
      </p>
      <CodeBlock
        title="lib/cn.ts"
        code={`type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}`}
      />

      <h2>3. Copy a component</h2>
      <p>
        Open any <Link href="/components">component</Link>, copy its <code>.tsx</code> and <code>.module.css</code> into{" "}
        <code>components/ui/&lt;name&gt;/</code>, and import it.
      </p>

      <h2>Or use the CLI</h2>
      <p>
        Every component is also a shadcn-compatible registry item, built from the same files you see in the docs. The CLI
        pulls the component, its CSS module, the tokens and the helper in one step.
      </p>
      <CodeBlock title="Terminal" code={`npx shadcn@latest add ${siteUrl}/r/depth-key.json`} />

      <h2>Fonts</h2>
      <p>
        Fonts are optional. The tokens fall back to system stacks, and pick up Geist, Geist Mono and Instrument Serif when
        they are loaded through <code>next/font</code> with the variables <code>--font-geist-sans</code>,{" "}
        <code>--font-geist-mono</code> and <code>--font-instrument-serif</code>.
      </p>
    </DocPage>
  );
}
