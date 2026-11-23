"use client";

import { HairlineAccordion } from "./hairline-accordion";

const p = { margin: 0 } as const;

export default function Demo() {
  return (
    <HairlineAccordion
      style={{ maxWidth: 560 }}
      defaultValue={["license"]}
      items={[
        {
          id: "license",
          title: "Can I use it in commercial work?",
          content: <p style={p}>Yes. Everything is MIT licensed, so it can ship in client projects and products you sell without asking first.</p>,
        },
        {
          id: "copy",
          title: "Do I install a package?",
          content: <p style={p}>No. Copy the component and its stylesheet into your project. The source is yours to read, trim and change.</p>,
        },
        {
          id: "theme",
          title: "Does it follow my theme?",
          content: <p style={p}>It reads the same colour and motion tokens as the rest of the library, so light and dark both work with no extra setup.</p>,
        },
        {
          id: "motion",
          title: "What if I prefer less motion?",
          content: <p style={p}>With reduced motion turned on, rows open at once and the answer simply fades in.</p>,
        },
      ]}
    />
  );
}
