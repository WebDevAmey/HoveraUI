"use client";

import { SlabFlip } from "./slab-flip";
import styles from "./demo.module.css";

const stoneEdge =
  "radial-gradient(circle 0.9px at 50% 50%, #b4674f 90%, transparent) 0 0 / 9px 7px, radial-gradient(circle 0.9px at 30% 30%, #3f3b36 90%, transparent) 0 0 / 5px 6px, radial-gradient(circle 1px at 70% 60%, #fbf8f2 90%, transparent) 0 0 / 7px 5px, #cfc7b8";

export default function Demo() {
  return (
    <div className={styles.row}>
      <SlabFlip
        className={styles.slab}
        thickness={14}
        edge={stoneEdge}
        label="Turn the terrazzo sample over"
        front={
          <div className={`${styles.terrazzo} ${styles.tileFront}`}>
            <div className={styles.plate}>
              <span className={styles.kicker}>Sample 03</span>
              <span className={styles.name}>
                Terrazzo <em>honed</em>
              </span>
            </div>
          </div>
        }
        back={
          <div className={styles.tileBack}>
            <ul className={styles.specs}>
              <li>Marble chip</li>
              <li>Honed, sealed</li>
              <li>14 mm slab</li>
            </ul>
            <span className={styles.backNote}>Cool underfoot.</span>
          </div>
        }
      />
    </div>
  );
}
