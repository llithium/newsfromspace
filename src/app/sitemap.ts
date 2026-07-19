import type { MetadataRoute } from "next";
import { siteURL } from "@/lib/variables";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/articles",
    "/blogs",
    "/launches",
    "/launches/past",
    "/mission-control",
  ];

  return routes.map((route) => ({
    url: `${siteURL}${route}`,
    changeFrequency: route === "" ? "hourly" : "daily",
    priority: route === "" ? 1 : 0.8,
  }));
}
