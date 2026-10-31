import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/components", destination: "/docs#components", permanent: true },
      { source: "/components/:slug", destination: "/docs/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
