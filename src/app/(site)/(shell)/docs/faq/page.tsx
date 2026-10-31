import type { Metadata } from "next";
import { FaqGroups } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about using HoveraUI components.",
};

export default function FaqPage() {
  return (
    <article className="max-w-[720px]">
      <h1 className="text-[clamp(32px,5vw,44px)] font-medium leading-[1.05] tracking-[-0.035em]">FAQ</h1>
      <p className="mt-3 text-[17px] text-ink-2">Short answers about installing, theming and shipping the components.</p>
      <div className="mt-10">
        <FaqGroups level={2} />
      </div>
    </article>
  );
}
