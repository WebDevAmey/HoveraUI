import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const uiDir = path.join(process.cwd(), "src/components/ui");

export type SourceFile = { name: string; code: string };

/** Reads the real component files, so the docs always show what ships. */
export function getSource(slug: string): SourceFile[] {
  return [`${slug}.tsx`, `${slug}.module.css`]
    .map((name) => ({ name, file: path.join(uiDir, slug, name) }))
    .filter(({ file }) => existsSync(file))
    .map(({ name, file }) => ({ name, code: readFileSync(file, "utf8") }));
}

/** Minified + gzipped size written by scripts/build-registry.mjs. */
export function getSize(slug: string): number | undefined {
  const file = path.join(process.cwd(), "src/registry/sizes.json");
  if (!existsSync(file)) return undefined;
  const sizes = JSON.parse(readFileSync(file, "utf8")) as Record<string, number>;
  return sizes[slug];
}

export function formatBytes(bytes: number): string {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} kB`;
}
