import type { NextConfig } from "next";

/**
 * Two build targets:
 *
 * - default (Vercel, `next start`, `next dev`): server runtime, on-demand image
 *   optimization and custom headers.
 * - STATIC_EXPORT=true (GitHub Pages): a plain folder of files. Pages has no
 *   Node runtime, so the image optimizer and the headers API are unavailable —
 *   the images are already compressed WebP, so shipping them as-is is fine.
 *
 * The page itself is identical in both: every route is statically prerendered.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

/** e.g. "/SANDER-TATOO" when served from a GitHub project page. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const baseConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

const nextConfig: NextConfig = isStaticExport
  ? {
      ...baseConfig,
      output: "export",
      basePath,
      assetPrefix: basePath || undefined,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      ...baseConfig,
      images: {
        // Sources are already WebP: asking for AVIF on top only adds encode
        // latency on the first request for a marginal byte win.
        formats: ["image/webp"],
        minimumCacheTTL: 31536000,
        deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
        imageSizes: [64, 96, 128, 256, 384],
      },
      async headers() {
        return [
          {
            source: "/:path*",
            headers: [
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            ],
          },
          {
            source: "/images/:path*",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ],
          },
        ];
      },
    };

export default nextConfig;
