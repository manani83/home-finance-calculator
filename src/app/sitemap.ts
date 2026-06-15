import type { MetadataRoute } from "next";
import { getPublicUrlEntries } from "@/lib/public-urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return getPublicUrlEntries();
}
