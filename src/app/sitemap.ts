import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/content";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/calculators/jeonse-increase", "/calculators/loan-interest", "/calculators/loan-increase", "/guides", "/about", "/contact", "/privacy", "/terms"];
  const updatedAt = new Date("2026-06-11T00:00:00+09:00");
  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: updatedAt })),
    ...getGuides().map((guide) => ({ url: `${siteUrl}/guides/${guide.slug}`, lastModified: new Date(`${guide.updatedAt}T00:00:00+09:00`) })),
  ];
}
