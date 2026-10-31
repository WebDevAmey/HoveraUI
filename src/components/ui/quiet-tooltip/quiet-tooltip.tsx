"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./quiet-tooltip.module.css";

type Group = { delay: number; warm: () => boolean; opened: () => void; closed: () => void };

const GroupContext = createContext<Group | null>(null);

/**
 * Shares timing between tooltips. The first one waits for `delay`; once any tooltip has shown,
 * neighbours open instantly and without animation until the pointer has been away for `skip` ms.
 */
export function TooltipGroup({ delay = 500, skip = 300, children }: { delay?: number; skip?: number; children: ReactNode }) {
  const last = useRef(0);
  const open = useRef(0);
  const [group] = useState<Group>(() => ({
    delay,
    warm: () => open.current > 0 || Date.now() - last.current < skip,
    opened: () => {
      open.current += 1;
    },
    closed: () => {
      open.current -= 1;
      last.current = Date.now();
    },
  }));
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
}

export type QuietTooltipProps = {
  /** The tooltip text. Keep it to a few words. */
  content: ReactNode;
  /** Keys shown after the text, e.g. ["⌘", "B"]. */
  shortcut?: string[];
  side?: "top" | "bottom";
  /** A single focusable element, such as a button. It receives aria-describedby. */
  children: ReactElement<{ "aria-describedby"?: string }>;
  className?: string;
};

export function QuietTooltip({ content, shortcut, side = "top", children, className }: QuietTooltipProps) {
  const group = useContext(GroupContext);
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const id = useId();

  const delay = group?.delay ?? 500;

  const show = (now: boolean) => {
    window.clearTimeout(timer.current);
    const warm = group?.warm() ?? false;
    if (now || warm) {
      setInstant(warm);
      setOpen(true);
      return;
    }
    setInstant(false);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };

  // Track how many tooltips in the group are open, and when the last one closed.
  useEffect(() => {
    if (!group || !open) return;
    group.opened();
    return group.closed;
  }, [group, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span
      className={cn(styles.anchor, className)}
      onPointerEnter={(event) => event.pointerType === "mouse" && show(false)}
      onPointerLeave={hide}
      onFocus={(event) => event.target.matches(":focus-visible") && show(true)}
      onBlur={hide}
      onPointerDown={hide}
    >
      {cloneElement(children, { "aria-describedby": id })}
      <span
        id={id}
        role="tooltip"
        data-side={side}
        data-open={open || undefined}
        data-instant={instant || undefined}
        className={styles.tip}
      >
        {content}
        {shortcut?.length ? (
          <span className={styles.keys}>
            {shortcut.map((key) => (
              <kbd key={key} className={styles.key}>
                {key}
              </kbd>
            ))}
          </span>
        ) : null}
      </span>
    </span>
  );
}
