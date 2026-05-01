import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import MaintenancePage from "@/components/MaintenancePage";

// Maintenance mode hides the page in production while leaving it visible
// in `npm run dev`. Flip MAINTENANCE_IN_PROD to false to publish.
const MAINTENANCE_IN_PROD = false;
const MAINTENANCE =
  MAINTENANCE_IN_PROD && process.env.NODE_ENV === "production";

export default async function CVPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (MAINTENANCE) {
    return <MaintenancePage titleEn="CV" titleZh="简历" isZh={locale === "zh"} />;
  }
  return <CVContent />;
}

function CVContent() {
  const t = useTranslations("cv");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="max-w-lg mx-auto text-center py-20">
        <h1 className="font-body text-[2.5rem] font-bold text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-text-secondary mb-8">{t("description")}</p>

        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors font-medium text-base"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t("download")}
        </a>

        <p className="text-[13px] text-text-tertiary mt-4">{t("lastUpdated")}</p>
      </div>
    </div>
  );
}
