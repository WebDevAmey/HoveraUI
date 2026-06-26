import type { ComponentDocEntry } from "@/types/docs";
import { loaders } from "@/data/loader";

function usageFor(slug: string, componentName: string) {
  return `import ${componentName} from "@/components/ui/${slug}"\n\nexport function ${componentName}Demo() {\n  return <${componentName} />\n}`;
}

const STORIES: Record<string, string> = {
  "bouncing-dots-loader": "Three dots bounce in a staggered sequence, each delayed slightly behind the last, the classic typing-indicator rhythm.",
  "mercury-loader": "Three blurred blobs ease toward the center and apart again, a gooey SVG filter fusing them into one shape mid-motion.",
};

// spinner-loader is migrated separately in ./spinner-loader.ts (the original worked example).
export const loaderDocs: ComponentDocEntry[] = loaders
  .filter((ldr) => ldr.slug !== "spinner-loader")
  .map((ldr) => {
    const componentName = ldr.name.replace(/[^a-zA-Z0-9]/g, "");

    return {
      slug: ldr.slug,
      name: ldr.name.trim(),
      description: `A self-contained loading indicator, ${ldr.name.trim().toLowerCase()}.`,
      category: "loaders",
      story: STORIES[ldr.slug],
      Preview: ldr.component,
      code: ldr.code,
      usage: usageFor(ldr.slug, componentName),
      dependencies: [],
      props: [],
      needsLightPreview: ldr.needsLightPreview,
    };
  });
