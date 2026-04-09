import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  const education = [
    { period: "2026", place: "University of Amsterdam", role: "Visiting Researcher" },
    { period: "2022 \u2013 Present", place: "HKUST (Guangzhou)", role: "Ph.D. in CMA" },
    { period: "2018 \u2013 2020", place: "Waseda University", role: "M.Eng" },
    { period: "2014 \u2013 2018", place: "South China Univ. of Tech.", role: "B.Eng + B.Econ" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-body text-[2.5rem] font-bold text-text-primary mb-12">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main story */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="font-body text-[1.25rem] font-semibold text-text-primary mb-4">
              {t("storyTitle")}
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
              <p>{t("story3")}</p>
            </div>
          </section>

          <section>
            <h2 className="font-body text-[1.25rem] font-semibold text-text-primary mb-4">
              {t("beyondTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">{t("beyond")}</p>

            {/* Life photo placeholders */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-bg-secondary border border-border-light flex items-center justify-center"
                >
                  <span className="text-text-tertiary text-[13px]">Photo {i}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-body text-[1.25rem] font-semibold text-text-primary mb-4">
              {t("connectTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t("connect")}
            </p>
            <a
              href="mailto:tcliu767@connect.hkust-gz.edu.cn"
              className="inline-block text-base px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
            >
              tcliu767@connect.hkust-gz.edu.cn
            </a>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Photo */}
          <div className="w-full aspect-square rounded-lg bg-bg-secondary border border-border-light flex items-center justify-center">
            <span className="text-text-tertiary text-base">Photo</span>
          </div>

          {/* Education timeline */}
          <div>
            <h3 className="text-[13px] font-medium text-text-tertiary uppercase tracking-wider mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.place}
                  className="relative pl-4 border-l-2 border-border-light"
                >
                  <span className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent" />
                  <p className="text-[13px] text-text-tertiary">{edu.period}</p>
                  <p className="text-base font-medium text-text-primary">
                    {edu.place}
                  </p>
                  <p className="text-[13px] text-text-secondary">{edu.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-[13px] font-medium text-text-tertiary uppercase tracking-wider mb-3">
              {t("languagesTitle")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(
                ["mandarin", "english", "cantonese", "japanese"] as const
              ).map((lang) => (
                <span
                  key={lang}
                  className="text-[13px] px-2.5 py-1 bg-bg-secondary rounded-md text-text-secondary"
                >
                  {t(`languages.${lang}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
