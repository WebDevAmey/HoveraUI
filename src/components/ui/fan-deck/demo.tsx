"use client";

import type { CSSProperties } from "react";
import { FanDeck } from "./fan-deck";
import styles from "./demo.module.css";

const chapters = [
  { id: "type", title: "Type", kind: "lines", bg: "#ece6da", ink: "#26221c" },
  { id: "colour", title: "Colour", kind: "rings", bg: "#5b3a52", ink: "#f4ebe9" },
  { id: "space", title: "Space", kind: "dots", bg: "#c9d8e3", ink: "#1f2a33" },
  { id: "motion", title: "Motion", kind: "waves", bg: "#6f7a4a", ink: "#f2f1e6" },
  { id: "detail", title: "Detail", kind: "grid", bg: "#1d1c1a", ink: "#ecebe6" },
];

export default function Demo() {
  return (
    <FanDeck
      aria-label="Chapters"
      defaultValue="space"
      cards={chapters.map((c, i) => ({
        id: c.id,
        label: `Chapter ${i + 1}: ${c.title}`,
        content: (
          <div className={styles.card} data-kind={c.kind} style={{ "--bg": c.bg, "--ink": c.ink } as CSSProperties}>
            <span className={styles.art} aria-hidden="true" />
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.title}>{c.title}</span>
          </div>
        ),
      }))}
    />
  );
}
