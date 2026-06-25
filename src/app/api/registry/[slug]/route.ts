import { NextResponse } from "next/server";
import { backgrounds } from "@/data/background";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import { slugToComponentName } from "@/lib/componentName";

interface RegistryEntry {
  name: string;
  code: string;
}

const REGISTRY: Map<string, RegistryEntry> = new Map(
  [...backgrounds, ...buttons, ...loaders, ...navbars].map((item) => [
    item.slug,
    { name: item.name, code: item.code },
  ])
);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = REGISTRY.get(slug);

  if (!entry) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const componentName = slugToComponentName(slug);
  const indentedCode = entry.code
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");

  const content = `export default function ${componentName}() {
  return (
${indentedCode}
  );
}
`;

  return NextResponse.json({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: slug,
    type: "registry:component",
    title: entry.name,
    files: [
      {
        path: `${slug}.tsx`,
        target: `components/ui/${slug}.tsx`,
        content,
        type: "registry:component",
      },
    ],
  });
}
