import { createAdminClient } from "@/lib/supabase/admin";

interface DropRow {
  id: string;
  name: string;
  slug: string;
  source_code: string;
}

/**
 * Builds a shadcn registry-item.json payload for an approved drop and saves
 * it to drops.registry_json. Served at runtime via
 * /api/registry/[slug], which is what `npx shadcn add @hovera/<slug>`
 * should point at, since static files written at request time would not
 * survive a serverless deploy.
 */
export async function generateRegistryEntry(drop: DropRow) {
  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: drop.slug,
    type: "registry:component",
    title: drop.name,
    files: [
      {
        path: `${drop.slug}.html`,
        content: drop.source_code,
        type: "registry:component",
      },
    ],
  };

  const admin = createAdminClient();
  await admin.from("drops").update({ registry_json: registryItem }).eq("id", drop.id);

  return registryItem;
}
