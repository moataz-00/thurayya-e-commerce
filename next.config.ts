import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Frontend-only build: no backend and no remote images yet.
  // When the API lands, add `images.remotePatterns` and `env` here.
  // See docs/BACKEND-INTEGRATION.md.
};

export default nextConfig;
