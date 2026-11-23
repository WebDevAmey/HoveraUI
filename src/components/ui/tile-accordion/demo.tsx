"use client";

import { TileAccordion } from "./tile-accordion";

const p = { margin: 0 } as const;

export default function Demo() {
  return (
    <TileAccordion
      style={{ maxWidth: 600 }}
      defaultValue={["free"]}
      items={[
        {
          id: "free",
          title: "Is it free for commercial projects?",
          content: <p style={p}>Yes. It is MIT licensed, so it can go into client work and products you sell. Keep the licence notice with the source.</p>,
        },
        {
          id: "add",
          title: "How do I add a component?",
          content: <p style={p}>Run the install command from its page, or copy the files by hand. Either way the source lands in your project, ready to change.</p>,
        },
        {
          id: "needs",
          title: "What does my project need?",
          content: <p style={p}>React 19 and a bundler that understands CSS modules. There is no runtime package to keep updated.</p>,
        },
        {
          id: "motion",
          title: "What about people who prefer less motion?",
          content: <p style={p}>Reduced motion is respected: tiles open without the swing and the answer just fades in.</p>,
        },
      ]}
    />
  );
}
