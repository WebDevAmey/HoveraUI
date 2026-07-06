/**
 * Route transition boundary. template.tsx remounts on every navigation
 * (per node_modules/next/dist/docs — unlike layout, it gets a fresh key), so
 * the CSS entrance replays on each route change. CSS-driven so server and
 * client render identical markup, and the global prefers-reduced-motion
 * kill-switch makes it instant.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ animation: "fadeUp 0.45s var(--ease-flow) both" }}>{children}</div>
  );
}
