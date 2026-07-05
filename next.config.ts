import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images: extend allowedDomains when integrating Supabase storage
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
