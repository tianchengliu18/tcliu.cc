"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { publications } from "@/content/publications";
import PublicationItem from "@/components/PublicationItem";

const allTags = ["All", "calligraphy", "co-creation", "computational-aesthetics", "visualization", "other"];

export default function PublicationsPage() {
  const t = useTranslations("publications");
  const [activeTag, setActiveTag] = useState("All");

  const published = publications.filter((p) => p.status === "published");
  const underReview = publications.filter((p) => p.status === "under-review");

  const filterPubs = (pubs: typeof publications) =>
    activeTag === "All"
      ? pubs
      : pubs.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-body text-[2.5rem] font-bold text-text-primary mb-8">
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

      {/* Published */}
      <section className="mb-12">
        <h2 className="font-body text-[1.25rem] font-semibold text-text-primary mb-4">
          {t("published")}
        </h2>
        <div>
          {filterPubs(published).map((pub) => (
            <PublicationItem key={pub.id} pub={pub} />
          ))}
        </div>
      </section>

      {/* Under Review */}
      {filterPubs(underReview).length > 0 && (
        <section>
          <h2 className="font-body text-[1.25rem] font-semibold text-text-primary mb-4">
            {t("underReview")}
          </h2>
          <div className="opacity-75">
            {filterPubs(underReview).map((pub) => (
              <PublicationItem key={pub.id} pub={pub} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
