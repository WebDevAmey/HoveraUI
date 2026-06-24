export type Category = "gradient" | "pattern";


export interface BackgroundItem {
  name: string;
  slug: string;
  category: Category;
  component: React.ComponentType;
  code: string;
}


export interface ButtonItem {
  name: string;
  slug: string;
  category: string;
  component: React.ComponentType<{ isHovered?: boolean }>;
  code: string;
  needsLightPreview?: boolean;
}


export interface LoaderItem {
  name: string;
  slug: string;
  category: string;
  component: React.ComponentType;
  code: string;
  needsLightPreview?: boolean;
}


export interface NavbarItem {
  name: string;
  slug: string;
  category: string;
  component: React.ComponentType;
  code: string;
  needsLightPreview?: boolean;
}