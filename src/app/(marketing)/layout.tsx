import { SiteFooter } from "@/components/site/site-footer";
import { registry } from "@/registry";

/** The landing page ends on the same footer as the docs. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter count={registry.length} />
    </>
  );
}
