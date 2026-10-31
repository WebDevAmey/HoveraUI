// Builds the copy-paste registry from the component folders themselves.
//
//   public/r/<slug>.json      shadcn-compatible item: the component and its CSS module
//   public/r/base.json        tokens.css and the cn helper every component shares
//   public/r/registry.json    index of all items
//   src/registry/generated.json  source files and minified + gzipped size per component
//
// Nothing is duplicated by hand, so the registry cannot drift from the source.
import { build } from "esbuild";
import { mkdir, readdir, readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = path.join(root, "src/components/ui");
const outDir = path.join(root, "public/r");
const tmpDir = path.join(root, ".registry-build");
const host = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

async function loadMetas(slugs) {
  const entry = path.join(tmpDir, "metas.ts");
  const lines = slugs.map((slug, i) => `import m${i} from ${JSON.stringify(path.join(uiDir, slug, "meta.ts"))};`);
  lines.push(`export default [${slugs.map((_, i) => `m${i}`).join(", ")}];`);
  await writeFile(entry, lines.join("\n"));
  const outfile = path.join(tmpDir, "metas.mjs");
  await build({
    entryPoints: [entry],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile,
    logLevel: "silent",
    alias: { "@": path.join(root, "src") },
  });
  return (await import(`${outfile}?t=${Date.now()}`)).default;
}

async function measure(slug) {
  const result = await build({
    entryPoints: [path.join(uiDir, slug, `${slug}.tsx`)],
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    outdir: path.join(tmpDir, slug),
    external: ["react", "react-dom", "react/jsx-runtime"],
    loader: { ".module.css": "local-css" },
    alias: { "@": path.join(root, "src") },
    jsx: "automatic",
    logLevel: "silent",
  });
  let bytes = 0;
  for (const file of result.outputFiles) bytes += gzipSync(file.contents, { level: 9 }).length;
  return bytes;
}

async function main() {
  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const slugs = (await readdir(uiDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory() && existsSync(path.join(uiDir, d.name, `${d.name}.tsx`)))
    .map((d) => d.name)
    .sort();

  const metas = await loadMetas(slugs);
  const generated = {};

  const base = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "base",
    type: "registry:lib",
    title: "HoveraUI base",
    description: "Design tokens and the cn helper shared by every HoveraUI component.",
    files: [
      { path: "lib/cn.ts", type: "registry:lib", target: "lib/cn.ts", content: await readFile(path.join(root, "src/lib/cn.ts"), "utf8") },
      { path: "styles/tokens.css", type: "registry:file", target: "styles/hovera-tokens.css", content: await readFile(path.join(root, "src/styles/tokens.css"), "utf8") },
    ],
  };
  await writeFile(path.join(outDir, "base.json"), JSON.stringify(base, null, 2));

  const items = [];
  for (const meta of metas) {
    const { slug } = meta;
    const files = [];
    for (const name of [`${slug}.tsx`, `${slug}.module.css`]) {
      const file = path.join(uiDir, slug, name);
      if (!existsSync(file)) continue;
      files.push({
        path: `components/ui/${slug}/${name}`,
        type: "registry:ui",
        target: `components/ui/${slug}/${name}`,
        content: await readFile(file, "utf8"),
      });
    }
    generated[slug] = { size: await measure(slug), files: files.map((f) => ({ name: path.basename(f.path), code: f.content })) };
    const item = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: slug,
      type: "registry:ui",
      title: meta.name,
      description: meta.description,
      categories: [meta.category],
      registryDependencies: [`${host}/r/base.json`],
      files,
    };
    items.push({ name: slug, type: item.type, title: item.title, description: item.description });
    await writeFile(path.join(outDir, `${slug}.json`), JSON.stringify(item, null, 2));
  }

  await writeFile(
    path.join(outDir, "registry.json"),
    JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry.json", name: "hoveraui", homepage: host, items }, null, 2),
  );
  await writeFile(path.join(root, "src/registry/generated.json"), JSON.stringify(generated) + "\n");
  await rm(tmpDir, { recursive: true, force: true });
  console.log(`registry: ${items.length} components`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
