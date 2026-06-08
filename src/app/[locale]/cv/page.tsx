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
  return <CVContent isZh={locale === "zh"} />;
}

function CVContent({ isZh }: { isZh: boolean }) {
  const t = useTranslations("cv");

  const buttons: { href: string; label: string; primary: boolean }[] = isZh
    ? [
        { href: "/cv-zh.pdf", label: "下载中文版 CV (PDF)", primary: true },
        { href: "/cv-en.pdf", label: "Download English CV (PDF)", primary: false },
      ]
    : [
        { href: "/cv-en.pdf", label: "Download English CV (PDF)", primary: true },
        { href: "/cv-zh.pdf", label: "下载中文版 CV (PDF)", primary: false },
      ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="max-w-lg mx-auto text-center py-20">
        <h1 className="font-body text-[2.5rem] font-bold text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-text-secondary mb-8">{t("description")}</p>

        <div className="flex flex-col items-center gap-3">
          {buttons.map((b) => (
            <a
              key={b.href}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                b.primary
                  ? "inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors font-medium text-base"
                  : "inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md text-text-secondary hover:text-text-primary hover:border-text-tertiary transition-colors text-base"
              }
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
              {b.label}
            </a>
          ))}
        </div>

        <p className="text-[13px] text-text-tertiary mt-4">{t("lastUpdated")}</p>
      </div>
    </div>
  );
}
