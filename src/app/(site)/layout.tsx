import { SiteFooter } from "@/components/site/site-footer";
import { registry } from "@/registry";

/** Docs and component pages share the plain footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter count={registry.length} />
    </>
  );
}
