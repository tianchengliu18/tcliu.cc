import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  sortedNews,
  formatNewsDate,
  newsTypeLabel,
  type NewsItem,
} from "@/content/news";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === "zh";
  const items = sortedNews();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-[2.5rem] font-semibold text-text-primary mb-3">
        {isZh ? "动态" : "News"}
      </h1>
      <p className="text-base text-text-secondary mb-12 max-w-2xl">
        {isZh
          ? "近期更新：论文、里程碑、参会与行旅。"
          : "Recent updates: papers, milestones, and travel."}
      </p>

      <div className="space-y-4">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function NewsCard({ item, locale }: { item: NewsItem; locale: string }) {
  const isZh = locale === "zh";
  const title = isZh ? item.titleZh : item.titleEn;
  const dateLabel = formatNewsDate(item, locale);
  const typeLabel = newsTypeLabel(item.type, locale);
  const accent =
    item.type === "paper"
      ? "bg-accent/10 text-accent"
      : "bg-accent-secondary/10 text-accent-secondary";

  return (
    <article className="p-5 border border-border-light rounded-lg bg-bg-card hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <span className={`text-[13px] px-2 py-0.5 rounded ${accent}`}>
          {typeLabel}
        </span>
        <span className="text-[13px] text-text-tertiary">{dateLabel}</span>
      </div>
      <p className="text-base text-text-primary leading-relaxed">{title}</p>
      {item.links && item.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {item.links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] px-2.5 py-0.5 border border-border rounded-full text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] px-2.5 py-0.5 border border-border rounded-full text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      )}
      {item.slug && (
        <div className="mt-3">
          <Link
            href={`/news/${item.slug}`}
            className="text-[13px] text-accent hover:underline"
          >
            {isZh ? "阅读全文 →" : "Read more →"}
          </Link>
        </div>
      )}
    </article>
  );
}
