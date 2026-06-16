export type Category = "gradient" | "pattern";

export interface BackgroundItem {
  name: string;
  slug: string;
  category: Category;
  component: React.ComponentType;
  code: string;
}
