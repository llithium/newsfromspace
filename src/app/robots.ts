import type { MetadataRoute } from "next";
import { siteURL } from "@/lib/variables";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteURL}/sitemap.xml`,
    host: siteURL,
  };
}
