export function getRegistryBaseUrl(): string {
  return process.env.NEXT_PUBLIC_REGISTRY_URL || "http://localhost:3000";
}

export function getRegistryUrl(slug: string): string {
  return `${getRegistryBaseUrl()}/r/${slug}.json`;
}
