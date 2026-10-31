import type { Metadata } from "next";
import { CodeBlock } from "@/components/site/code-block";
import { DocPage } from "@/components/site/doc-page";

export const metadata: Metadata = {
  title: "Tokens",
  description: "The colours, fonts, radii and easings every HoveraUI component reads from.",
};

const tokenGroups = [
  { name: "Neutrals", note: "Switch with the theme.", tokens: ["--hv-canvas", "--hv-surface", "--hv-raised", "--hv-sunken", "--hv-ink", "--hv-ink-2", "--hv-ink-3", "--hv-line", "--hv-line-strong"] },
  { name: "Accent", note: "The only colour in the site chrome.", tokens: ["--hv-accent", "--hv-accent-ink"] },
  { name: "Materials", note: "Used inside components. The same in both themes.", tokens: ["--hv-gilt-hi", "--hv-gilt", "--hv-gilt-lo", "--hv-ether-1", "--hv-ether-2", "--hv-ether-3", "--hv-sky-hi", "--hv-sky-lo", "--hv-oxblood", "--hv-phosphor", "--hv-amber"] },
];

export default function TokensPage() {
  return (
    <DocPage
      title="Tokens"
      lead="Components read only from --hv-* custom properties. Change a value and every component follows."
    >
      {tokenGroups.map((group) => (
        <section key={group.name}>
          <h2>{group.name}</h2>
          <p>{group.note}</p>
          <ul className="!m-0 !mt-4 grid !list-none grid-cols-2 gap-2 !p-0 sm:grid-cols-3">
            {group.tokens.map((token) => (
              <li key={token} className="!m-0 flex items-center gap-3 rounded-lg border border-line bg-surface p-2">
                <span className="size-7 shrink-0 rounded-md border border-line" style={{ background: `var(${token})` }} />
                <span className="truncate font-mono text-[11px] text-ink-2">{token}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Type</h2>
      <ul>
        <li>
          <code>--hv-font-sans</code>: Geist, for UI and prose.
        </li>
        <li>
          <code>--hv-font-mono</code>: Geist Mono, for labels, metadata and code.
        </li>
        <li>
          <code>--hv-font-serif</code>: Newsreader, for headlines moments and the luxury and editorial components.
        </li>
      </ul>

      <h2>Theming</h2>
      <p>
        With no attribute set, the system colour scheme decides. Set <code>data-theme=&quot;light&quot;</code> or{" "}
        <code>data-theme=&quot;dark&quot;</code> on <code>&lt;html&gt;</code> to force one, or on any element to theme just
        that subtree. To avoid a flash on load, restore the saved choice with a small inline script in{" "}
        <code>&lt;head&gt;</code>:
      </p>
      <CodeBlock
        title="app/layout.tsx"
        code={`<script
  dangerouslySetInnerHTML={{
    __html: \`try{var t=localStorage.getItem("hv-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}\`,
  }}
/>`}
      />

      <h2>Motion</h2>
      <p>
        Interactions run between 150 and 300ms (<code>--hv-dur-1</code> to <code>--hv-dur-3</code>) on{" "}
        <code>--hv-ease-out</code> or the CSS <code>linear()</code> spring in <code>--hv-ease-spring</code>. Ambient loops
        are slow, pause when off-screen or in a background tab, and stop entirely under{" "}
        <code>prefers-reduced-motion: reduce</code>.
      </p>

      <h2>Shape</h2>
      <p>
        Radii run <code>--hv-r-1</code> (4px), <code>--hv-r-2</code> (8px), <code>--hv-r-3</code> (12px),{" "}
        <code>--hv-r-4</code> (20px) and <code>--hv-r-pill</code>.
      </p>
    </DocPage>
  );
}
