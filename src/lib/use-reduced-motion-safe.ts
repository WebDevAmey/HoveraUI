"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const emptySubscribe = () => () => {};

/** False during SSR and the hydration pass, true after. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Hydration-safe reduced-motion preference: always false until after
 * hydration so components that branch DOM structure on it render the same
 * tree the server did, then swap to the real preference. Use this instead of
 * framer-motion's useReducedMotion anywhere the branch changes markup or
 * `initial` structure, not just animation values.
 */
export function useReducedMotionSafe(): boolean {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  return hydrated ? Boolean(reduced) : false;
}
