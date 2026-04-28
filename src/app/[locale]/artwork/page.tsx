import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { artworks } from "@/content/artworks";
import type { Artwork } from "@/content/artworks";

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArtworkContent locale={locale} />;
}

function ArtworkContent({ locale }: { locale: string }) {
  const t = useTranslations("artwork");
  const isZh = locale === "zh";

  const leadWorks = artworks.filter((a) => a.role === "lead");
  const collabWorks = artworks.filter((a) => a.role === "collaborator");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-[2.5rem] font-semibold text-text-primary mb-3">
        {t("title")}
      </h1>
      <p className="text-base text-text-secondary leading-relaxed mb-16 max-w-2xl">
        {t("subtitle")}
      </p>

      {/* Lead Artist */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <h2 className="text-[1.25rem] font-semibold text-text-primary">
            {t("leadArtist")}
          </h2>
        </div>

        <div className="space-y-10">
          {leadWorks.map((work) => (
            <ArtworkCard key={work.id} work={work} isZh={isZh} />
          ))}
        </div>
      </section>

      {/* Collaborative Works */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-secondary" />
          <h2 className="text-[1.25rem] font-semibold text-text-primary">
            {t("collaborative")}
          </h2>
        </div>

        <div className="space-y-10">
          {collabWorks.map((work) => (
            <ArtworkCard key={work.id} work={work} isZh={isZh} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ArtworkCard({
  work,
  isZh,
}: {
  work: Artwork;
  isZh: boolean;
}) {
  const statement = isZh ? work.statementZh : work.statementEn;

  return (
    <div className="border border-border-light rounded-lg overflow-hidden bg-bg-card hover:shadow-md transition-shadow">
      {/* Image / documentation */}
      <div className="relative w-full aspect-[16/9] bg-bg-secondary flex items-center justify-center overflow-hidden">
        {work.image ? (
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="text-text-tertiary text-base">Documentation</span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-[1.25rem] font-semibold text-text-primary">
              {work.title}
            </h3>
          </div>
          <span
            className={`shrink-0 text-[13px] px-2.5 py-1 rounded-md border ${
              work.role === "lead"
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-text-tertiary"
            }`}
          >
            {work.role === "lead" ? "Lead Artist" : "Collaborator"}
          </span>
        </div>

        {/* Exhibition info */}
        <div className="mb-3 space-y-1">
          {work.exhibitions.map((ex, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[13px] text-accent mt-0.5">&#9654;</span>
              <p className="text-[13px] text-text-secondary">{ex}</p>
            </div>
          ))}
        </div>

        {/* Paper venue if exists */}
        {work.paperVenue && (
          <p className="text-[13px] text-accent-secondary font-medium mb-3">
            Paper: {work.paperVenue}
          </p>
        )}

        <p className="text-base text-text-secondary leading-relaxed mb-4">
          {statement}
        </p>

        {work.links.length > 0 && (
          <div className="flex gap-2">
            {work.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] px-2.5 py-1 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
