"use client";

import { AnchorPopover, AnchorTerm } from "./anchor-popover";

export default function Demo() {
  return (
    <AnchorPopover
      style={{
        maxWidth: 440,
        paddingTop: 96,
        font: "400 clamp(22px, 4.6vw, 28px) / 1.35 var(--hv-font-serif)",
        letterSpacing: "-0.012em",
        color: "var(--hv-ink)",
        textWrap: "balance",
      }}
    >
      <p style={{ margin: 0 }}>
        A calm page is mostly{" "}
        <AnchorTerm heading="Leading" tip="The space between lines of type, measured baseline to baseline.">
          leading
        </AnchorTerm>
        , a comfortable{" "}
        <AnchorTerm heading="Measure" tip="How long a line runs. Around sixty characters reads easily.">
          measure
        </AnchorTerm>{" "}
        and careful{" "}
        <AnchorTerm heading="Kerning" tip="Small adjustments to the space between two particular letters.">
          kerning
        </AnchorTerm>{" "}
        along a steady{" "}
        <AnchorTerm heading="Baseline" tip="The invisible line that letters sit on.">
          baseline
        </AnchorTerm>
        .
      </p>
    </AnchorPopover>
  );
}
