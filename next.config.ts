import type { NextConfig } from "next";

// basePath is only needed on GitHub Pages (repo lives at /repo-name/).
// Locally (dev or build) we serve at root so routes work without a prefix.
const basePath =
  process.env.GITHUB_ACTIONS === "true"
    ? "/IFAIR-2026-WITH-VIETNAMESE-SAMSUNG-VERSION-"
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
