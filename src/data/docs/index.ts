import type { ComponentDocEntry } from "@/types/docs";
import { glowButtonDoc } from "@/data/docs/glow-button";
import { spinnerLoaderDoc } from "@/data/docs/spinner-loader";
import { backgroundDocs } from "@/data/docs/backgrounds";
import { buttonDocs } from "@/data/docs/buttons";
import { loaderDocs } from "@/data/docs/loaders";
import { navbarDocs } from "@/data/docs/navbars";

export const docEntries: ComponentDocEntry[] = [
  glowButtonDoc,
  ...buttonDocs,
  spinnerLoaderDoc,
  ...loaderDocs,
  ...backgroundDocs,
  ...navbarDocs,
];

export function findDocEntry(slug: string): ComponentDocEntry | undefined {
  return docEntries.find((entry) => entry.slug === slug);
}
