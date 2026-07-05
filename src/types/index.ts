export type Category = "gradient" | "pattern";

/**
 * shadcn registry-item metadata (https://ui.shadcn.com/schema/registry-item.json).
 * Only set what the `code` snippet actually needs — build-registry.mjs emits
 * these fields verbatim when present and omits them when absent.
 */
export interface RegistryMeta {
  description?: string;
  /** npm packages the snippet imports (e.g. "framer-motion"). */
  dependencies?: string[];
  /** Other Hovera registry items (slugs) or full registry-item URLs this one composes. */
  registryDependencies?: string[];
  /** CSS variables merged into the consumer's globals, per shadcn cssVars shape. */
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  /** Tailwind theme/plugin extensions, per shadcn registry-item schema. */
  tailwind?: Record<string, unknown>;
}


/** Generic registry item shape used by newer categories (cards, tabs, marquee, …). */
export interface ComponentItem extends RegistryMeta {
  name: string;
  slug: string;
  category: string;
  component: React.ComponentType;
  code: string;
  needsLightPreview?: boolean;
}


export interface BackgroundItem extends RegistryMeta {
  name: string;
  slug: string;
  category: Category;
  component: React.ComponentType;
  code: string;
}


export interface ButtonItem extends RegistryMeta {
  name: string;
  slug: string;
  category: string;
  component: React.ComponentType<{ isHovered?: boolean }>;
  code: string;
  needsLightPreview?: boolean;
}


export interface LoaderItem extends RegistryMeta {
  name: string;
  slug: string;
  category: string;
  component: React.ComponentType;
  code: string;
  needsLightPreview?: boolean;
}


export interface NavbarItem extends RegistryMeta {
  name: string;
  slug: string;
  category: string;
  component: React.ComponentType;
  code: string;
  needsLightPreview?: boolean;
}