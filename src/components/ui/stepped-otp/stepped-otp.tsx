"use client";

import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./stepped-otp.module.css";

export type SteppedOtpProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  /** Number of digits. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Fires when the last slot is filled. */
  onComplete?: (code: string) => void;
  /** Visible label for the code field. */
  label?: ReactNode;
  status?: "idle" | "error" | "success";
  /** Helper, error or success text under the slots. Announced politely. */
  message?: ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  name?: string;
};

/**
 * A one-time code field. One real input carries the value, autofill and paste;
 * the slots are its picture, and each digit ticks into place in three steps.
 */
export function SteppedOtp({
  length = 6,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  label = "Verification code",
  status = "idle",
  message,
  disabled,
  autoFocus,
  name,
  className,
  ...props
}: SteppedOtpProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inner, setInner] = useState(defaultValue);
  const [caret, setCaret] = useState(0);
  const [focused, setFocused] = useState(false);
  const code = (value ?? inner).slice(0, length);
  const active = Math.min(caret, length - 1);

  // Keep a one-character selection on the active slot, so typing overwrites it.
  const select = (pos: number) => {
    const el = inputRef.current;
    if (!el) return;
    const len = el.value.length;
    const start = Math.max(0, Math.min(pos, len, length - 1));
    const end = start < len ? start + 1 : start;
    if (el.selectionStart !== start || el.selectionEnd !== end) el.setSelectionRange(start, end);
    setCaret(start);
  };

  const sync = () => {
    const el = inputRef.current;
    if (el) select(el.selectionStart ?? el.value.length);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value.replace(/\D/g, "").slice(0, length);
    if (next === code) return;
    if (value === undefined) setInner(next);
    onValueChange?.(next);
    if (next.length === length) onComplete?.(next);
    // After the browser places the caret, snap the selection to the next slot.
    requestAnimationFrame(sync);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const len = code.length;
    const moves: Record<string, number> = {
      ArrowLeft: active - 1,
      ArrowRight: active + 1,
      Home: 0,
      End: len,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key]);
    }
  };

  // Clicks land on the transparent input; map the x position to a slot.
  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const slot = Math.floor(((event.clientX - rect.left) / rect.width) * length);
    select(slot);
  };

  const describedBy = message ? `${id}-msg` : undefined;
  const half = length % 2 === 0 && length >= 6 ? length / 2 : -1;

  return (
    <div data-status={status} className={cn(styles.root, className)} {...props}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.field} data-focused={focused || undefined}>
        <div className={styles.slots} aria-hidden="true">
          {Array.from({ length }, (_, i) => {
            const char = code[i];
            const isActive = focused && i === active;
            return (
              <div
                key={i}
                className={styles.slot}
                data-active={isActive || undefined}
                data-filled={char ? true : undefined}
                data-split={i === half || undefined}
              >
                {char ? (
                  <span key={char} className={styles.digit}>
                    {char}
                  </span>
                ) : null}
                {isActive && !char ? <span className={styles.caret} /> : null}
              </div>
            );
          })}
        </div>
        <input
          ref={inputRef}
          id={id}
          name={name}
          className={styles.input}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={sync}
          onClick={handleClick}
          onFocus={() => {
            setFocused(true);
            requestAnimationFrame(() => select(code.length));
          }}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          autoFocus={autoFocus}
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={length}
          spellCheck={false}
          aria-invalid={status === "error" || undefined}
          aria-describedby={describedBy}
        />
      </div>
      <p id={`${id}-msg`} className={styles.message} aria-live="polite">
        {message}
      </p>
    </div>
  );
}
