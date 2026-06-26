import type React from "react";

export interface ComponentDocProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDocEntry {
  slug: string;
  name: string;
  description: string;
  category: string;
  isNew?: boolean;
  /** One to two line note in Hovera's hover-first voice, grounded in what the component's code actually does. */
  story?: string;
  Preview: React.ComponentType;
  code: string; // raw source string for the Code tab
  usage: string; // raw string for the Usage section
  dependencies: string[];
  props: ComponentDocProp[];
  needsLightPreview?: boolean;
}

export interface DocNavItem {
  slug: string;
  name: string;
  isNew?: boolean;
}

export interface DocNavGroup {
  label: string;
  icon: "buttons" | "motion" | "interactive";
  items: DocNavItem[];
}
