"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { publications } from "@/content/publications";
import PublicationItem from "@/components/PublicationItem";

const allTags = ["All", "calligraphy", "computational-aesthetics", "co-creation", "embodied-interaction", "cultural-heritage"];

export default function PublicationsPage() {
  const t = useTranslations("publications");
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? publications
      : publications.filter((p) => p.tags.includes(activeTag));

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

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 text-[13px] text-text-tertiary">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent" />
          {t("firstAuthor")}
        </div>
      </div>

      {/* Publications list */}
      <div>
        {filtered.map((pub) => (
          <PublicationItem key={pub.id} pub={pub} />
        ))}
      </div>
    </div>
  );
}
