import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["d3t251u9x9cmf6.cloudfront.net"],
  },
};

export default nextConfig;
