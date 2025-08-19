import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
    {
      hostname:"a0.muscache.com",
      protocol: "https",
      port: "",
    },
    {
      hostname: "ofjavttrcpwmjzuefaap.supabase.co",
      protocol: "https",
      port: "",
    },
    { protocol: "https", hostname: "images.unsplash.com" },
  ],
 },
};

export default nextConfig;
