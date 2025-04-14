import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "8bga72dygwns5fhw.public.blob.vercel-storage.com",
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    }
  },
};

export default nextConfig;
