import type { ComponentDocEntry } from "@/types/docs";
import { loaders } from "@/data/loader";
import { classifyStack } from "@/lib/classify-stack";

function usageFor(slug: string, componentName: string) {
  return `import ${componentName} from "@/components/ui/${slug}"\n\nexport function ${componentName}Demo() {\n  return <${componentName} />\n}`;
}

const STORIES: Record<string, string> = {
  "bouncing-dots-loader": "Three dots bounce in a staggered sequence, each delayed slightly behind the last, the classic typing-indicator rhythm.",
  "mercury-loader": "Three blurred blobs ease toward the center and apart again, a gooey SVG filter fusing them into one shape mid-motion.",
  "skeleton-profile": "A profile card skeleton with a circular avatar and text lines, each pulsing with a shimmer sweep to signal content is loading.",
};

export const loaderDocs: ComponentDocEntry[] = loaders.map((ldr) => {
    const componentName = ldr.name.replace(/[^a-zA-Z0-9]/g, "");

    return {
      slug: ldr.slug,
      name: ldr.name.trim(),
      description: `A self-contained loading indicator, ${ldr.name.trim().toLowerCase()}.`,
      category: "loaders",
      stack: classifyStack(ldr.code),
      story: STORIES[ldr.slug],
      Preview: ldr.component,
      code: ldr.code,
      usage: usageFor(ldr.slug, componentName),
      dependencies: ldr.dependencies ?? [],
      props: [],
      needsLightPreview: ldr.needsLightPreview,
    };
  });
