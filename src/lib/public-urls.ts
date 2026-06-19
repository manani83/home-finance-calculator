import { getGuides } from "./content";
import { absoluteUrl } from "./site-config";

const staticPaths = [
  "",
  "/calculators/jeonse-increase",
  "/calculators/jeonse-to-monthly",
  "/calculators/loan-limit",
  "/calculators/loan-interest",
  "/calculators/loan-increase",
  "/guides",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

const staticUpdatedAt = new Date("2026-06-15T00:00:00+09:00");

export function getPublicUrlEntries() {
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path || "/"), lastModified: staticUpdatedAt })),
    ...getGuides().map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: new Date(`${guide.updatedAt}T00:00:00+09:00`),
    })),
  ];
}

export function getPublicUrls() {
  return getPublicUrlEntries().map(({ url }) => url);
}
