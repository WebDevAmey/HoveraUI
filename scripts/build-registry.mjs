// Builds static shadcn registry files into public/r/:
//   - one registry-item JSON per component  -> public/r/<slug>.json
//   - a registry index                      -> public/r/registry.json
// Reads the same data arrays that render the site (src/data/*.ts), so the
// docs pages and the installable registry never drift out of sync.
import { build } from "esbuild";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(rootDir, ".registry-build");
const publicDir = path.join(rootDir, "public", "r");

const REGISTRY_NAME = "hovera";
const HOMEPAGE = process.env.NEXT_PUBLIC_REGISTRY_URL || "http://localhost:3000";

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
import { loaders } from "${path.join(rootDir, "src/data/loader.ts").replace(/\\/g, "\\\\")}";
import { navbars } from "${path.join(rootDir, "src/data/navbar.ts").replace(/\\/g, "\\\\")}";
import { cards } from "${path.join(rootDir, "src/data/card.ts").replace(/\\/g, "\\\\")}";
import { tabs } from "${path.join(rootDir, "src/data/tab.ts").replace(/\\/g, "\\\\")}";
import { marquees } from "${path.join(rootDir, "src/data/marquee.ts").replace(/\\/g, "\\\\")}";
import { textEffects } from "${path.join(rootDir, "src/data/text.ts").replace(/\\/g, "\\\\")}";
import { sections } from "${path.join(rootDir, "src/data/section.ts").replace(/\\/g, "\\\\")}";
import { commands } from "${path.join(rootDir, "src/data/command.ts").replace(/\\/g, "\\\\")}";
import { docEntries } from "${path.join(rootDir, "src/data/docs/index.ts").replace(/\\/g, "\\\\")}";

const docDescriptions = Object.fromEntries(
  docEntries.map((entry) => [entry.slug, entry.description])
);

globalThis.__REGISTRY_ITEMS__ = [...backgrounds, ...loaders, ...navbars, ...cards, ...tabs, ...marquees, ...textEffects, ...sections, ...commands].map((item) => ({
  slug: item.slug,
  name: item.name,
  code: item.code,
  description: item.description ?? docDescriptions[item.slug],
  dependencies: item.dependencies,
  registryDependencies: item.registryDependencies,
  cssVars: item.cssVars,
  tailwind: item.tailwind,
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

function buildFileContent(item) {
  // Snippets that are already a complete module (imports, hooks, named
  // exports) ship verbatim; bare-JSX snippets get wrapped in a component.
  if (item.code.includes("export default") || item.code.includes("export function")) {
    return item.code.endsWith("\n") ? item.code : item.code + "\n";
  }

  const componentName = slugToComponentName(item.slug);
  const indentedCode = item.code
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");

  return `export default function ${componentName}() {
  return (
${indentedCode}
  );
}
`;
}

function buildRegistryItem(item) {
  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.slug,
    type: "registry:component",
    title: item.name,
  };

  if (item.description) registryItem.description = item.description;
  if (item.dependencies?.length) registryItem.dependencies = item.dependencies;
  if (item.registryDependencies?.length) {
    registryItem.registryDependencies = item.registryDependencies;
  }

  registryItem.files = [
    {
      path: `${item.slug}.tsx`,
      target: `components/ui/${item.slug}.tsx`,
      content: buildFileContent(item),
      type: "registry:component",
    },
  ];

  if (item.cssVars && Object.keys(item.cssVars).length) registryItem.cssVars = item.cssVars;
  if (item.tailwind && Object.keys(item.tailwind).length) registryItem.tailwind = item.tailwind;

  return registryItem;
}

function buildRegistryIndex(registryItems) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: REGISTRY_NAME,
    homepage: HOMEPAGE,
    items: registryItems.map((item) => {
      const rest = { ...item };
      delete rest.$schema;
      rest.files = item.files.map((file) => {
        const f = { ...file };
        delete f.content;
        return f;
      });
      return rest;
    }),
  };
}

async function main() {
  const items = await loadDataArrays();
  await rm(publicDir, { recursive: true, force: true });
  await mkdir(publicDir, { recursive: true });

  const registryItems = [];
  for (const item of items) {
    const registryItem = buildRegistryItem(item);
    registryItems.push(registryItem);
    const filePath = path.join(publicDir, `${item.slug}.json`);
    await writeFile(filePath, JSON.stringify(registryItem, null, 2) + "\n", "utf8");
  }

  const indexPath = path.join(publicDir, "registry.json");
  await writeFile(
    indexPath,
    JSON.stringify(buildRegistryIndex(registryItems), null, 2) + "\n",
    "utf8"
  );

  await rm(outDir, { recursive: true, force: true });

  console.log(`Wrote ${items.length} registry item(s) + registry.json to public/r/`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
