import type { Metadata } from "next";
import GuideLayout, { GuideSection } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Every effect degrades gracefully: reduced motion is honored everywhere, cursor effects are mouse-only enhancements, and no content hides behind hover.",
};

export default function Page() {
  return (
    <GuideLayout slug="accessibility" title="Accessibility" lead="Every effect degrades gracefully: reduced motion is honored everywhere, cursor effects are mouse-only enhancements, and no content hides behind hover.">

      <GuideSection title="Reduced motion">
        <p>
          Every animated component checks <code>prefers-reduced-motion</code> and renders a calm, static
          fallback — loops pause, displacement fields stay flat, typewriters show their first phrase complete.
        </p>
      </GuideSection>
      <GuideSection title="Pointer and touch">
        <p>
          Cursor-driven effects (displacement text, tilt, spotlight, pixel trail) are enhancements for fine
          pointers; on touch devices the component renders stable and legible with nothing lost.
        </p>
      </GuideSection>
      <GuideSection title="Focus and semantics">
        <p>
          Interactive elements keep visible <code>focus-visible</code> outlines; decorative layers are{" "}
          <code>aria-hidden</code>; split-glyph text keeps a screen-reader-readable <code>aria-label</code>.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
