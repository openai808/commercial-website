import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/insights/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/insights",
        permanent: true,
      },
      // Canonicalize the apex domain to www — Google Search Console was
      // auto-selecting the apex as canonical (no user-declared canonical
      // existed), splitting index signals across two hostnames for the
      // same content. `value` is anchored so it only matches the bare
      // apex, not `www.remaxcommercial.com.ph` itself (which would loop).
      {
        source: "/:path*",
        has: [{ type: "host", value: "^remaxcommercial\\.com\\.ph$" }],
        destination: "https://www.remaxcommercial.com.ph/:path*",
        permanent: true,
      },
    ];
  },
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
