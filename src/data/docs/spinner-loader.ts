import type { ComponentDocEntry } from "@/types/docs";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";

export const spinnerLoaderDoc: ComponentDocEntry = {
  slug: "spinner-loader",
  name: "Spinner Loader",
  description: "A simple indeterminate spinner with a status label, useful for inline loading states.",
  category: "loaders",
  stack: "tailwind",
  isNew: true,
  story: "A spinning ring paired with a status label, built so the eye has both motion and text to confirm something is happening.",
  needsLightPreview: true,
  Preview: SpinnerLoader,
  code: `<div className="flex flex-col items-center justify-center space-y-2">
  <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
  <p className="text-sm font-medium tracking-wide text-slate-500">Loading data...</p>
</div>`,
  usage: `import SpinnerLoader from "@/components/ui/spinner-loader"

export function SpinnerLoaderDemo() {
  return <SpinnerLoader />
}`,
  dependencies: [],
  props: [],
};
