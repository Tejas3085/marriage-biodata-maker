import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    // Templates / photos are content-hashed by Next; long browser cache is safe.
    minimumCacheTTL: 31536000,
  },

  // Compression
  compress: true,

  // Security headers
  async headers() {
    const immutable = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];
    return [
      // Template / gallery / deity artwork changes rarely — cache hard at
      // the edge + browser so repeat visits are instant under traffic.
      { source: "/templates/:path*", headers: immutable },
      { source: "/Images/:path*", headers: immutable },
      { source: "/gods/:path*", headers: immutable },
      { source: "/icon/:path*", headers: immutable },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Performance optimizations
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["react-icons", "lucide-react"],
  },
};

export default nextConfig;

