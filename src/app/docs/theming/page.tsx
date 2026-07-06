import type { Metadata } from "next";
import GuideLayout, { GuideSection, GuideCode } from "@/components/docs/GuideLayout";

export const metadata: Metadata = {
  title: "Theming",
  description: "HoveraUI is monochrome by design. Effects express through light, shadow, blur, displacement and motion — never color.",
};

export default function Page() {
  return (
    <GuideLayout slug="theming" title="Theming" lead="HoveraUI is monochrome by design. Effects express through light, shadow, blur, displacement and motion — never color.">

      <GuideSection title="The monochrome contract">
        <p>
          Components ship on a near-black canvas (<code>#09090b</code>) with white and neutral-gray light.
          There are no color tokens to configure — that restraint is the identity. If you need an accent,
          change the grayscale values in the component you installed; you own the file.
        </p>
      </GuideSection>
      <GuideSection title="Dark and light">
        <p>
          The docs site runs both themes via <code>next-themes</code>. Most effects are designed dark-first
          (light on black); several read equally well inverted. Each component page previews the real rendering.
        </p>
      </GuideSection>
      <GuideSection title="Motion tokens">
        <GuideCode>{"--ease-flow: cubic-bezier(0.16, 1, 0.3, 1);\n--duration-fast: 150ms;\n--duration-base: 300ms;\n--duration-slow: 450ms;"}</GuideCode>
      </GuideSection>
    </GuideLayout>
  );
}
