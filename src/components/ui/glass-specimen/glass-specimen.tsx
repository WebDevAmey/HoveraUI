"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import styles from "./glass-specimen.module.css";

export type GlassSpecimenProps = HTMLAttributes<HTMLDivElement> & {
  /** Colour field behind the glass. */
  field?: "ether" | "dusk" | "accent";
  /** Largest tilt in degrees. */
  maxTilt?: number;
};

/**
 * A frosted pane floating over a colour field. It tilts toward the pointer,
 * a specular band slides across it and the field shifts as if refracted.
 */
export function GlassSpecimen({
  field = "ether",
  maxTilt = 10,
  className,
  style,
  children,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  onPointerUp,
  ...props
}: GlassSpecimenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduced.current = query.matches;
    };
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const setTilt = (x: number, y: number, active: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (active) {
        root.style.setProperty("--nx", x.toFixed(3));
        root.style.setProperty("--ny", y.toFixed(3));
        root.dataset.tilting = "";
      } else {
        // Removing the inline values lets the stylesheet decide the rest pose (flat, or the focus tilt).
        root.style.removeProperty("--nx");
        root.style.removeProperty("--ny");
        delete root.dataset.tilting;
      }
    });
  };

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (reduced.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)), true);
  };

  const reset = () => setTilt(0, 0, false);


  return (
    <div
      ref={rootRef}
      data-field={field}
      className={cn(styles.root, className)}
      style={{ "--max-tilt": `${maxTilt}deg`, ...style } as CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={(event) => {
        reset();
        onPointerLeave?.(event);
      }}
      onPointerCancel={(event) => {
        reset();
        onPointerCancel?.(event);
      }}
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") reset();
        onPointerUp?.(event);
      }}
      {...props}
    >
      <div className={styles.field} aria-hidden="true">
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.disc} />
      </div>
      <div className={styles.pane}>
        <span className={styles.sheen} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
