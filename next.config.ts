import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the tracing root to this project (the sandbox has a parent lockfile).
  outputFileTracingRoot: path.join(__dirname),
  // Local, pre-sized placeholder photography lives in /public.
  // Swap these for the client's real product/factory assets before launch.
  images: {
    unoptimized: true,
  },
  experimental: {
    // Keeps dev compilation focused on the routes being edited.
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react"],
  },
};

export default nextConfig;
