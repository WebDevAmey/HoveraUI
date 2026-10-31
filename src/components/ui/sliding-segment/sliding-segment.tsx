"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./sliding-segment.module.css";

export type SlidingSegmentOption = { value: string; label: ReactNode };

export type SlidingSegmentProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  options: SlidingSegmentOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md";
};

type Rect = { left: number; right: number };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** A segmented control whose thumb stretches toward its target, leading edge first, then settles. */
export function SlidingSegment({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  className,
  style,
  ...props
}: SlidingSegmentProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === current),
  );

  // Direction is derived from the previous index during render, so controlled changes stretch too.
  const [prev, setPrev] = useState(index);
  const [dir, setDir] = useState<"left" | "right">("right");
  if (index !== prev) {
    setPrev(index);
    setDir(index > prev ? "right" : "left");
  }

  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [rects, setRects] = useState<Rect[]>([]);
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    const measure = () => {
      setRects(
        itemRefs.current.map((el) =>
          el ? { left: el.offsetLeft, right: el.offsetLeft + el.offsetWidth } : { left: 0, right: 0 },
        ),
      );
      // Transitions switch on a frame after the first measurement, so the thumb never flies in.
      if (!frame) frame = requestAnimationFrame(() => setReady(true));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [options.length]);

  const select = (i: number, focus = false) => {
    const option = options[i];
    if (!option) return;
    if (focus) itemRefs.current[i]?.focus();
    if (option.value === current) return;
    if (value === undefined) setInner(option.value);
    onValueChange?.(option.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = options.length - 1;
    const map: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in map)) return;
    event.preventDefault();
    select(map[event.key], true);
  };

  const rect = rects[index];
  const thumbStyle = rect
    ? ({ "--ss-l": `${rect.left}px`, "--ss-r": `${rect.right}px` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={rootRef}
      role="radiogroup"
      data-size={size}
      data-dir={dir}
      data-ready={(ready && rect !== undefined) || undefined}
      className={cn(styles.root, className)}
      style={{ ...thumbStyle, ...style }}
      onKeyDown={onKeyDown}
      {...props}
    >
      <span className={styles.shadow} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      {options.map((option, i) => (
        <button
          key={option.value}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={i === index}
          tabIndex={i === index ? 0 : -1}
          className={styles.option}
          onClick={() => select(i)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
