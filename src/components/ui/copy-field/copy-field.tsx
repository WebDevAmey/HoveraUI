"use client";

import { useEffect, useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./copy-field.module.css";

export type CopyFieldProps = Omit<HTMLAttributes<HTMLDivElement>, "onCopy"> & {
  value: string;
  label: ReactNode;
  /** Hide the value behind dots until revealed, for keys and tokens. */
  secret?: boolean;
  onCopy?: (value: string) => void;
};

/**
 * A read-only value with a copy button. The copy glyph blurs into a check, and a small
 * "Copied" note rises from the button, so the confirmation shows up where the click was.
 */
export function CopyField({ value, label, secret = false, onCopy, className, ...props }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(!secret);
  const id = useId();

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);
    } catch {}
  };

  const shown = revealed ? value : "•".repeat(Math.min(value.length, 28));

  return (
    <div className={cn(styles.root, className)} {...props}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.field}>
        <input
          id={id}
          readOnly
          value={shown}
          aria-label={revealed ? undefined : "Hidden value"}
          className={styles.input}
          onFocus={(event) => revealed && event.currentTarget.select()}
          spellCheck={false}
        />
        {secret && (
          <button
            type="button"
            className={styles.action}
            aria-pressed={revealed}
            aria-label={revealed ? "Hide value" : "Show value"}
            onClick={() => setRevealed((r) => !r)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M1.75 8S4.25 3.5 8 3.5 14.25 8 14.25 8 11.75 12.5 8 12.5 1.75 8 1.75 8Z" />
              <circle cx="8" cy="8" r="2" />
              {revealed && <path d="m2.5 13.5 11-11" />}
            </svg>
          </button>
        )}
        <button type="button" className={styles.action} aria-label="Copy value" onClick={copy} data-copied={copied || undefined}>
          <svg className={styles.copyIcon} viewBox="0 0 16 16" aria-hidden="true">
            <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
            <path d="M10.5 3.5v-.25A1.25 1.25 0 0 0 9.25 2H3.75A1.25 1.25 0 0 0 2.5 3.25v5.5A1.25 1.25 0 0 0 3.75 10h.25" />
          </svg>
          <svg className={styles.checkIcon} viewBox="0 0 16 16" aria-hidden="true">
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
          <span className={styles.note} aria-hidden="true">
            Copied
          </span>
        </button>
        <span role="status" className={styles.sr}>
          {copied ? "Copied to clipboard" : ""}
        </span>
      </div>
    </div>
  );
}
