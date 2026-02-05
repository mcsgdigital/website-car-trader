import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  images: {
    unoptimized: true, // Required for static export if using the Next.js Image component
  },
  basePath: "/website-car-trader", // Set the base path for GitHub Pages
  assetPrefix: "/website-car-trader/", // Set the asset prefix for GitHub Pages
};

export default nextConfig;