import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        /* YouTube thumbnail CDN. The facility video section derives its
           poster from the video ID rather than keeping a separate image file
           in sync, so the request goes to YouTube rather than /public.
           Next blocks external image hosts by default. */
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;