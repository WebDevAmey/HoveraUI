"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./perforated-ticket.module.css";

export type PerforatedTicketProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  eyebrow?: ReactNode;
  /** Large serif line on the ticket body. */
  title: ReactNode;
  /** Printed on the stub in mono. */
  serial: string;
  stubLabel?: ReactNode;
  torn?: boolean;
  defaultTorn?: boolean;
  onTornChange?: (torn: boolean) => void;
};

// Deterministic jitter for the torn edge, so server and client agree.
const JAG = [0.2, 0.9, 0.4, 1, 0.1, 0.7, 0.3, 0.95, 0.5, 0.15, 0.8, 0.35, 1, 0.25, 0.6, 0.05, 0.85, 0.45, 0.7, 0.2];
const AMP = 4;
const step = (index: number) => `${((index / (JAG.length - 1)) * 100).toFixed(2)}%`;
/** Right edge of the body: every point is a straight line until --pt-tear grows. */
const bodyClip = `polygon(0 0, ${JAG.map(
  (j, index) => `calc(100% - var(--pt-tear) * ${(j * AMP).toFixed(2)}px) ${step(index)}`,
).join(", ")}, 0 100%)`;
/** Left edge of the stub mirrors the body so the two halves would fit back together. */
const stubClip = `polygon(${JAG.map(
  (j, index) => `calc(var(--pt-tear) * ${((1 - j) * AMP).toFixed(2)}px) ${step(index)}`,
).join(", ")}, 100% 100%, 100% 0)`;

const PULL = 56;

/**
 * A ticket with notched corners at a perforated line. The stub tears off by
 * click or by dragging it away, leaving a ragged edge, and can be reattached.
 */
export function PerforatedTicket({
  eyebrow,
  title,
  serial,
  stubLabel = "Admit one",
  torn,
  defaultTorn = false,
  onTornChange,
  className,
  children,
  ...props
}: PerforatedTicketProps) {
  const [inner, setInner] = useState(defaultTorn);
  const isTorn = torn ?? inner;
  // Only animate a stub coming back, never on first render.
  const [returned, setReturned] = useState(false);
  const [message, setMessage] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const stubRef = useRef<HTMLButtonElement>(null);
  const reattachRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);
  const drag = useRef<{ x: number; y: number; id: number; moved: boolean } | null>(null);
  const swallowClick = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (isTorn ? reattachRef : stubRef).current?.focus();
  }, [isTorn]);

  const setTorn = (next: boolean) => {
    moveFocus.current = document.activeElement === (next ? stubRef : reattachRef).current;
    if (!next) setPull(0);
    if (torn === undefined) setInner(next);
    setReturned(!next);
    setMessage(next ? `Stub ${serial} torn off.` : `Stub ${serial} reattached.`);
    onTornChange?.(next);
  };

  const setPull = (amount: number) => {
    rootRef.current?.style.setProperty("--pull", amount.toFixed(3));
  };

  const handleDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleMove = (event: PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const distance = Math.hypot(event.clientX - state.x, event.clientY - state.y);
    if (distance > 4) state.moved = true;
    if (state.moved) {
      if (rootRef.current) rootRef.current.dataset.pulling = "";
      setPull(Math.min(1, Math.max(0, event.clientX - state.x + Math.max(0, event.clientY - state.y)) / PULL));
    }
  };

  const handleUp = (event: PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;
    if (rootRef.current) delete rootRef.current.dataset.pulling;
    if (!state.moved) return;
    // A drag replaces the click that follows it.
    swallowClick.current = true;
    const pulled = Number(rootRef.current?.style.getPropertyValue("--pull") || 0);
    // A full pull keeps its angle so the fall starts from where the hand let go.
    if (pulled >= 1) setTorn(true);
    else setPull(0);
  };

  return (
    <div ref={rootRef} data-torn={isTorn || undefined} className={cn(styles.ticket, className)} {...props}>
      <div className={styles.body} style={{ clipPath: bodyClip }}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <p className={styles.title}>{title}</p>
        {children && <div className={styles.details}>{children}</div>}
      </div>
      <div className={styles.slot}>
        <button
          ref={stubRef}
          type="button"
          className={styles.stub}
          data-returned={returned || undefined}
          style={{ clipPath: stubClip }}
          aria-label={`Tear stub ${serial}`}
          tabIndex={isTorn ? -1 : undefined}
          aria-hidden={isTorn || undefined}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerCancel={() => {
            drag.current = null;
            if (rootRef.current) delete rootRef.current.dataset.pulling;
            setPull(0);
          }}
          onClick={() => {
            if (swallowClick.current) {
              swallowClick.current = false;
              return;
            }
            setTorn(true);
          }}
        >
          <span className={styles.stubLabel}>{stubLabel}</span>
          <span className={styles.serial}>{serial}</span>
        </button>
        <button
          ref={reattachRef}
          type="button"
          className={styles.reattach}
          tabIndex={isTorn ? undefined : -1}
          aria-hidden={!isTorn || undefined}
          onClick={() => setTorn(false)}
        >
          Reattach
        </button>
      </div>
      <span className={styles.live} aria-live="polite">
        {message}
      </span>
    </div>
  );
}
