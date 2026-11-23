"use client";

import { BranchSidebar, type BranchSidebarGroup } from "./branch-sidebar";
import styles from "./demo.module.css";

const icon = (d: string) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const groups: BranchSidebarGroup[] = [
  {
    title: "Guide",
    icon: icon("M3 2.5h6l4 4v7H3zM9 2.5v4h4"),
    items: [
      { href: "#overview", label: "Overview", icon: icon("M8 3.5c-1.6-1-3.6-1.2-5.5-.8v9.6c1.9-.4 3.9-.2 5.5.8 1.6-1 3.6-1.2 5.5-.8V2.7c-1.9-.4-3.9-.2-5.5.8zM8 3.5v9.6") },
      { href: "#setup", label: "Setup", icon: icon("M8 2.5v7.5M4.8 7 8 10.2 11.2 7M3 13.5h10") },
      { href: "#releases", label: "Releases", icon: icon("M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM8 5v3l2 1.5") },
    ],
  },
  {
    title: "Darkroom",
    icon: icon("M8 2.5 13.5 8 8 13.5 2.5 8z"),
    items: [
      { href: "#develop", label: "Develop", badge: "New", keywords: "chemistry bath" },
      { href: "#stop-bath", label: "Stop bath", keywords: "chemistry" },
      { href: "#fix", label: "Fix and wash", keywords: "chemistry" },
      { href: "#contact-sheet", label: "Contact sheet", badge: "New", keywords: "print proof" },
    ],
  },
  {
    title: "Printing",
    icon: icon("M4.5 6V2.5h7V6M4.5 11H3V6h10v5h-1.5M4.5 9h7v4.5h-7z"),
    items: [
      { href: "#enlarger", label: "Enlarger" },
      { href: "#dodge-burn", label: "Dodge and burn", keywords: "exposure" },
      { href: "#split-grade", label: "Split grade", keywords: "contrast filter" },
    ],
  },
  {
    title: "Archive",
    icon: icon("M2.5 4.5h11v2h-11zM3.5 6.5v7h9v-7M6.5 9h3"),
    defaultCollapsed: true,
    items: [
      { href: "#sleeves", label: "Negative sleeves" },
      { href: "#labels", label: "Labels and index" },
    ],
  },
];

export default function Demo() {
  return (
    <BranchSidebar
      groups={groups}
      defaultActiveHref="#develop"
      // The demo stays on this page: rows switch in place instead of jumping to an anchor.
      onNavigate={(_, event) => event.preventDefault()}
      // The site already binds "/" to its own search.
      shortcut={null}
      footer={<span>12 pages, updated today</span>}
      className={styles.sidebar}
    />
  );
}
