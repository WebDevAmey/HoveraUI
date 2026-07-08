"use client";

import { useReducedMotion } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Docs", href: "#" },
];

export default function FloatingNavbarDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex w-full flex-col items-center gap-3 py-2">
      <nav className="relative mx-auto flex w-max items-center gap-1 rounded-full border border-white/10 bg-neutral-900/80 px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-full px-3 py-1 text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#"
          className="ml-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-neutral-950 transition-transform duration-200 hover:scale-105 motion-reduce:transition-none"
        >
          Get started
        </a>
      </nav>
      <p className="text-xs text-neutral-500">
        Fixed to the top in a real page — hides on scroll down, returns on scroll up.
      </p>
    </div>
  );
}
