"use client";

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./detent-slider.module.css";

export type DetentMark = number | { value: number; label?: string };

export type DetentSliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "min" | "max" | "step" | "onChange"
> & {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Formats the readout and the accessible value text. */
  format?: (value: number) => string;
  /** Detents: labelled major ticks that pull the thumb in when dragged near. */
  marks?: DetentMark[];
};

const MAX_TICKS = 48;
const NICE = [1, 2, 2.5, 5, 10];

/** Minor tick spacing: the step, or the smallest "nice" multiple of it that keeps the scale readable. */
function tickSpacing(min: number, max: number, step: number) {
  const span = max - min;
  if (span / step <= MAX_TICKS) return step;
  const raw = span / MAX_TICKS;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  for (const n of NICE) if (n * magnitude >= raw && (n * magnitude) % step === 0) return n * magnitude;
  return Math.ceil(raw / step) * step;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** A fader on a machined track. Ticks mark each step, and labelled detents catch the thumb as it passes. */
export function DetentSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  format = String,
  marks = [],
  className,
  style,
  disabled,
  onKeyDown,
  onPointerDown,
  ...props
}: DetentSliderProps) {
  const [inner, setInner] = useState(() => clamp(defaultValue ?? min, min, max));
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const current = clamp(value ?? inner, min, max);
  const span = max - min || 1;
  const at = (v: number) => (v - min) / span;

  const detents = useMemo(
    () =>
      marks
        .map((mark) => (typeof mark === "number" ? { value: mark, label: undefined } : mark))
        .filter((mark) => mark.value >= min && mark.value <= max)
        .sort((a, b) => a.value - b.value),
    [marks, min, max],
  );

  const ticks = useMemo(() => {
    const spacing = tickSpacing(min, max, step);
    const list: number[] = [];
    for (let v = Math.ceil(min / spacing) * spacing; v <= max + 1e-9; v += spacing) list.push(v);
    return list;
  }, [min, max, step]);

  const commit = (next: number) => {
    const rounded = Number(clamp(next, min, max).toFixed(6));
    if (rounded === current) return;
    if (value === undefined) setInner(rounded);
    onValueChange?.(rounded);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let next = Number(event.target.value);
    // Pointer drags fall into a detent when they pass within 2% of it. Keys are left exact.
    if (draggingRef.current) {
      const near = detents.find((mark) => Math.abs(mark.value - next) <= span * 0.02);
      if (near) next = near.value;
    }
    commit(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !detents.length) return;
    // Page keys travel detent to detent instead of by a fixed fraction.
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const target =
        event.key === "PageUp"
          ? detents.find((mark) => mark.value > current)?.value ?? max
          : [...detents].reverse().find((mark) => mark.value < current)?.value ?? min;
      commit(target);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLInputElement>) => {
    onPointerDown?.(event);
    if (disabled) return;
    draggingRef.current = true;
    setDragging(true);
    const release = () => {
      draggingRef.current = false;
      setDragging(false);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  };

  const text = format(current);

  return (
    <div
      className={cn(styles.root, className)}
      style={{ ...style, "--p": at(current) } as CSSProperties}
      data-dragging={dragging || undefined}
      data-disabled={disabled || undefined}
    >
      <div className={styles.track}>
        <div className={styles.groove} aria-hidden="true">
          <div className={styles.fill} />
        </div>

        <div className={styles.scale} aria-hidden="true">
          {ticks.map((tick) => (
            <span
              key={tick}
              className={styles.tick}
              data-on={tick <= current || undefined}
              style={{ "--at": at(tick) } as CSSProperties}
            />
          ))}
          {detents.map((mark) => (
            <span
              key={mark.value}
              className={styles.mark}
              data-on={mark.value <= current || undefined}
              data-here={mark.value === current || undefined}
              style={{ "--at": at(mark.value) } as CSSProperties}
            >
              <span className={styles.markLabel}>{mark.label ?? format(mark.value)}</span>
            </span>
          ))}
        </div>

        <div className={styles.carriage} aria-hidden="true">
          <span className={styles.cap}>
            <span className={styles.readout}>{text}</span>
          </span>
        </div>

        <input
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          aria-valuetext={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          {...props}
        />
      </div>
    </div>
  );
}
