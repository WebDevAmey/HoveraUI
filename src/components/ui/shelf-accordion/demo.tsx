"use client";

import { ShelfAccordion } from "./shelf-accordion";

const p = { margin: 0 } as const;

export default function Demo() {
  return (
    <ShelfAccordion
      style={{ maxWidth: 640 }}
      items={[
        {
          id: "listen",
          title: "Listen",
          content: <p style={p}>Two weeks with the people who use the product every day, before anyone opens a design tool.</p>,
        },
        {
          id: "frame",
          title: "Frame",
          content: <p style={p}>One page that names the problem, who has it, and what would count as solving it.</p>,
        },
        {
          id: "shape",
          title: "Shape",
          content: <p style={p}>Rough flows first, then a single direction taken all the way to working detail.</p>,
        },
        {
          id: "ship",
          title: "Ship",
          content: <p style={p}>Released in small steps, measured, and refined with the same people we started with.</p>,
        },
      ]}
    />
  );
}
