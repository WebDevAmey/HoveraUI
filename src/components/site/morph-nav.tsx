"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./site-header.module.css";

export type NavCategory = { id: string; label: string; count: number };
export type NavGuide = { href: string; label: string; hint: string; color: string; icon: ReactNode };

const U = 8;
const PANELS = ["Components", "Docs"] as const;

const chevron = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 4 5 6.5 7.5 4" />
  </svg>
);

const arrow = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9 9 3M4 3h5v5" />
  </svg>
);

function Mark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 6 + 1}
            y={row * 6 + 1}
            width="4"
            height="4"
            rx="1"
            fill={row === 0 && col === 2 ? "#8fa2ff" : "currentColor"}
            opacity={row === 0 && col === 2 ? 1 : 0.9}
          />
        )),
      )}
    </svg>
  );
}

const CTA = "GitHub";

/**
 * The site navigation: one dark shell that morphs between the Components and Docs panels.
 * Geometry is measured once and written straight to the DOM, so opening and moving between
 * panels never re-renders the page.
 */
export function MorphNav({
  categories,
  guides,
  github,
  search,
}: {
  categories: NavCategory[];
  guides: NavGuide[];
  github: string;
  search: ReactNode;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState(-1);

  const navRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const hlRef = useRef<HTMLSpanElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const glideRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeRef = useRef(-1);
  const geo = useRef({ boxes: [] as { l: number; w: number; h: number }[], bounds: { l: 0, r: 0, h: 0 }, barW: 0, barH: 0 });
  const openT = useRef(0);
  const closeT = useRef(0);
  const rolling = useRef(false);

  // Clip the shell (and the panel layer) to the bar, or to the bar plus the active panel.
  const apply = useCallback(() => {
    const { boxes, bounds, barW, barH } = geo.current;
    let l = -barW / 2;
    let r = barW / 2;
    let h = barH;
    const a = activeRef.current;
    if (a >= 0 && boxes[a]) {
      l = Math.min(l, boxes[a].l);
      r = Math.max(r, boxes[a].l + boxes[a].w);
      h = barH + boxes[a].h;
    }
    for (const el of [shellRef.current, clipRef.current]) {
      if (!el) continue;
      el.style.setProperty("--cl", `${l - bounds.l}px`);
      el.style.setProperty("--cr", `${bounds.r - r}px`);
      el.style.setProperty("--cy", `${bounds.h - h}px`);
    }
  }, []);

  const measure = useCallback(() => {
    const bar = barRef.current;
    const nav = navRef.current;
    const wrap = wrapRef.current;
    const clip = clipRef.current;
    if (!bar || !nav || !wrap || !clip) return;
    const barW = bar.offsetWidth;
    const barH = bar.offsetHeight;
    // Docs rows span the bar, so that panel opens straight down from it.
    if (rowsRef.current) rowsRef.current.style.width = `${barW - U * 2}px`;
    const panels = panelRefs.current.filter((p): p is HTMLElement => p !== null);
    const boxes = panels.map((p) => ({ l: -p.offsetWidth / 2, w: p.offsetWidth, h: p.offsetHeight }));
    const bounds = {
      l: Math.min(-barW / 2, ...boxes.map((b) => b.l)),
      r: Math.max(barW / 2, ...boxes.map((b) => b.l + b.w)),
      h: barH + Math.max(0, ...boxes.map((b) => b.h)),
    };
    const W = bounds.r - bounds.l;
    wrap.style.left = `${barW / 2 + bounds.l}px`;
    wrap.style.width = `${W}px`;
    wrap.style.height = `${bounds.h}px`;
    clip.style.width = `${W}px`;
    clip.style.height = `${bounds.h}px`;
    nav.style.width = `${barW}px`;
    panels.forEach((p, i) => p.style.setProperty("left", `${boxes[i].l - bounds.l}px`));
    geo.current = { boxes, bounds, barW, barH };
    // A measure is a correction, not a morph: snap the clip into place. Without this the first
    // measure after hydration animated the shell from its unclipped full-panel rectangle (with
    // its wide drop shadow) down to the bar, which read as a box flashing on every reload.
    const clipped = [shellRef.current, clipRef.current].filter((el): el is HTMLDivElement => el !== null);
    clipped.forEach((el) => (el.style.transition = "none"));
    apply();
    clipped.forEach((el) => {
      void getComputedStyle(el).clipPath;
      el.style.transition = "";
    });
    nav.dataset.ready = "";
  }, [apply]);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (barRef.current) observer.observe(barRef.current);
    panelRefs.current.forEach((p) => p && observer.observe(p));
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  const glideTo = useCallback((t: HTMLElement | null | undefined) => {
    const hl = hlRef.current;
    if (!hl || !t) return;
    hl.style.setProperty("--hx", `${t.offsetLeft}px`);
    hl.style.setProperty("--hw", `${t.offsetWidth}px`);
    linksRef.current?.setAttribute("data-hovering", "");
  }, []);

  const show = useCallback(
    (i: number) => {
      window.clearTimeout(closeT.current);
      const prev = activeRef.current;
      if (i === prev) return;
      // The incoming panel slides in from the side of travel; the outgoing one leaves the other way.
      panelRefs.current.forEach((p, k) => {
        if (!p) return;
        const dir = prev < 0 ? 0 : k === i ? (i > prev ? 1 : -1) * 12 : (i > prev ? -1 : 1) * 12;
        if (k === i) {
          p.style.transition = "none";
          p.style.setProperty("--dx", `${dir}px`);
          void p.offsetWidth;
          p.style.transition = "";
          p.setAttribute("data-active", "");
        } else if (k === prev) {
          p.style.setProperty("--dx", `${dir}px`);
          p.removeAttribute("data-active");
        } else p.removeAttribute("data-active");
      });
      activeRef.current = i;
      navRef.current?.setAttribute("data-open", "");
      setActive(i);
      apply();
    },
    [apply],
  );

  const hide = useCallback(() => {
    const prev = activeRef.current;
    if (prev < 0) return;
    panelRefs.current[prev]?.style.setProperty("--dx", "0px");
    panelRefs.current.forEach((p) => p?.removeAttribute("data-active"));
    activeRef.current = -1;
    navRef.current?.removeAttribute("data-open");
    linksRef.current?.removeAttribute("data-hovering");
    listRef.current?.removeAttribute("data-hovering");
    setActive(-1);
    apply();
  }, [apply]);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(openT.current);
    window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(hide, 200);
  }, [hide]);

  // Close on navigation, Escape, a press outside, or focus leaving the nav.
  useEffect(() => {
    hide();
  }, [pathname, hide]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || activeRef.current < 0) return;
      const t = triggerRefs.current[activeRef.current];
      hide();
      t?.focus();
    };
    const onDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) hide();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      window.clearTimeout(openT.current);
      window.clearTimeout(closeT.current);
    };
  }, [hide]);

  const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const flip = () => {
    const cta = ctaRef.current;
    if (!cta || rolling.current || reduced()) return;
    rolling.current = true;
    cta.setAttribute("data-rolled", "");
    window.setTimeout(() => {
      const chars = cta.querySelectorAll<HTMLElement>(`.${styles.ch}`);
      chars.forEach((c) => (c.style.transition = "none"));
      cta.removeAttribute("data-rolled");
      void cta.offsetWidth;
      chars.forEach((c) => (c.style.transition = ""));
      rolling.current = false;
    }, 560 + 16 * CTA.length + 40);
  };

  const glideList = (el: HTMLElement) => {
    const g = glideRef.current;
    if (!g) return;
    g.style.setProperty("--gx", `${el.offsetLeft}px`);
    g.style.setProperty("--gy", `${el.offsetTop}px`);
    g.style.setProperty("--gw", `${el.offsetWidth}px`);
    g.style.setProperty("--gh", `${el.offsetHeight}px`);
    listRef.current?.setAttribute("data-hovering", "");
  };

  const section = pathname.startsWith("/components") ? 0 : pathname.startsWith("/docs") ? 1 : -1;

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={styles.nav}
      onPointerEnter={() => window.clearTimeout(closeT.current)}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) hide();
      }}
    >
      <div ref={wrapRef} className={styles.shellWrap}>
        <div ref={shellRef} className={styles.shell} aria-hidden="true" />
        <div ref={clipRef} className={styles.clip}>
          <div className={styles.stage}>
            <section
              ref={(el) => {
                panelRefs.current[0] = el;
              }}
              id="nav-components"
              aria-label="Components"
              className={styles.panel}
            >
              <div ref={listRef} className={styles.list} onPointerLeave={() => listRef.current?.removeAttribute("data-hovering")}>
                <span ref={glideRef} className={styles.glide} aria-hidden="true" />
                {[{ id: "all", label: "All components", count: categories.reduce((n, c) => n + c.count, 0) }, ...categories].map((c, k) => (
                  <Link
                    key={c.id}
                    href={c.id === "all" ? "/components" : `/components#cat-${c.id}`}
                    className={`${styles.item} ${styles.stag}`}
                    style={{ "--i": k } as CSSProperties}
                    tabIndex={active === 0 ? undefined : -1}
                    onPointerEnter={(e) => glideList(e.currentTarget)}
                    onFocus={(e) => glideList(e.currentTarget)}
                    onClick={hide}
                  >
                    <span>
                      <b>{c.label}</b>
                      <small>{c.count} {c.count === 1 ? "component" : "components"}</small>
                    </span>
                    <span className={styles.arrow}>
                      {arrow}
                      {arrow}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
            <section
              ref={(el) => {
                panelRefs.current[1] = el;
              }}
              id="nav-docs"
              aria-label="Docs"
              className={styles.panel}
            >
              <div ref={rowsRef} className={styles.rows}>
                {guides.map((g, k) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className={`${styles.row} ${styles.stag}`}
                    style={{ "--i": k, "--c": g.color } as CSSProperties}
                    tabIndex={active === 1 ? undefined : -1}
                    onClick={hide}
                  >
                    <span className={styles.ico}>{g.icon}</span>
                    <b>{g.label}</b>
                    <small>{g.hint}</small>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div ref={barRef} className={styles.bar}>
        <Link href="/" className={styles.mark} aria-label="HoveraUI home">
          <Mark />
        </Link>
        <div
          ref={linksRef}
          className={styles.links}
          onPointerLeave={() => {
            window.clearTimeout(openT.current);
            if (activeRef.current < 0) linksRef.current?.removeAttribute("data-hovering");
            else glideTo(triggerRefs.current[activeRef.current]);
          }}
        >
          <span ref={hlRef} className={styles.hl} aria-hidden="true" />
          {PANELS.map((label, i) => (
            <button
              key={label}
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              className={styles.trigger}
              aria-expanded={active === i}
              aria-controls={i === 0 ? "nav-components" : "nav-docs"}
              data-current={section === i || undefined}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse" || !fine()) return;
                glideTo(event.currentTarget);
                window.clearTimeout(openT.current);
                window.clearTimeout(closeT.current);
                openT.current = window.setTimeout(() => show(i), activeRef.current < 0 ? 80 : 50);
              }}
              onClick={(event) => {
                glideTo(event.currentTarget);
                if (activeRef.current === i) hide();
                else show(i);
              }}
              onFocus={(event) => glideTo(event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  show(i);
                  requestAnimationFrame(() => panelRefs.current[i]?.querySelector<HTMLElement>("a")?.focus());
                }
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const n = (i + (event.key === "ArrowRight" ? 1 : -1) + PANELS.length) % PANELS.length;
                  triggerRefs.current[n]?.focus();
                  if (activeRef.current >= 0) show(n);
                }
              }}
            >
              {label}
              {chevron}
            </button>
          ))}
        </div>
        {search}
        <a
          ref={ctaRef}
          href={github}
          className={styles.cta}
          aria-label="HoveraUI on GitHub"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") flip();
          }}
          onFocus={flip}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
            <path d="M8 .2a8 8 0 0 0-2.53 15.6c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 .2Z" />
          </svg>
          <span className={styles.roll} aria-hidden="true">
            {[...CTA].map((c, k) => (
              <span key={k} className={styles.ch} data-c={c} style={{ "--k": k } as CSSProperties}>
                <span>{c}</span>
              </span>
            ))}
          </span>
        </a>
      </div>
    </nav>
  );
}
