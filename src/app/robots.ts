import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/auth", "/login"],
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
