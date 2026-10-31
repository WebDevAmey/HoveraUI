import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/docs", destination: "/docs/introduction", permanent: false },
      { source: "/docs/:slug((?!introduction|installation|tokens|faq|changelog)[^/]+)", destination: "/components/:slug", permanent: true },
      { source: "/changelog", destination: "/docs/changelog", permanent: true },
    ];
  },
};

export default nextConfig;
