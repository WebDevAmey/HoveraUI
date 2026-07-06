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
        // Legacy background-only detail route, same component now lives on
        // the component template under the same slug.
        source: "/patterns/:slug",
        destination: "/components/:slug",
        permanent: true,
      },
      // Component pages moved /docs/<slug> -> /components/<slug> in the
      // monochrome restructure; /docs/* now hosts guide pages, so each
      // surviving component slug redirects explicitly.
      {
        source: "/docs/3d-button",
        destination: "/components/3d-button",
        permanent: true,
      },
      {
        source: "/docs/animated-tabs",
        destination: "/components/animated-tabs",
        permanent: true,
      },
      {
        source: "/docs/aurora-flow",
        destination: "/components/aurora-flow",
        permanent: true,
      },
      {
        source: "/docs/beams",
        destination: "/components/beams",
        permanent: true,
      },
      {
        source: "/docs/bento-grid",
        destination: "/components/bento-grid",
        permanent: true,
      },
      {
        source: "/docs/border-beam",
        destination: "/components/border-beam",
        permanent: true,
      },
      {
        source: "/docs/chamber-door-button",
        destination: "/components/chamber-door-button",
        permanent: true,
      },
      {
        source: "/docs/command-menu",
        destination: "/components/command-menu",
        permanent: true,
      },
      {
        source: "/docs/compass-lock-button",
        destination: "/components/compass-lock-button",
        permanent: true,
      },
      {
        source: "/docs/displacement-text",
        destination: "/components/displacement-text",
        permanent: true,
      },
      {
        source: "/docs/eclipse-button",
        destination: "/components/eclipse-button",
        permanent: true,
      },
      {
        source: "/docs/floating-navbar",
        destination: "/components/floating-navbar",
        permanent: true,
      },
      {
        source: "/docs/light-lines",
        destination: "/components/light-lines",
        permanent: true,
      },
      {
        source: "/docs/liquid-fill-button",
        destination: "/components/liquid-fill-button",
        permanent: true,
      },
      {
        source: "/docs/liquid-text",
        destination: "/components/liquid-text",
        permanent: true,
      },
      {
        source: "/docs/magnetic-button",
        destination: "/components/magnetic-button",
        permanent: true,
      },
      {
        source: "/docs/mercury-loader",
        destination: "/components/mercury-loader",
        permanent: true,
      },
      {
        source: "/docs/meteors",
        destination: "/components/meteors",
        permanent: true,
      },
      {
        source: "/docs/morse-signal-button",
        destination: "/components/morse-signal-button",
        permanent: true,
      },
      {
        source: "/docs/neumorphic-button",
        destination: "/components/neumorphic-button",
        permanent: true,
      },
      {
        source: "/docs/particle-field",
        destination: "/components/particle-field",
        permanent: true,
      },
      {
        source: "/docs/pixel-trail",
        destination: "/components/pixel-trail",
        permanent: true,
      },
      {
        source: "/docs/pulse-seismograph-button",
        destination: "/components/pulse-seismograph-button",
        permanent: true,
      },
      {
        source: "/docs/radial-bloom-button",
        destination: "/components/radial-bloom-button",
        permanent: true,
      },
      {
        source: "/docs/ripple-button",
        destination: "/components/ripple-button",
        permanent: true,
      },
      {
        source: "/docs/scan-ring-button",
        destination: "/components/scan-ring-button",
        permanent: true,
      },
      {
        source: "/docs/shredder-button",
        destination: "/components/shredder-button",
        permanent: true,
      },
      {
        source: "/docs/sonar-arc",
        destination: "/components/sonar-arc",
        permanent: true,
      },
      {
        source: "/docs/split-curtain-button",
        destination: "/components/split-curtain-button",
        permanent: true,
      },
      {
        source: "/docs/spotlight",
        destination: "/components/spotlight",
        permanent: true,
      },
      {
        source: "/docs/spotlight-card",
        destination: "/components/spotlight-card",
        permanent: true,
      },
      {
        source: "/docs/tally-strike-button",
        destination: "/components/tally-strike-button",
        permanent: true,
      },
      {
        source: "/docs/text-reveal",
        destination: "/components/text-reveal",
        permanent: true,
      },
      {
        source: "/docs/tilt-card",
        destination: "/components/tilt-card",
        permanent: true,
      },
      {
        source: "/docs/typewriter",
        destination: "/components/typewriter",
        permanent: true,
      },
      {
        source: "/docs/x-ray-scanner-button",
        destination: "/components/x-ray-scanner-button",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
