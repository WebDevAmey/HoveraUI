import type { ComponentDocEntry } from "@/types/docs";
import { navbars } from "@/data/navbar";
import { classifyStack } from "@/lib/classify-stack";

function usageFor(slug: string, componentName: string) {
  return `import ${componentName} from "@/components/ui/${slug}"\n\nexport function ${componentName}Demo() {\n  return <${componentName} />\n}`;
}

const STORIES: Record<string, string> = {
  "aether-navbar": "A floating pill navbar in dark glass with a cyan glow, the kind of chrome that reads as technical and self-contained.",
  "vertex-navbar": "A rose-tinted pill navbar with backdrop blur, links that swap to a filled rose background on hover.",
  "radical-navbar": "A flat, hard-edged yellow and black navbar with a heavy offset shadow, leaning into a brutalist, poster-like style.",
};

// floating-navbar has a hand-written rich entry in ./floating-navbar.ts.
// navbar has a hand-written rich entry in ./navbar.ts.
export const navbarDocs: ComponentDocEntry[] = navbars
  .filter((nav) => nav.slug !== "floating-navbar" && nav.slug !== "navbar")
  .map((nav) => {
  const componentName = nav.name.replace(/[^a-zA-Z0-9]/g, "");

  return {
    slug: nav.slug,
    name: nav.name.trim(),
    description: `A floating navigation bar, ${nav.name.trim().toLowerCase()}.`,
    category: "navbars",
    stack: classifyStack(nav.code),
    story: STORIES[nav.slug],
    Preview: nav.component,
    code: nav.code,
    usage: usageFor(nav.slug, componentName),
    dependencies: nav.dependencies ?? [],
    props: [],
    needsLightPreview: nav.needsLightPreview,
  };
});
