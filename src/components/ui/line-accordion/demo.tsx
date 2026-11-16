"use client";

import { LineAccordion } from "./line-accordion";

const p = { margin: 0 } as const;

export default function Demo() {
  return (
    <LineAccordion
      style={{ maxWidth: 560 }}
      defaultValue={["measure"]}
      items={[
        {
          id: "measure",
          title: "Set a comfortable measure",
          meta: "Type",
          content: <p style={p}>Keep lines between fifty and seventy-five characters. Long lines tire the eye; short ones break the rhythm of reading.</p>,
        },
        {
          id: "rhythm",
          title: "Let spacing carry the hierarchy",
          meta: "Space",
          content: <p style={p}>Group related things tightly and separate sections generously. Most dividers can go once the spacing is doing its job.</p>,
        },
        {
          id: "motion",
          title: "Move only what changed",
          meta: "Motion",
          content: <p style={p}>Animate the element the person touched and the space it affects. Everything else should stay perfectly still.</p>,
        },
        {
          id: "restraint",
          title: "Remove until it breaks",
          meta: "Craft",
          content: <p style={p}>Take things away one at a time. Stop just before the interface stops making sense, then put the last one back.</p>,
        },
      ]}
    />
  );
}
