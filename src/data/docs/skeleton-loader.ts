import type { ComponentDocEntry } from "@/types/docs";
import { loaders } from "@/data/loader";
import { classifyStack } from "@/lib/classify-stack";
import SkeletonLoader from "@/components/loaders/SkeletonLoader";

const skeletonLoader = loaders.find((l) => l.slug === "skeleton-loader")!;

export const skeletonLoaderDoc: ComponentDocEntry = {
  slug: "skeleton-loader",
  name: "Skeleton Loader",
  description: skeletonLoader.description ?? "",
  category: "loaders",
  stack: classifyStack(skeletonLoader.code),
  isNew: true,
  story:
    "A light sweep passes over placeholder blocks arranged in layout-true positions, promising the real content's shape before it arrives. The sweep is a pure transform, and reduced-motion users get calm static blocks instead of movement.",
  Preview: SkeletonLoader,
  code: skeletonLoader.code,
  usage: `import SkeletonLoader from "@/components/ui/skeleton-loader"

export function CardFallback() {
  return <SkeletonLoader lines={4} showAvatar />
}`,
  dependencies: [],
  props: [
    { name: "lines", type: "number", default: "3", description: "Number of text-line placeholders below the header row." },
    { name: "showAvatar", type: "boolean", default: "true", description: "Show the circular avatar placeholder." },
    { name: "className", type: "string", default: '""', description: "Extra classes merged onto the card." },
  ],
};
