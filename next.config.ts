import type { NextConfig } from "next";

// 'unsafe-inline' on script-src is required because Next.js injects inline
// hydration/RSC scripts on every page. The strict alternative is nonce-based
// CSP via proxy.ts, but that forces every page to render dynamically
// (Next.js docs: "Static vs Dynamic Rendering with CSP"), which would kill
// static generation for this site's pages. 'unsafe-inline' is Next's own
// documented fallback for sites that don't need that tradeoff.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Legacy component detail route, replaced by the shared docs template.
        // Permanent redirect so bookmarks/SEO carry over to the new canonical URL.
        source: "/components/:slug",
        destination: "/docs/:slug",
        permanent: true,
      },
      {
        // Legacy background-only detail route, same component now lives on
        // the shared docs template under the same slug.
        source: "/patterns/:slug",
        destination: "/docs/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
