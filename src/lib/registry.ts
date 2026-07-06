export type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

export const REGISTRY_HOST = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://backlab.dev";

export function getRegistryBaseUrl(): string {
  return REGISTRY_HOST;
}

export function getRegistryUrl(slug: string): string {
  return `${getRegistryBaseUrl()}/r/${slug}.json`;
}

const PACKAGE_MANAGER_EXECUTORS: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  bun: "bunx",
  yarn: "yarn dlx",
};

export function getShadcnAddCommand(
  componentName: string,
  packageManager: PackageManager = "npm"
): string {
  return `${PACKAGE_MANAGER_EXECUTORS[packageManager]} shadcn@latest add ${getRegistryUrl(componentName)}`;
}
