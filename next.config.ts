import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/IFAIR-2026-WITH-VIETNAMESE-SAMSUNG-VERSION-",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
