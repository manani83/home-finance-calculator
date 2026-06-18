"use client";

import Link from "next/link";
import { useState } from "react";

export const guideCategories = ["전체", "보증", "계약", "대출", "금리"] as const;

export type GuideCategory = (typeof guideCategories)[number];

export type GuideCardItem = {
  slug: string;
  title: string;
  description: string;
  category: Exclude<GuideCategory, "전체">;
  readingTime: string;
  updatedAt: string;
};

export function GuidesList({ guides }: { guides: GuideCardItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory>("전체");
  const filteredGuides = selectedCategory === "전체"
    ? guides
    : guides.filter((guide) => guide.category === selectedCategory);

  return (
    <>
      <nav className="guide-tabs" aria-label="가이드 카테고리">
        {guideCategories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>
      <div className="card-grid">
        {filteredGuides.map((guide) => (
          <article className="guide-card" key={guide.slug}>
            <div className="guide-card-meta">
              <span className="guide-category-badge">{guide.category}</span>
              <span>{guide.readingTime}</span>
            </div>
            <span className="guide-card-date">확인일 {guide.updatedAt}</span>
            <h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2>
            <p>{guide.description}</p>
            <Link className="text-link" href={`/guides/${guide.slug}`}>가이드 읽기 →</Link>
          </article>
        ))}
      </div>
    </>
  );
}
