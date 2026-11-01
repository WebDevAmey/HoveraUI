"use client";

import { Aura } from "./aura";
import styles from "./demo.module.css";

export default function Demo() {
  return (
    <div className={styles.stage}>
      <Aura palette="ether" className={styles.aura}>
        <span className={styles.word}>breathe</span>
        <span className={styles.caption}>in 4 · out 6</span>
      </Aura>
    </div>
  );
}
