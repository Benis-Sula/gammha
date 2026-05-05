import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
