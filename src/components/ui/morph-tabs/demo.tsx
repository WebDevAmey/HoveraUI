"use client";

import { MorphTabs } from "./morph-tabs";

function Chapter({ line, note }: { line: string; note: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <blockquote
        style={{
          margin: 0,
          font: "400 clamp(22px, 4vw, 28px) / 1.15 var(--hv-font-serif)",
          letterSpacing: "-0.015em",
          color: "var(--hv-ink)",
          textWrap: "balance",
        }}
      >
        {line}
      </blockquote>
      <figcaption
        style={{
          marginTop: 12,
          font: "400 11px / 1.5 var(--hv-font-mono)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "var(--hv-ink-2)",
        }}
      >
        {note}
      </figcaption>
    </figure>
  );
}

const tabs = [
  {
    id: "material",
    label: "Material",
    content: <Chapter line="Every piece is made of something: paper, glass, ink or light." note="Chapter one · Six minutes" />,
  },
  {
    id: "motion",
    label: "Motion",
    content: <Chapter line="Movement should explain, then get out of the way." note="Chapter two · Four minutes" />,
  },
  {
    id: "type",
    label: "Type",
    content: <Chapter line="A serif for the voice, a mono for the margins." note="Chapter three · Five minutes" />,
  },
  {
    id: "restraint",
    label: "Restraint",
    content: <Chapter line="One idea per component, carried all the way through." note="Chapter four · Three minutes" />,
  },
];

export default function Demo() {
  return <MorphTabs tabs={tabs} label="Essay chapters" style={{ maxWidth: 520, minHeight: 200 }} />;
}
