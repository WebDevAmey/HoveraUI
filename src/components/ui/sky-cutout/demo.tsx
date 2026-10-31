"use client";

import { useState } from "react";
import { SkyCutout, type SkyCutoutShape } from "./sky-cutout";
import styles from "./demo.module.css";

const shapes: SkyCutoutShape[] = ["arch", "circle", "keyhole", "bird"];

export default function Demo() {
  const [shape, setShape] = useState<SkyCutoutShape>("arch");

  return (
    <SkyCutout shape={shape} holeHeight={120} className={styles.card}>
      <div>
        <p className={styles.eyebrow}>Room 04 · East wall</p>
        <p className={styles.title}>
          A window for <em>weekdays</em>
        </p>
        <p className={styles.note}>Cut through the plaster. On the other side it is always noon.</p>
        <div className={styles.shapes} role="group" aria-label="Cutout shape">
          {shapes.map((name) => (
            <button
              key={name}
              type="button"
              className={styles.shape}
              aria-pressed={shape === name}
              onClick={() => setShape(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </SkyCutout>
  );
}
