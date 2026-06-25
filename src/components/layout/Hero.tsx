"use client";

import { backgrounds } from "@/data/background";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import { useApp } from "@/context/AppContext";

export default function Hero() {
  const { setCategory } = useApp();

  return (
    <section className="border-b border-border py-10" aria-label="Hero">
      <div className="flex w-fit items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden="true" />
        Component catalog
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Browse the Hovera UI component library.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Pick a category, preview the live demo, then copy the code and drop it in your project.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setCategory("buttons")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground/15 bg-foreground/[0.04] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.08]"
            >
              Start with buttons
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
          <div className="bg-background p-4">
            <p className="text-2xl font-semibold text-foreground">{buttons.length}</p>
            <p className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">buttons</p>
          </div>
          <div className="bg-background p-4">
            <p className="text-2xl font-semibold text-foreground">{backgrounds.length}</p>
            <p className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">patterns</p>
          </div>
          <div className="bg-background p-4">
            <p className="text-2xl font-semibold text-foreground">{loaders.length}</p>
            <p className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">loaders</p>
          </div>
          <div className="bg-background p-4">
            <p className="text-2xl font-semibold text-foreground">{navbars.length}</p>
            <p className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">navbars</p>
          </div>
        </div>
      </div>
    </section>
  );
}
