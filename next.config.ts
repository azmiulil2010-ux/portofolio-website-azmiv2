import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
