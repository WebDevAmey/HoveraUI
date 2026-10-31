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
    <div className="mx-auto flex max-w-[1400px] gap-10 px-4 sm:px-6">
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 overflow-y-auto overscroll-contain py-8 [scrollbar-width:none] lg:block">
        <DocsSidebar groups={groups} />
      </aside>
      <div className="min-w-0 flex-1 py-8 lg:py-12">
        <details className="group mb-8 rounded-xl border border-line lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            Browse
            <span aria-hidden="true" className="text-ink-2 transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="max-h-[60dvh] overflow-y-auto border-t border-line px-2 py-4">
            <DocsSidebar groups={groups} />
          </div>
        </details>
        {children}
      </div>
    </div>
  );
}
