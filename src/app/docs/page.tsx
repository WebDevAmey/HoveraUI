import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/site/code-block";
import { DocsShell } from "@/components/site/docs-shell";
import { Gallery } from "@/components/site/gallery";
import { registry } from "@/registry";

export const metadata: Metadata = {
  title: "Docs",
  description: "Every HoveraUI component, live, plus how to install, theme and copy them.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoveraui.vercel.app";

const toc = [
  { id: "components", label: "Components" },
  { id: "philosophy", label: "Philosophy" },
  { id: "install", label: "Install" },
  { id: "tokens", label: "Tokens" },
  { id: "theming", label: "Theming" },
  { id: "motion", label: "Motion" },
  { id: "registry", label: "Registry" },
];

const tokenGroups = [
  { name: "Neutrals", tokens: ["--hv-canvas", "--hv-surface", "--hv-raised", "--hv-sunken", "--hv-ink", "--hv-ink-2", "--hv-ink-3", "--hv-line", "--hv-line-strong"] },
  { name: "Accent", tokens: ["--hv-accent", "--hv-accent-ink"] },
  { name: "Materials", tokens: ["--hv-gilt-hi", "--hv-gilt", "--hv-gilt-lo", "--hv-ether-1", "--hv-ether-2", "--hv-ether-3", "--hv-sky-hi", "--hv-sky-lo", "--hv-oxblood", "--hv-phosphor", "--hv-amber"] },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-20 pt-14 text-lg font-medium tracking-[-0.02em]">
      {children}
    </h2>
  );
}

const prose = "mt-3 max-w-2xl text-ink-2";
const code = "font-mono text-[13px] text-ink";

export default function DocsPage() {
  return (
    <DocsShell toc={toc}>
      <article>
        <p className="label">Docs · {registry.length} components</p>
        <h1 className="mt-3 text-[clamp(32px,5vw,44px)] font-medium leading-[1.05] tracking-[-0.035em]">Docs</h1>
        <p className="mt-3 max-w-xl text-[17px] text-ink-2">
          HoveraUI is source you copy, not a package you install. Pick a component below, or read on for setup.
        </p>

        <H2 id="components">Components</H2>
        <p className={prose}>Each tile is the real component, running. Open one for its source, props and accessibility notes.</p>
        <div className="mt-6">
          <Gallery syncUrl compact />
        </div>

        <H2 id="philosophy">Philosophy</H2>
        <p className={prose}>
          Every component exists because of one idea: a keycap that has a wall, a fill that arrives through a dither
          matrix, a sky behind a cutout. If an idea already lives in another library, it does not belong here. The
          components carry their own materials, from pixel grids to gilt foil, so the site around them stays quiet.
        </p>
        <p className={prose}>
          Motion implies mass and stays short. Nothing needs animation to work, and every component falls back to a
          still state when the system asks for reduced motion. Each one depends on React and nothing else.
        </p>

        <H2 id="install">Install</H2>
        <p className={prose}>
          Add the tokens stylesheet once, import it from your global CSS, and add the <code className={code}>cn</code> helper.
        </p>
        <div className="mt-4 space-y-4">
          <CodeBlock title="app/globals.css" code={`@import "./hovera-tokens.css";`} />
          <CodeBlock
            title="lib/cn.ts"
            code={`type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}`}
          />
        </div>
        <p className={prose}>
          Then open any <Link href="#components" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">component</Link>,
          copy its <code className={code}>.tsx</code> and <code className={code}>.module.css</code> into{" "}
          <code className={code}>components/ui/&lt;name&gt;/</code>, and import it. The components expect the path alias{" "}
          <code className={code}>@/lib/cn</code>; change the import if your project uses another.
        </p>
        <p className={prose}>
          Fonts are optional. The tokens fall back to system stacks, and pick up Geist, Geist Mono and Instrument Serif
          when they are loaded through <code className={code}>next/font</code> with the variables{" "}
          <code className={code}>--font-geist-sans</code>, <code className={code}>--font-geist-mono</code> and{" "}
          <code className={code}>--font-instrument-serif</code>.
        </p>

        <H2 id="tokens">Tokens</H2>
        <p className={prose}>
          Components read only from <code className={code}>--hv-*</code> custom properties. Change a value and every
          component follows. Neutrals and the accent switch with the theme; material colours stay the same in both.
        </p>
        <div className="mt-6 space-y-8">
          {tokenGroups.map((group) => (
            <div key={group.name}>
              <h3 className="label">{group.name}</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.tokens.map((token) => (
                  <li key={token} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-2">
                    <span className="size-7 shrink-0 rounded-md border border-line" style={{ background: `var(${token})` }} />
                    <span className="truncate font-mono text-[11px] text-ink-2">{token}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <H2 id="theming">Theming</H2>
        <p className={prose}>
          With no attribute set, the system colour scheme decides. Set <code className={code}>data-theme=&quot;light&quot;</code>{" "}
          or <code className={code}>data-theme=&quot;dark&quot;</code> on <code className={code}>&lt;html&gt;</code> to force one,
          or on any element to theme just that subtree. To avoid a flash on load, restore the saved choice with a
          small inline script in <code className={code}>&lt;head&gt;</code>:
        </p>
        <div className="mt-4">
          <CodeBlock
            title="app/layout.tsx"
            code={`<script
  dangerouslySetInnerHTML={{
    __html: \`try{var t=localStorage.getItem("hv-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}\`,
  }}
/>`}
          />
        </div>

        <H2 id="motion">Motion</H2>
        <p className={prose}>
          Interactions run between 150 and 300ms on <code className={code}>--hv-ease-out</code> or the CSS{" "}
          <code className={code}>linear()</code> spring in <code className={code}>--hv-ease-spring</code>. Ambient loops are
          slow, pause when off-screen or in a background tab, and stop entirely under{" "}
          <code className={code}>prefers-reduced-motion: reduce</code>.
        </p>

        <H2 id="registry">Registry</H2>
        <p className={prose}>
          Every component is also published as a shadcn-compatible registry item, built from the same files you see in
          the docs. The CLI pulls the component, its CSS module, the tokens and the helper in one step.
        </p>
        <div className="mt-4">
          <CodeBlock title="Terminal" code={`npx shadcn@latest add ${siteUrl}/r/depth-key.json`} />
        </div>
      </article>
    </DocsShell>
  );
}
