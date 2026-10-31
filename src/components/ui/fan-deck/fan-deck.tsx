"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./fan-deck.module.css";

export type FanDeckCard = {
  id: string;
  /** Accessible name of the card. */
  label: string;
  content: ReactNode;
};

export type FanDeckProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  cards: FanDeckCard[];
  /** Id of the picked card (controlled). */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (id: string) => void;
  /** Degrees between neighbouring cards when the deck is fanned. */
  spread?: number;
};

/**
 * A stack of cards that fans out like a hand. One card can be picked:
 * it lifts out of the fan and stays on top when the deck closes.
 */
export function FanDeck({
  cards,
  value,
  defaultValue = null,
  onValueChange,
  spread = 9,
  className,
  style,
  onPointerDown,
  onBlur,
  ...props
}: FanDeckProps) {
  const [inner, setInner] = useState<string | null>(defaultValue);
  const selected = value !== undefined ? value : inner;
  const selectedIndex = cards.findIndex((card) => card.id === selected);
  const [active, setActive] = useState(Math.max(0, selectedIndex));
  const [touchOpen, setTouchOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const swallowClick = useRef(false);

  // A tap outside closes a deck that a tap opened.
  useEffect(() => {
    if (!touchOpen) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setTouchOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [touchOpen]);

  const pick = (index: number) => {
    const card = cards[index];
    if (!card) return;
    setActive(index);
    if (value === undefined) setInner(card.id);
    onValueChange?.(card.id);
  };

  const focusCard = (index: number) => {
    const next = (index + cards.length) % cards.length;
    setActive(next);
    cardRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusCard(index + 1),
      ArrowDown: () => focusCard(index + 1),
      ArrowLeft: () => focusCard(index - 1),
      ArrowUp: () => focusCard(index - 1),
      Home: () => focusCard(0),
      End: () => focusCard(cards.length - 1),
      Enter: () => pick(index),
      " ": () => pick(index),
    };
    const run = keys[event.key];
    if (!run) return;
    event.preventDefault();
    run();
  };

  return (
    <div
      ref={rootRef}
      role="listbox"
      aria-orientation="horizontal"
      data-open={touchOpen || undefined}
      data-picked={selectedIndex >= 0 || undefined}
      className={cn(styles.deck, className)}
      style={{ "--mid": (cards.length - 1) / 2, "--spread": `${spread}deg`, ...style } as CSSProperties}
      onPointerDown={(event) => {
        // On touch the first tap only fans the deck; the next tap picks.
        swallowClick.current = event.pointerType !== "mouse" && !touchOpen;
        if (swallowClick.current) setTouchOpen(true);
        onPointerDown?.(event);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setTouchOpen(false);
        onBlur?.(event);
      }}
      {...props}
    >
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(node) => {
            cardRefs.current[index] = node;
          }}
          role="option"
          aria-selected={card.id === selected}
          aria-label={card.label}
          tabIndex={index === active ? 0 : -1}
          className={styles.card}
          style={{ "--i": index, zIndex: card.id === selected ? cards.length + 1 : index } as CSSProperties}
          onClick={() => {
            if (swallowClick.current) {
              swallowClick.current = false;
              setActive(index);
              return;
            }
            pick(index);
          }}
          onFocus={() => setActive(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {card.content}
        </div>
      ))}
    </div>
  );
}
