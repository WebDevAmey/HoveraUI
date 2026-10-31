"use client";

import { useState } from "react";
import { FanDeck } from "./fan-deck";
import styles from "./demo.module.css";

const swatches = [
  { id: "oxblood", name: "Oxblood", kind: "Lacquer", fill: "var(--hv-oxblood)" },
  { id: "gilt", name: "Gilt", kind: "Leaf", fill: "linear-gradient(135deg, var(--hv-gilt-hi), var(--hv-gilt) 55%, var(--hv-gilt-lo))" },
  { id: "dusk", name: "Dusk", kind: "Gouache", fill: "linear-gradient(to bottom, var(--hv-sky-hi), var(--hv-sky-lo))" },
  { id: "lilac", name: "Lilac", kind: "Chalk", fill: "var(--hv-ether-1)" },
  { id: "ultramarine", name: "Marine", kind: "Pigment", fill: "#2e3fe0" },
];

export default function Demo() {
  const [picked, setPicked] = useState("gilt");
  const current = swatches.find((swatch) => swatch.id === picked);

  return (
    <div className={styles.stage}>
      <FanDeck
        aria-label="Swatches"
        spread={7}
        value={picked}
        onValueChange={setPicked}
        cards={swatches.map((swatch, index) => ({
          id: swatch.id,
          label: `${swatch.name}, ${swatch.kind.toLowerCase()}`,
          content: (
            <>
              <div className={styles.swatch} style={{ background: swatch.fill }} />
              <div className={styles.row}>
                <span className={styles.name}>{swatch.name}</span>
                <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <span className={styles.kind}>{swatch.kind}</span>
            </>
          ),
        }))}
      />
      <p className={styles.readout} aria-live="polite">
        Picked <b>{current?.name}</b>
      </p>
    </div>
  );
}
