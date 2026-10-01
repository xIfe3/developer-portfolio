import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a verification build run beside `next dev` without clobbering .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    // Keep old résumé links (shared before the rename) working.
    return [{ source: "/IFEANYI%20ONYEKWELU.pdf", destination: "/ifeanyi-onyekwelu-resume.pdf", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
