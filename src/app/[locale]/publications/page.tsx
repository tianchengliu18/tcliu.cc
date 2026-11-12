"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { publications } from "@/content/publications";
import PublicationItem from "@/components/PublicationItem";

const allTags = [
  "All",
  "calligraphy",
  "computational-aesthetics",
  "co-creation",
  "embodied-interaction",
  "cultural-heritage",
  "deep-learning",
  "financial-risk",
];

export default function PublicationsPage() {
  const t = useTranslations("publications");
  const [activeTag, setActiveTag] = useState("All");
  const [firstAuthorOnly, setFirstAuthorOnly] = useState(false);

  const filtered = publications.filter(
    (p) =>
      (activeTag === "All" || p.tags.includes(activeTag)) &&
      (!firstAuthorOnly || p.isFirstAuthor),
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-[2.5rem] font-semibold text-text-primary mb-8">
        {t("title")}
      </h1>

      {/* Filter tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={activeTag === tag}
            onClick={() => setActiveTag(tag)}
            className={`text-[13px] px-3 py-1.5 rounded-md border transition-colors ${
              activeTag === tag
                ? "bg-accent text-white border-accent"
                : "border-border text-text-secondary hover:border-text-tertiary"
            }`}
          >
            {tag === "All" ? t("allFilter") : tag}
          </button>
        ))}
      </div>

      {/* First-author filter */}
      <div className="flex items-center gap-4 mb-6 text-[13px] text-text-tertiary">
        <button
          type="button"
          aria-pressed={firstAuthorOnly}
          onClick={() => setFirstAuthorOnly((previous) => !previous)}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            firstAuthorOnly
              ? "bg-accent text-white border-accent"
              : "border-border text-text-secondary hover:border-accent hover:text-accent"
          }`}
        >
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full ${firstAuthorOnly ? "bg-white" : "bg-accent"}`}
          />
          {t("firstAuthor")}
        </button>
      </div>

      {/* Publications list */}
      <div>
        {filtered.length === 0 && (
          <p className="py-6 text-[13px] text-text-tertiary">
            {t("noResults")}
          </p>
        )}
        {filtered.map((pub) => (
          <PublicationItem key={pub.id} pub={pub} />
        ))}
      </div>
    </div>
  );
}
