"use client";

import { useId, type ReactNode } from "react";
import { OrbitGallery, type OrbitItem } from "./orbit-gallery";

const W = "rgb(255 255 255 / 0.88)";

function Thumb({ from, to, children }: { from: string; to: string; children: ReactNode }) {
  const id = useId();
  return (
    <svg viewBox="0 0 48 48">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: from }} />
          <stop offset="1" style={{ stopColor: to }} />
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill={`url(#${id})`} />
      <g fill="none" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const e1 = "var(--hv-ether-1)";
const e2 = "var(--hv-ether-2)";
const e3 = "var(--hv-ether-3)";
const sky = "var(--hv-sky-hi)";
const gilt = "var(--hv-gilt)";
const giltHi = "var(--hv-gilt-hi)";

const items: OrbitItem[] = [
  {
    id: "depth-key",
    name: "Depth Key",
    category: "Buttons",
    thumb: (
      <Thumb from={e1} to={sky}>
        <rect x="13" y="17" width="22" height="14" rx="4" fill={W} stroke="none" />
        <path d="M14 33.5h20" />
      </Thumb>
    ),
  },
  {
    id: "dither-field",
    name: "Dither Field",
    category: "Effects",
    thumb: (
      <Thumb from={e3} to={e1}>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle key={`${row}${col}`} cx={15 + col * 6} cy={15 + row * 6} r={0.6 + ((row + col) % 4) * 0.45} fill={W} stroke="none" />
          )),
        )}
      </Thumb>
    ),
  },
  {
    id: "corner-fold",
    name: "Corner Fold",
    category: "Cards",
    thumb: (
      <Thumb from={e2} to={giltHi}>
        <path d="M14 13h14l6 6v16H14z" fill={W} stroke="none" />
        <path d="M28 13v6h6" stroke="rgb(0 0 0 / 0.18)" />
      </Thumb>
    ),
  },
  {
    id: "aura",
    name: "Aura",
    category: "Effects",
    thumb: (
      <Thumb from={e1} to={e2}>
        <circle cx="24" cy="24" r="4" fill={W} stroke="none" />
        <circle cx="24" cy="24" r="9" opacity="0.7" />
        <circle cx="24" cy="24" r="14" opacity="0.4" />
      </Thumb>
    ),
  },
  {
    id: "sky-cutout",
    name: "Sky Cutout",
    category: "Cards",
    thumb: (
      <Thumb from={sky} to={e2}>
        <path d="M15 34V24a9 9 0 0 1 18 0v10z" fill={W} stroke="none" opacity="0.35" />
        <path d="M15 34V24a9 9 0 0 1 18 0v10z" />
      </Thumb>
    ),
  },
  {
    id: "detent-slider",
    name: "Detent Slider",
    category: "Inputs",
    thumb: (
      <Thumb from={e3} to={sky}>
        <path d="M12 26h24" />
        <path d="M14 31v2M19 31v2M24 31v2M29 31v2M34 31v2" opacity="0.7" />
        <circle cx="27" cy="26" r="3.5" fill={W} stroke="none" />
      </Thumb>
    ),
  },
  {
    id: "gilded-frame",
    name: "Gilded Frame",
    category: "Cards",
    thumb: (
      <Thumb from={giltHi} to={gilt}>
        <rect x="13" y="12" width="22" height="24" rx="1" />
        <rect x="16" y="15" width="16" height="18" rx="0.5" opacity="0.7" />
      </Thumb>
    ),
  },
  {
    id: "timeline-rail",
    name: "Timeline Rail",
    category: "Navigation",
    thumb: (
      <Thumb from={e1} to={e3}>
        <path d="M18 13v22" opacity="0.7" />
        <circle cx="18" cy="16" r="2.5" fill={W} stroke="none" />
        <circle cx="18" cy="24" r="2" />
        <circle cx="18" cy="32" r="2" />
        <path d="M24 16h10M24 24h7M24 32h9" />
      </Thumb>
    ),
  },
  {
    id: "stack-toast",
    name: "Stack Toast",
    category: "Feedback",
    thumb: (
      <Thumb from={e2} to={e1}>
        <rect x="17" y="15" width="14" height="6" rx="3" opacity="0.5" />
        <rect x="15" y="19" width="18" height="7" rx="3.5" opacity="0.75" />
        <rect x="12" y="24" width="24" height="9" rx="4.5" fill={W} stroke="none" />
      </Thumb>
    ),
  },
];

export default function Demo() {
  return (
    <OrbitGallery
      items={items}
      style={{ maxWidth: 340 }}
      center={
        <span style={{ display: "grid", gap: 6, justifyItems: "center" }}>
          <span>Hovera</span>
          <span
            style={{
              font: "400 10px/1 var(--hv-font-mono)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontStyle: "normal",
              color: "var(--hv-ink-2)",
            }}
          >
            Components
          </span>
        </span>
      }
    />
  );
}
