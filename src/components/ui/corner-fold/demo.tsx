"use client";

import { CornerFold } from "./corner-fold";
import styles from "./demo.module.css";

export default function Demo() {
  return (
    <CornerFold
      className={styles.card}
      revealLabel="Read the note under the corner"
      note={
        <>
          <span className={styles.noteHead}>Sundays only</span>
          Keep from sun.
        </>
      }
    >
      <div className={styles.body}>
        <p className={styles.eyebrow}>Plate 14 · Herbarium</p>
        <p className={styles.title}>
          Maidenhair <em>fern</em>
        </p>
        <p className={styles.text}>Pressed along the north wall of the old glasshouse, between two heavy books.</p>
      </div>
    </CornerFold>
  );
}
