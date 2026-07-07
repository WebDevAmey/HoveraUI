"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
 * VECTOR BRAND LOGO COMPONENTS
 * -------------------------------------------------------------------------- */

const TECH_LOGOS = [
  () => (
    <span className="inline-flex items-center gap-1.5 font-semibold text-sm md:text-base text-foreground/80 opacity-60 hover:opacity-100 transition-opacity duration-500 select-none">
      <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 180 180" fill="none" aria-hidden="true">
        <circle cx="90" cy="90" r="87" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="6" />
        <text x="90" y="115" textAnchor="middle" fontSize="80" fontWeight="bold" fill="currentColor">N</text>
      </svg>
      Next.js
    </span>
  ),
  () => (
    <span className="inline-flex items-center gap-1.5 font-semibold text-sm md:text-base text-foreground/80 opacity-60 hover:opacity-100 transition-opacity duration-500 select-none">
      <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">R</text>
      </svg>
      React 19
    </span>
  ),
  () => (
    <span className="inline-flex items-center gap-1.5 font-semibold text-sm md:text-base text-foreground/80 opacity-60 hover:opacity-100 transition-opacity duration-500 select-none">
      <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">TS</text>
      </svg>
      TypeScript
    </span>
  ),
  () => (
    <span className="inline-flex items-center gap-1.5 font-semibold text-sm md:text-base text-foreground/80 opacity-60 hover:opacity-100 transition-opacity duration-500 select-none">
      <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      Tailwind CSS
    </span>
  ),
  () => (
    <span className="inline-flex items-center gap-1.5 font-semibold text-sm md:text-base text-foreground/80 opacity-60 hover:opacity-100 transition-opacity duration-500 select-none">
      <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="16" cy="8" r="1.5" fill="currentColor" />
        <path d="M8 14c0 2 1.5 4 4 4s4-2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      Framer Motion
    </span>
  ),
  () => (
    <span className="inline-flex items-center gap-1.5 font-semibold text-sm md:text-base text-foreground/80 opacity-60 hover:opacity-100 transition-opacity duration-500 select-none">
      <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      shadcn/ui
    </span>
  ),
];

/* -----------------------------------------------------------------------------
 * CANVAS STAGGERED PHYSICS ENGINE
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.08, 0.4) * baseSpeed,
    size: 0,
    sizeStep: rand(0.12, 0.28),
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      this.isIdle = false;
      if (this.counter <= this.delay) {
        this.counter += this.counterStep;
        return;
      }
      if (this.size >= this.maxSize) this.isShimmer = true;
      if (this.isShimmer) this.shimmer();
      else this.size += this.sizeStep;
      this.draw();
    },
    disappear() {
      this.isShimmer = false;
      this.counter = 0;
      if (this.size <= 0) {
        this.isIdle = true;
        return;
      }
      this.size -= 0.1;
      this.draw();
    },
    shimmer() {
      if (this.size >= this.maxSize) this.isReverse = true;
      else if (this.size <= this.minSize) this.isReverse = false;
      if (this.isReverse) this.size -= this.speed;
      else this.size += this.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy) * 0.65;
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    animate("appear");

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Ultra-light inline icons (replaces Lucide — avoids banned icon sets)
 * -------------------------------------------------------------------------- */

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12L12 2" />
      <path d="M5 2h7v7" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0c4.42 0 8 3.58 8 8a8.01 8.01 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38c0-.27.01-1.13.01-2.2c0-.75-.25-1.23-.54-1.48c1.78-.2 3.65-.88 3.65-3.95c0-.88-.31-1.59-.82-2.15c.08-.2.36-1.02-.08-2.12c0 0-.67-.22-2.2.82c-.64-.18-1.32-.27-2-.27s-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82c-.44 1.1-.16 1.92-.08 2.12c-.51.56-.82 1.28-.82 2.15c0 3.06 1.86 3.75 3.64 3.95c-.23.2-.44.55-.51 1.07c-.46.21-1.61.55-2.33-.66c-.15-.24-.6-.83-1.23-.82c-.67.01-.27.38.01.53c.34.19.73.9.82 1.13c.16.45.68 1.31 2.69.94c0 .67.01 1.3.01 1.49c0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8" />
    </svg>
  );
}

/* -----------------------------------------------------------------------------
 * HERO COMPONENT
 * -------------------------------------------------------------------------- */

interface PixelHeroProps {
  word1?: string;
  word2?: string;
  description?: string;
  primaryCta?: string;
  primaryCtaMobile?: string;
  secondaryCta?: string;
  secondaryCtaMobile?: string;
  primaryHref?: string;
  githubUrl?: string;
}

export function PixelHero({
  word1 = "Silent",
  word2 = "Precision.",
  description = "Minimalist interfaces driven by refined motion. Every calculated detail delivers an elevated digital experience.",
  primaryCta = "Explore Design",
  primaryCtaMobile = "Explore",
  secondaryCta = "View GitHub",
  secondaryCtaMobile = "GitHub",
  primaryHref = "/components",
  githubUrl = "https://github.com",
}: PixelHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const div = document.createElement("div");
    document.body.appendChild(div);
    div.className = "text-muted-foreground";
    const muted = getComputedStyle(div).color;
    div.className = "text-foreground";
    const fg = getComputedStyle(div).color;
    document.body.removeChild(div);

    setThemeColors([muted, muted, muted, fg, muted]);

    const loadTimer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="relative w-full min-h-[100dvh] bg-background flex flex-col justify-between md:justify-center md:gap-6 py-8 md:py-0 px-2 sm:px-6 overflow-hidden select-none isolate">


      {/* Canvas background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {themeColors.length > 0 && <PixelCanvas colors={themeColors} gap={6} speed={30} />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] pointer-events-none opacity-80" />
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center justify-center text-center order-1 md:order-1 mt-28 sm:mt-0 pointer-events-none w-full">
        <h1 className="tahoe-glass-text flex flex-row items-center justify-center gap-1.5 sm:gap-4 lg:gap-6 px-1 w-full flex-wrap text-[2.8rem] xs:text-[3.2rem] sm:text-6xl md:text-8xl lg:text-9xl leading-none">
          <span className="font-serif italic font-medium">{word1}</span>
          <span className="font-sans font-extrabold tracking-tighter">{word2}</span>
        </h1>
      </div>

      {/* Description + Mobile marquee */}
      <div className="flex flex-col items-center justify-center text-center my-auto md:my-0 order-2 md:order-2 px-1 w-full pointer-events-none">
        <p className="text-sm sm:text-lg md:text-xl font-light text-foreground/85 max-w-[95%] sm:max-w-md md:max-w-xl px-1 leading-relaxed">
          {description}
        </p>

        <div className="block md:hidden w-full mt-14 pointer-events-auto">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground/80 font-medium mb-5">
            Technologies used
          </div>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="flex w-max gap-12 py-1 animate-marquee">
              <div className="flex gap-12 items-center">{TECH_LOGOS.map((Logo, i) => <Logo key={i} />)}</div>
              <div className="flex gap-12 items-center" aria-hidden="true">{TECH_LOGOS.map((Logo, i) => <Logo key={`c-${i}`} />)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA buttons — double-bezel + button-in-button trailing icon */}
      <div
        className={cn(
          "pointer-events-auto flex flex-row items-center justify-center gap-3 mt-4 md:mt-10 mb-4 md:mb-0 order-4 md:order-3 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] transform px-1",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: "450ms" }}
      >
        <a
          href={primaryHref}
          className="group relative inline-flex h-10 md:h-12 items-center justify-center gap-2 md:gap-3 bg-primary px-4 md:px-7 text-xs md:text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        >
          <span className="inline md:hidden">{primaryCtaMobile}</span>
          <span className="hidden md:inline">{primaryCta}</span>
          <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center bg-black/10 dark:bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105">
            <ArrowIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </span>
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex h-10 md:h-12 items-center justify-center gap-2 md:gap-3 bg-card px-4 md:px-7 text-xs md:text-sm font-semibold text-card-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] ring-1 ring-border/50 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        >
          <GitHubIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="inline md:hidden">{secondaryCtaMobile}</span>
          <span className="hidden md:inline">{secondaryCta}</span>
        </a>
      </div>

      {/* Desktop marquee */}
      <div
        className={cn(
          "hidden md:flex absolute bottom-8 left-0 right-0 w-full z-10 pointer-events-auto flex-col items-center justify-center gap-4 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] transform",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: "600ms" }}
      >
        <span className="text-xs uppercase tracking-wider text-muted-foreground/80 font-medium select-none">
          Technologies used
        </span>
        <div className="relative w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex w-max gap-16 py-3 animate-marquee">
            <div className="flex gap-16 items-center">{TECH_LOGOS.map((Logo, i) => <Logo key={i} />)}</div>
            <div className="flex gap-16 items-center" aria-hidden="true">{TECH_LOGOS.map((Logo, i) => <Logo key={`c-${i}`} />)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
