import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    }
  },
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
