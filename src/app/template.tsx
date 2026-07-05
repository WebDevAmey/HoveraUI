"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition boundary. template.tsx remounts on every navigation
 * (per node_modules/next/dist/docs — unlike layout, it gets a fresh key),
 * which is exactly the hook needed for an entrance sweep between routes.
 * Reduced motion renders instantly with no animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
