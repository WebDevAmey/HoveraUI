import type { ComponentDocEntry } from "@/types/docs";
import { backgroundDocs } from "@/data/docs/backgrounds";
import { loaderDocs } from "@/data/docs/loaders";
import { navbarDocs } from "@/data/docs/navbars";
import { cardDocs } from "@/data/docs/cards";
import { tabDocs } from "@/data/docs/tabs";
import { textDocs } from "@/data/docs/texts";
import { sectionDocs } from "@/data/docs/sections";
import { commandDocs } from "@/data/docs/command";
import { floatingNavbarDoc } from "@/data/docs/floating-navbar";
import { dockDoc } from "@/data/docs/dock";
import { navbarDoc } from "@/data/docs/navbar";

export const docEntries: ComponentDocEntry[] = [
  ...loaderDocs,
  ...backgroundDocs,
  ...navbarDocs,
  floatingNavbarDoc,
  dockDoc,
  navbarDoc,
  ...cardDocs,
  ...tabDocs,
  ...textDocs,
  ...sectionDocs,
  ...commandDocs,
];

export function findDocEntry(slug: string): ComponentDocEntry | undefined {
  return docEntries.find((entry) => entry.slug === slug);
}
