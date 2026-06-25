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


export type DropStatus = "pending" | "approved" | "rejected";

export interface DropItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  tags: string[];
  sourceCode: string;
  makerNote: string;
  behaviorNote: string;
  status: DropStatus;
  authorId: string;
  authorHandle: string;
  authorAvatarUrl: string | null;
  remixedFrom: string | null;
  copiesCount: number;
  usedCount: number;
  remixCount: number;
  createdAt: string;
}