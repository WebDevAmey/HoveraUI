"use client";

import { useState } from "react";
import { PillowPress } from "./pillow-press";

const lamp = (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 3.5a4.5 4.5 0 0 1 0 9Z" fill="currentColor" />
  </svg>
);

export default function Demo() {
  const [on, setOn] = useState(true);

  return (
    <PillowPress icon={lamp} pressed={on} onClick={() => setOn(!on)}>
      Warm light
    </PillowPress>
  );
}
