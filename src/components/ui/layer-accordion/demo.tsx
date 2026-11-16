"use client";

import { LayerAccordion } from "./layer-accordion";

const p = { margin: 0 } as const;

export default function Demo() {
  return (
    <LayerAccordion
      style={{ maxWidth: 460 }}
      defaultValue={["plan"]}
      items={[
        {
          id: "plan",
          title: "Plan",
          summary: "Scope, owners and a date",
          content: <p style={p}>Write down what is in and what is out, who decides, and when the first version goes out.</p>,
        },
        {
          id: "build",
          title: "Build",
          summary: "Small steps behind a flag",
          content: <p style={p}>Ship to staff first. Every step should be safe to release on its own and easy to switch off.</p>,
        },
        {
          id: "review",
          title: "Review",
          summary: "Accessibility, motion, copy",
          content: <p style={p}>Check keyboard paths, reduced motion and every empty and error state before anyone else sees it.</p>,
        },
        {
          id: "launch",
          title: "Launch",
          summary: "Announce and watch",
          content: <p style={p}>Roll out in stages and keep an eye on the numbers you agreed on during planning.</p>,
        },
      ]}
    />
  );
}
