import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  latestNews,
  formatNewsDate,
  newsTypeLabel,
  type NewsItem,
} from "@/content/news";
import EmailButton from "@/components/EmailButton";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const isZh = locale === "zh";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-start gap-12">
        {/* Text */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-base text-text-secondary mb-2">{t("greeting")}</p>
            {/* Name: EN uses Cormorant Garamond, CN uses ShiMenSong */}
            {isZh ? (
              <h1
                className="text-[2.75rem] md:text-[3.25rem] font-normal text-text-primary tracking-wide leading-tight"
                style={{ fontFamily: "'ShiMenSong', serif" }}
              >
                刘天成
              </h1>
            ) : (
              <h1
                className="text-[2.75rem] md:text-[3.25rem] font-semibold text-text-primary tracking-tight leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Tiancheng LIU
              </h1>
            )}
            <p className="mt-3 text-[1.25rem] text-accent font-medium tracking-wide">
              {t("tagline")}
            </p>
          </div>

          <p className="text-base text-text-secondary leading-relaxed">{t("bio")}</p>

          {/* Affiliations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-base text-text-primary font-medium">
                {t("currentRole")}
              </span>
              <span className="text-base text-text-secondary">
                {t("currentAffiliation")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span className="text-base text-text-primary font-medium">
                {t("visitingRole")}
              </span>
              <span className="text-base text-text-secondary">
                {t("visitingAffiliation")}
              </span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <EmailButton label="Email" email="tcliu767@connect.hkust-gz.edu.cn" />
            <EmailButton label="Gmail" email="tianchengliu0108@gmail.com" />
            <a
              href="https://scholar.google.com/citations?hl=en&user=lE2gOJsAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base px-3 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
            >
              Google Scholar
            </a>
            <a
              href="https://github.com/tianchengliu18/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base px-3 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="shrink-0">
          <div className="relative w-48 h-56 md:w-56 md:h-64 rounded-lg overflow-hidden border border-border-light bg-bg-secondary">
            <Image
              src="/images/photo.PNG"
              alt={isZh ? "刘天成" : "Tiancheng LIU"}
              fill
              sizes="(min-width: 768px) 224px, 192px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Latest news */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[1.25rem] font-semibold text-text-primary">
            {t("latest")}
          </h2>
          <Link
            href="/news"
            className="text-base text-text-tertiary hover:text-accent transition-colors"
          >
            {t("viewAll")} &rarr;
          </Link>
        </div>

        <div className="space-y-4">
          {latestNews(3).map((item) => (
            <LatestCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LatestCard({ item, locale }: { item: NewsItem; locale: string }) {
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
    </article>
  );
}
