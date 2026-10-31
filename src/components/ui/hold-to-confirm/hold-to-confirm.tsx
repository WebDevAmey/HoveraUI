"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./hold-to-confirm.module.css";

export type HoldToConfirmProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Fires once the hold completes. */
  onConfirm?: () => void;
  /** How long the hold takes, in ms. */
  duration?: number;
  tone?: "neutral" | "danger";
  /** Leading icon, rendered decoratively. */
  icon?: ReactNode;
  /** Label shown briefly after the hold completes. */
  confirmedLabel?: ReactNode;
  /** How long the confirmed state stays before the button resets, in ms. */
  resetAfter?: number;
};

const DRAIN_MS = 380;

/** A button that only acts after it is held. Early release drains the fill back out. */
export function HoldToConfirm({
  onConfirm,
  duration = 1200,
  tone = "neutral",
  icon,
  confirmedLabel = "Confirmed",
  resetAfter = 1600,
  className,
  disabled,
  children,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
  onContextMenu,
  "aria-describedby": describedBy,
  ...props
}: HoldToConfirmProps) {
  const hintId = useId();
  const ref = useRef<HTMLButtonElement>(null);
  const progress = useRef(0);
  const holding = useRef(false);
  const confirmed = useRef(false);
  const frame = useRef(0);
  const last = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const confirmRef = useRef(onConfirm);
  const [phase, setPhase] = useState<"idle" | "holding" | "confirmed">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    confirmRef.current = onConfirm;
  });

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(timer.current);
    },
    [],
  );

  const write = () => ref.current?.style.setProperty("--p", progress.current.toFixed(4));

  // Progress lives in a ref and a CSS variable, so a hold never re-renders per frame.
  const tick = (now: number) => {
    const dt = last.current < 0 ? 0 : Math.min(now - last.current, 64);
    last.current = now;
    if (holding.current) {
      progress.current = Math.min(1, progress.current + dt / duration);
      write();
      if (progress.current >= 1) {
        holding.current = false;
        confirmed.current = true;
        frame.current = 0;
        setPhase("confirmed");
        setMessage("Confirmed");
        confirmRef.current?.();
        timer.current = setTimeout(() => {
          confirmed.current = false;
          setPhase("idle");
          run();
        }, resetAfter);
        return;
      }
    } else {
      progress.current = Math.max(0, progress.current - dt / DRAIN_MS);
      write();
      if (progress.current <= 0) {
        frame.current = 0;
        return;
      }
    }
    frame.current = requestAnimationFrame(tick);
  };

  const run = () => {
    if (frame.current) return;
    last.current = -1;
    frame.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (disabled || confirmed.current || holding.current) return;
    holding.current = true;
    setPhase("holding");
    setMessage("Keep holding");
    run();
  };

  const stop = () => {
    if (!holding.current) return;
    holding.current = false;
    setPhase("idle");
    setMessage("Released early. Hold to confirm");
    run();
  };

  const isHoldKey = (event: KeyboardEvent) => event.key === " " || event.key === "Enter";

  return (
    <button
      ref={ref}
      type="button"
      data-tone={tone}
      data-phase={phase}
      disabled={disabled}
      aria-describedby={cn(hintId, describedBy) || undefined}
      className={cn(styles.button, className)}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
        if (event.button === 0) start();
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        stop();
        onPointerUp?.(event);
      }}
      onPointerLeave={(event) => {
        stop();
        onPointerLeave?.(event);
      }}
      onPointerCancel={(event) => {
        stop();
        onPointerCancel?.(event);
      }}
      onKeyDown={(event) => {
        if (isHoldKey(event)) {
          event.preventDefault();
          if (!event.repeat) start();
        }
        onKeyDown?.(event);
      }}
      onKeyUp={(event) => {
        if (isHoldKey(event)) stop();
        onKeyUp?.(event);
      }}
      onBlur={(event) => {
        stop();
        onBlur?.(event);
      }}
      onContextMenu={(event) => {
        // A long press on touch would otherwise open the context menu mid-hold.
        event.preventDefault();
        onContextMenu?.(event);
      }}
      {...props}
    >
      <span className={styles.face}>
        {icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className={styles.stack}>
          <span>{children}</span>
          <span className={styles.ghost} aria-hidden="true">
            {confirmedLabel}
          </span>
        </span>
      </span>
      {/* The fill is a full inverted copy of the face, revealed left to right by clip-path. */}
      <span className={cn(styles.face, styles.fill)} aria-hidden="true">
        {icon ? <span className={styles.icon}>{phase === "confirmed" ? <Check /> : icon}</span> : null}
        <span className={styles.stack}>
          <span className={styles.idleLabel}>{children}</span>
          <span className={styles.doneLabel}>{confirmedLabel}</span>
        </span>
      </span>
      <span id={hintId} className={styles.srOnly}>
        Press and hold to confirm
      </span>
      <span className={styles.srOnly} aria-live="polite">
        {message}
      </span>
    </button>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}
