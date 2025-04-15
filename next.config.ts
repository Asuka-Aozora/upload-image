import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "8bga72dygwns5fhw.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
