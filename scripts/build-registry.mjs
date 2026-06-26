// Builds static shadcn registry-item JSON files into public/r/<slug>.json.
// Reuses the same data arrays as src/app/api/registry/[slug]/route.ts so the
// static files and the API route never drift out of sync.
import { build } from "esbuild";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(rootDir, ".registry-build");
const publicDir = path.join(rootDir, "public", "r");

function slugToComponentName(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

async function loadDataArrays() {
  await mkdir(outDir, { recursive: true });

  const entryPath = path.join(outDir, "entry.mjs");
  const entrySource = `
import { backgrounds } from "${path.join(rootDir, "src/data/background.ts").replace(/\\/g, "\\\\")}";
import { buttons } from "${path.join(rootDir, "src/data/button.ts").replace(/\\/g, "\\\\")}";
import { loaders } from "${path.join(rootDir, "src/data/loader.ts").replace(/\\/g, "\\\\")}";
import { navbars } from "${path.join(rootDir, "src/data/navbar.ts").replace(/\\/g, "\\\\")}";

globalThis.__REGISTRY_ITEMS__ = [...backgrounds, ...buttons, ...loaders, ...navbars].map((item) => ({
  slug: item.slug,
  name: item.name,
  code: item.code,
}));
`;
  await writeFile(entryPath, entrySource, "utf8");

  const bundlePath = path.join(outDir, "bundle.cjs");
  await build({
    entryPoints: [entryPath],
    bundle: true,
    platform: "node",
    format: "cjs",
    outfile: bundlePath,
    jsx: "transform",
    loader: { ".ts": "ts", ".tsx": "tsx" },
    logLevel: "silent",
    alias: { "@": path.join(rootDir, "src") },
  });

  const { createRequire } = await import("node:module");
  const req = createRequire(import.meta.url);
  req(bundlePath);

  const items = globalThis.__REGISTRY_ITEMS__;
  delete globalThis.__REGISTRY_ITEMS__;
  return items;
}

function buildRegistryItem(item) {
  const componentName = slugToComponentName(item.slug);
  const indentedCode = item.code
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");

  const content = `export default function ${componentName}() {
  return (
${indentedCode}
  );
}
`;

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.slug,
    type: "registry:component",
    title: item.name,
    files: [
      {
        path: `${item.slug}.tsx`,
        target: `components/ui/${item.slug}.tsx`,
        content,
        type: "registry:component",
      },
    ],
  };
}

async function main() {
  const items = await loadDataArrays();
  await mkdir(publicDir, { recursive: true });

  for (const item of items) {
    const registryItem = buildRegistryItem(item);
    const filePath = path.join(publicDir, `${item.slug}.json`);
    await writeFile(filePath, JSON.stringify(registryItem, null, 2) + "\n", "utf8");
  }

  await rm(outDir, { recursive: true, force: true });

  console.log(`Wrote ${items.length} registry file(s) to public/r/`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
