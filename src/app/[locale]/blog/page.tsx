import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogContent />;
}

function BlogContent() {
  const t = useTranslations("blog");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-body text-[2.5rem] font-bold text-text-primary mb-3">
        {t("title")}
      </h1>
      <p className="text-text-secondary mb-12">{t("subtitle")}</p>

      {/* Empty state */}
      <div className="text-center py-20">
        <p className="text-text-tertiary text-base">{t("noPostsYet")}</p>
      </div>
    </div>
  );
}
