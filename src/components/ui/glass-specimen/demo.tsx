"use client";

import { useState } from "react";
import { GlassSpecimen } from "./glass-specimen";
import styles from "./demo.module.css";

const specimens = [
  { field: "ether", name: "Lilac", tail: "haze", index: "07" },
  { field: "dusk", name: "Harbour", tail: "dusk", index: "11" },
  { field: "accent", name: "Cobalt", tail: "deep", index: "14" },
] as const;

export default function Demo() {
  const [at, setAt] = useState(0);
  const specimen = specimens[at];

  return (
    <GlassSpecimen field={specimen.field} className={styles.wrap}>
      <div className={styles.top}>
        <span>Specimen {specimen.index}</span>
        <span>n 1.52</span>
      </div>
      <p className={styles.title}>
        {specimen.name} <em>{specimen.tail}</em>
      </p>
      <p className={styles.note}>Float glass, etched on one face. Hold it up to the window.</p>
      <div className={styles.foot}>
        <span>4 mm · 120×80</span>
        <button type="button" className={styles.next} onClick={() => setAt((at + 1) % specimens.length)}>
          Next →
        </button>
      </div>
    </GlassSpecimen>
  );
}
