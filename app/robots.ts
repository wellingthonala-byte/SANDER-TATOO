import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

// Required so these routes can be emitted as files by `output: export`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
