"use client";

import { useMemo, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./rolling-number.module.css";

export type RollingNumberProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  value: number;
  /** Intl.NumberFormat options, such as { style: "currency", currency: "EUR" }. */
  format?: Intl.NumberFormatOptions;
  locale?: string;
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * A number set in tabular figures where every digit is a wheel. When the value changes, each
 * wheel turns to its new digit, rightmost first, so you see which places moved.
 */
export function RollingNumber({ value, format, locale, className, ...props }: RollingNumberProps) {
  const text = useMemo(() => new Intl.NumberFormat(locale, format).format(value), [value, format, locale]);
  const chars = [...text];
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let seen = 0;

  return (
    <span className={cn(styles.root, className)} {...props}>
      <span className={styles.sr}>{text}</span>
      <span aria-hidden="true" className={styles.row}>
        {chars.map((char, i) => {
          // Key by place from the right, so a wheel keeps its identity as the number grows.
          const place = chars.length - i;
          if (!/\d/.test(char)) {
            return (
              <span key={`s${place}`} className={styles.sep}>
                {char}
              </span>
            );
          }
          const order = digitCount - 1 - seen++;
          return (
            <span key={`d${place}`} className={styles.wheel} style={{ "--n": Number(char), "--o": order } as React.CSSProperties}>
              <span className={styles.strip}>
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
