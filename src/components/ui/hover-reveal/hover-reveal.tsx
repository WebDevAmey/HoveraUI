"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type PointerEvent,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./hover-reveal.module.css";

export type HoverRevealItem = {
  id: string;
  title: string;
  /** Short supporting line on the right, set in mono. */
  meta?: string;
  /** Photo shown while the row is hovered. Decorative: the row's text names it. */
  src: string;
  /** Turns the row into a link. */
  href?: string;
};

export type HoverRevealProps = Omit<HTMLAttributes<HTMLUListElement>, "children"> & {
  items: HoverRevealItem[];
  /** Width of the floating image in px. */
  imageWidth?: number;
  /** CSS aspect-ratio of the floating image. */
  ratio?: string;
  /** Spring stiffness of the follow. Higher is snappier. */
  stiffness?: number;
  /** Spring damping of the follow. Higher settles with less overshoot. */
  damping?: number;
};

type Vec = { x: number; y: number };

const MAX_TILT = 9;

/**
 * An index of rows. Hovering a row lifts a photo out of the page that trails
 * the pointer on a spring, leans into the direction of travel and wipes to the
 * next photo as you move down the list.
 */
export function HoverReveal({
  items,
  imageWidth = 260,
  ratio = "4 / 3",
  stiffness = 220,
  damping = 26,
  className,
  style,
  onPointerLeave,
  ...props
}: HoverRevealProps) {
  const [active, setActive] = useState<number | null>(null);
  const rootRef = useRef<HTMLUListElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const target = useRef<Vec>({ x: 0, y: 0 });
  const pos = useRef<Vec>({ x: 0, y: 0 });
  const vel = useRef<Vec>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const last = useRef(0);
  const placed = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (reduced.current = query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const paint = useCallback(() => {
    const node = floatRef.current;
    if (!node) return;
    const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, vel.current.x * 0.012));
    node.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${tilt}deg)`;
  }, []);

  // The frame loop lives in a ref so it can reschedule itself and still read the latest spring props.
  const step = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    step.current = (now: number) => {
      // Clamp dt so a backgrounded tab does not fling the image on return.
      const dt = Math.min((now - last.current) / 1000, 1 / 30);
      last.current = now;
      for (const axis of ["x", "y"] as const) {
        const force = (target.current[axis] - pos.current[axis]) * stiffness - vel.current[axis] * damping;
        vel.current[axis] += force * dt;
        pos.current[axis] += vel.current[axis] * dt;
      }
      paint();
      const settled =
        Math.abs(target.current.x - pos.current.x) < 0.1 &&
        Math.abs(target.current.y - pos.current.y) < 0.1 &&
        Math.abs(vel.current.x) < 0.1 &&
        Math.abs(vel.current.y) < 0.1;
      frame.current = settled ? null : requestAnimationFrame((t) => step.current(t));
    };
  }, [damping, paint, stiffness]);

  const moveTo = useCallback(
    (x: number, y: number) => {
      target.current = { x, y };
      // The first placement jumps, so the image appears under the pointer instead of flying in from a corner.
      if (!placed.current || reduced.current) {
        placed.current = true;
        pos.current = { x, y };
        vel.current = { x: 0, y: 0 };
        paint();
        return;
      }
      if (frame.current === null) {
        last.current = performance.now();
        frame.current = requestAnimationFrame((t) => step.current(t));
      }
    },
    [paint],
  );

  const local = (clientX: number, clientY: number): Vec => {
    const rect = rootRef.current?.getBoundingClientRect();
    return { x: clientX - (rect?.left ?? 0), y: clientY - (rect?.top ?? 0) };
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>, index: number) => {
    // Anything but touch follows: some synthetic and assistive pointers report an empty type.
    if (event.pointerType === "touch") return;
    if (active !== index) setActive(index);
    const point = local(event.clientX, event.clientY);
    moveTo(point.x, point.y);
  };

  // Touch has no hover, so a tap on a plain row shows its photo at the tap point.
  const handlePointerDown = (event: PointerEvent<HTMLElement>, index: number) => {
    if (event.pointerType !== "touch") return;
    setActive(index);
    placed.current = false;
    const point = local(event.clientX, event.clientY);
    moveTo(point.x, point.y - imageWidth * 0.45);
  };

  // Keyboard focus has no pointer, so the image rests beside the row's title.
  const handleFocus = (event: FocusEvent<HTMLElement>, index: number) => {
    if (!event.currentTarget.matches(":focus-visible")) return;
    setActive(index);
    const rect = event.currentTarget.getBoundingClientRect();
    const rootWidth = rootRef.current?.getBoundingClientRect().width ?? 0;
    const point = local(rect.left, rect.top + rect.height / 2);
    moveTo(Math.min(point.x + rootWidth * 0.62, rootWidth - imageWidth * 0.5), point.y);
  };

  const hide = () => {
    setActive(null);
    placed.current = false;
  };

  return (
    <ul
      ref={rootRef}
      className={cn(styles.root, className)}
      data-active={active !== null || undefined}
      style={{ "--img-w": `${imageWidth}px`, "--img-ratio": ratio, ...style } as CSSProperties}
      onPointerLeave={(event) => {
        // Touch fires a leave on every lift, which would hide a tapped photo at once.
        if (event.pointerType !== "touch") hide();
        onPointerLeave?.(event);
      }}
      {...props}
    >
      {items.map((item, index) => {
        const Row = item.href ? "a" : "div";
        return (
          <li key={item.id} className={styles.item}>
            <Row
              href={item.href}
              tabIndex={item.href ? undefined : 0}
              className={styles.row}
              data-current={active === index || undefined}
              onPointerEnter={(event) => handlePointerMove(event, index)}
              onPointerMove={(event) => handlePointerMove(event, index)}
              onPointerDown={(event) => handlePointerDown(event, index)}
              onFocus={(event) => handleFocus(event, index)}
              onBlur={hide}
            >
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.title}>{item.title}</span>
              {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
            </Row>
          </li>
        );
      })}

      <li aria-hidden="true" className={styles.anchor}>
        <div ref={floatRef} className={styles.float}>
          <div className={styles.frame} data-visible={active !== null || undefined}>
            {items.map((item, index) => (
              <div
                key={item.id}
                className={styles.layer}
                data-state={active === index ? "in" : active !== null && index < active ? "above" : "below"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the component framework-agnostic */}
                <img src={item.src} alt="" className={styles.img} decoding="async" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </li>
    </ul>
  );
}
