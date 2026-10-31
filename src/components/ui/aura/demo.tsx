"use client";

import { useState, type CSSProperties } from "react";
import { Aura, type AuraProps } from "./aura";
import styles from "./demo.module.css";

type Palette = NonNullable<AuraProps["palette"]>;

const palettes: { id: Palette; label: string; chip: string }[] = [
  { id: "ether", label: "Ether", chip: "conic-gradient(var(--hv-ether-1), var(--hv-ether-2), var(--hv-ether-3), var(--hv-ether-1))" },
  { id: "dusk", label: "Dusk", chip: "linear-gradient(var(--hv-sky-hi), var(--hv-sky-lo))" },
  { id: "accent", label: "Accent", chip: "linear-gradient(var(--hv-accent), var(--hv-ether-3))" },
];

export default function Demo() {
  const [palette, setPalette] = useState<Palette>("ether");

  return (
    <div className={styles.stage}>
      <Aura palette={palette} className={styles.aura}>
        <span className={styles.word}>breathe</span>
        <span className={styles.caption}>in 4 · out 6</span>
      </Aura>
      <div className={styles.palettes} role="radiogroup" aria-label="Palette">
        {palettes.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={palette === item.id}
            aria-label={item.label}
            className={styles.swatch}
            style={{ "--chip": item.chip } as CSSProperties}
            onClick={() => setPalette(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
