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
  const pdfUrl = isZh ? "/cv-zh.pdf" : "/cv-en.pdf";

  const buttons: { href: string; label: string; primary: boolean; filename: string }[] = isZh
    ? [
        { href: "/cv-zh.pdf", label: "下载中文版 CV (PDF)", primary: true, filename: "Tiancheng-Liu-CV-zh.pdf" },
        { href: "/cv-en.pdf", label: "Download English CV (PDF)", primary: false, filename: "Tiancheng-Liu-CV-en.pdf" },
      ]
    : [
        { href: "/cv-en.pdf", label: "Download English CV (PDF)", primary: true, filename: "Tiancheng-Liu-CV-en.pdf" },
        { href: "/cv-zh.pdf", label: "下载中文版 CV (PDF)", primary: false, filename: "Tiancheng-Liu-CV-zh.pdf" },
      ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <h1 className="font-body text-[2.5rem] font-bold text-text-primary mb-3">
          {t("title")}
        </h1>
        <p className="text-text-secondary mb-6">{t("description")}</p>

        <div className="flex flex-wrap justify-center gap-3">
          {buttons.map((b) => (
            <a
              key={b.href}
              href={b.href}
              download={b.filename}
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

      <div className="overflow-hidden rounded-lg border border-border-light bg-bg-card shadow-sm">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=0`}
          title={isZh ? "中文版 CV 预览" : "English CV preview"}
          className="block w-full h-[75vh] min-h-[640px] bg-white"
        >
          <p>
            {isZh ? "浏览器无法显示 PDF。" : "Your browser cannot display this PDF."}{" "}
            <a href={pdfUrl}>{isZh ? "打开 CV" : "Open the CV"}</a>
          </p>
        </iframe>
      </div>
      <p className="mt-3 text-center text-[13px] text-text-tertiary">
        {isZh ? "如果预览未显示，" : "If the preview does not appear, "}
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          {isZh ? "在新窗口打开 PDF" : "open the PDF in a new tab"}
        </a>
        {isZh ? "。" : "."}
      </p>
    </div>
  );
}
