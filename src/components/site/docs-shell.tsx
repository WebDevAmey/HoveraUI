import type { ReactNode } from "react";
import { DocsSidebar } from "./docs-sidebar";
import { sidebarGroups } from "./nav";

/**
 * Sidebar plus content column, shared by docs and component pages.
 * Rendered from a layout, so the sidebar stays mounted (and keeps its scroll) between pages.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  const groups = sidebarGroups();
  return (
    <div className="mx-auto flex max-w-[1440px] px-4 sm:px-6">
      <aside
        data-sidebar-scroll
        className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[248px] shrink-0 overflow-y-auto overscroll-contain border-r border-line py-8 pr-5 [scrollbar-width:thin] [scrollbar-color:var(--hv-line-strong)_transparent] lg:block"
      >
        <DocsSidebar groups={groups} />
      </aside>
      <div className="min-w-0 flex-1 py-8 lg:py-14 lg:pl-12 xl:pl-16">
        <details className="group mb-8 rounded-xl border border-line bg-surface lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            Browse components
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="text-ink-2 transition-transform duration-200 ease-[var(--hv-ease-out)] group-open:rotate-180"
            >
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="max-h-[60dvh] overflow-y-auto border-t border-line px-2 py-4">
            <DocsSidebar groups={groups} filterable={false} />
          </div>
        </details>
        {children}
      </div>
    </div>
  );
}
