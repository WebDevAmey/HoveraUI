import { DocsShell } from "@/components/site/docs-shell";

/** One layout for docs and components, so the sidebar never remounts between them. */
export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
