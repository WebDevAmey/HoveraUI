"use client";

import { SkyCutout } from "./sky-cutout";
import styles from "./demo.module.css";

export default function Demo() {
  return (
    <SkyCutout shape="arch" holeHeight={120} className={styles.card}>
      <div>
        <p className={styles.eyebrow}>Room 04 · East wall</p>
        <p className={styles.title}>
          A window for <em>weekdays</em>
        </p>
        <p className={styles.note}>Cut through the plaster. On the other side it is always noon.</p>
      </div>
    </SkyCutout>
  );
}
