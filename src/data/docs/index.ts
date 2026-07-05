import type { ComponentDocEntry } from "@/types/docs";
import { glowButtonDoc } from "@/data/docs/glow-button";
import { spinnerLoaderDoc } from "@/data/docs/spinner-loader";
import { backgroundDocs } from "@/data/docs/backgrounds";
import { buttonDocs } from "@/data/docs/buttons";
import { loaderDocs } from "@/data/docs/loaders";
import { navbarDocs } from "@/data/docs/navbars";
import { cardDocs } from "@/data/docs/cards";
import { tabDocs } from "@/data/docs/tabs";
import { marqueeDocs } from "@/data/docs/marquees";
import { textDocs } from "@/data/docs/texts";
import { sectionDocs } from "@/data/docs/sections";
import { commandDocs } from "@/data/docs/command";
import { floatingNavbarDoc } from "@/data/docs/floating-navbar";
import { skeletonLoaderDoc } from "@/data/docs/skeleton-loader";

export const docEntries: ComponentDocEntry[] = [
  glowButtonDoc,
  ...buttonDocs,
  spinnerLoaderDoc,
  ...loaderDocs,
  ...backgroundDocs,
  ...navbarDocs,
  floatingNavbarDoc,
  skeletonLoaderDoc,
  ...cardDocs,
  ...tabDocs,
  ...marqueeDocs,
  ...textDocs,
  ...sectionDocs,
  ...commandDocs,
];

export function findDocEntry(slug: string): ComponentDocEntry | undefined {
  return docEntries.find((entry) => entry.slug === slug);
}
