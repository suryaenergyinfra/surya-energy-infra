import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/calculator",
    "/packages",
    "/subsidy-finance",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-03-01T00:00:00.000Z"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
