import type { ComponentDocEntry } from "@/types/docs";
import { glowButtonDoc } from "@/data/docs/glow-button";
import { spinnerLoaderDoc } from "@/data/docs/spinner-loader";

export const docEntries: ComponentDocEntry[] = [glowButtonDoc, spinnerLoaderDoc];

export function findDocEntry(slug: string): ComponentDocEntry | undefined {
  return docEntries.find((entry) => entry.slug === slug);
}
