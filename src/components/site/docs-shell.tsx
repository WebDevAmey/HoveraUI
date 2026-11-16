import type { ReactNode } from "react";
import { DocsSidebar } from "./docs-sidebar";
import { sidebarGroups } from "./nav";

/**
 * Sidebar plus content sheet, shared by docs and component pages.
 * Rendered from a layout, so the sidebar stays mounted (and keeps its scroll) between pages.
 * The page itself sits on one raised sheet; the sidebar stays flat on the canvas beside it.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  const groups = sidebarGroups();
  return (
    <div className="mx-auto flex max-w-[1480px] gap-3 px-3 sm:px-4 lg:gap-4">
      <aside className="sticky top-[76px] hidden h-[calc(100dvh-76px)] w-[248px] shrink-0 pb-3 pt-2 lg:block">
        <DocsSidebar groups={groups} panel />
      </aside>
      <div className="min-w-0 flex-1 pb-3 pt-2">
        <div className="min-h-[calc(100dvh-90px)] rounded-[24px] bg-raised px-5 pb-16 pt-6 ring-1 ring-line sm:px-8 lg:px-12 lg:pb-24 lg:pt-12 xl:px-16">
          <details className="group mb-8 rounded-2xl bg-surface ring-1 ring-line lg:hidden">
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
            <div className="max-h-[60dvh] overflow-y-auto border-t border-line px-2 py-3">
              <DocsSidebar groups={groups} />
            </div>
          </details>
          {children}
        </div>
      </div>
    </div>
  );
}
