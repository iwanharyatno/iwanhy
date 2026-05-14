import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
