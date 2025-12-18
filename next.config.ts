import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           // ← THIS CREATES THE out/ FOLDER
  trailingSlash: true,        // ← Makes URLs like /entertainment/ (good for cPanel)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
