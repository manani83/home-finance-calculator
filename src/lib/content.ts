import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { guideFrontmatterSchema, type GuideFrontmatter } from "./content-schema";

export type Guide = GuideFrontmatter & { body: string };

const guideDirectory = path.join(process.cwd(), "content/guides");

export function getGuides(): Guide[] {
  if (!fs.existsSync(guideDirectory)) return [];
  return fs.readdirSync(guideDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseGuide(path.join(guideDirectory, file)))
    .filter((guide) => guide.reviewStatus === "reviewed")
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getGuide(slug: string): Guide | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  return getGuides().find((guide) => guide.slug === slug) ?? null;
}

function parseGuide(filePath: string): Guide {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const metadata = guideFrontmatterSchema.parse(parsed.data);
  return { ...metadata, body: parsed.content.trim() };
}
