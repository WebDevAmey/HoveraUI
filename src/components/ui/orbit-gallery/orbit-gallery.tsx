"use client";

import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./orbit-gallery.module.css";

export type OrbitItem = {
  id: string;
  name: string;
  category: string;
  /** Small artwork shown on the ring and, larger, in the preview. */
  thumb: ReactNode;
};

export type OrbitGalleryProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  items: OrbitItem[];
  /** The mark at the centre of the ring. */
  center?: ReactNode;
  /** Seconds per revolution. */
  duration?: number;
  onSelect?: (item: OrbitItem) => void;
};

/**
 * Items drift on a slow ring around a central mark. Hovering or focusing one stops the ring
 * and brings a larger preview into the centre.
 */
export function OrbitGallery({
  items,
  center,
  duration = 90,
  onSelect,
  className,
  style,
  ...props
}: OrbitGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const active = items.find((item) => item.id === activeId) ?? null;
  const paused = userPaused || focusWithin || active !== null;

  return (
    <div
      className={cn(styles.root, className)}
      data-paused={paused || undefined}
      data-previewing={active ? "" : undefined}
      style={{ ...style, "--duration": `${duration}s` } as CSSProperties}
      onKeyDown={(event) => {
        if (event.key === "Escape") setActiveId(null);
      }}
      {...props}
    >
      <div className={styles.stage}>
        <div className={styles.aura} aria-hidden="true" />
        <div className={styles.track} aria-hidden="true" />

        <div className={styles.center}>
          <div className={styles.mark}>{center}</div>
          <div className={styles.preview} aria-hidden="true">
            {active ? (
              <div key={active.id} className={styles.card}>
                <div className={styles.cardThumb}>{active.thumb}</div>
                <p className={styles.caption}>
                  <span className={styles.name}>{active.name}</span>
                  <span className={styles.sep}>·</span>
                  <span>{active.category}</span>
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <ul
          className={styles.ring}
          onFocus={() => setFocusWithin(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocusWithin(false);
              setActiveId(null);
            }
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse" && !focusWithin) setActiveId(null);
          }}
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              className={styles.slot}
              style={{ "--a": `${(360 / items.length) * index - 90}deg` } as CSSProperties}
            >
              <button
                type="button"
                className={styles.item}
                aria-label={`${item.name}, ${item.category}`}
                data-active={item.id === activeId || undefined}
                onPointerEnter={(event) => event.pointerType === "mouse" && setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => onSelect?.(item)}
              >
                <span className={styles.thumb} aria-hidden="true">
                  {item.thumb}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={styles.toggle}
        aria-pressed={userPaused}
        aria-label="Pause rotation"
        onClick={() => setUserPaused((value) => !value)}
      >
        <svg viewBox="0 0 12 12" aria-hidden="true">
          {userPaused ? <path d="M4 2.5v7l5.5-3.5z" className={styles.fill} /> : <path d="M4 3v6M8 3v6" />}
        </svg>
      </button>
    </div>
  );
}
