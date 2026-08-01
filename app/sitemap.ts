import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

// Required so these routes can be emitted as files by `output: export`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
