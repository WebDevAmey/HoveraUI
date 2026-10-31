// Written by scripts/build-registry.mjs from the real component files,
// so the docs always show exactly what ships.
import generated from "./generated.json";

export type SourceFile = { name: string; code: string };

type Generated = Record<string, { size: number; files: SourceFile[] }>;

const data = generated as Generated;

export function getSource(slug: string): SourceFile[] {
  return data[slug]?.files ?? [];
}

/** Minified + gzipped size in bytes. */
export function getSize(slug: string): number | undefined {
  return data[slug]?.size;
}

export function formatBytes(bytes: number): string {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} kB`;
}
