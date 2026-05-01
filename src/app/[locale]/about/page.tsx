import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import MaintenancePage from "@/components/MaintenancePage";

// Maintenance mode hides the page in production while leaving it visible
// in `npm run dev`. Flip MAINTENANCE_IN_PROD to false to publish.
const MAINTENANCE_IN_PROD = false;
const MAINTENANCE =
  MAINTENANCE_IN_PROD && process.env.NODE_ENV === "production";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (MAINTENANCE) {
    return <MaintenancePage titleEn="About" titleZh="关于" isZh={locale === "zh"} />;
  }
  return <AboutContent locale={locale} />;
}

function AboutContent({ locale }: { locale: string }) {
  const t = useTranslations("about");
  const isZh = locale === "zh";

  const education = [
    { period: "2026", place: "University of Amsterdam", role: "Visiting Researcher" },
    { period: "2022 \u2013 Present", place: "HKUST (Guangzhou)", role: "Ph.D. in CMA" },
    { period: "2018 \u2013 2020", place: "Waseda University", role: "M.Eng" },
    { period: "2014 \u2013 2018", place: "South China Univ. of Tech.", role: "B.Econ in Finance" },
  ];

  const linkClass =
    "text-text-primary underline decoration-1 underline-offset-2 hover:text-accent transition-colors";

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
              {isZh ? (
                <>
                  <p>
                    我是刘天成，香港科技大学（广州）计算媒体与艺术在读博士，导师{" "}
                    <a href="http://www.art4.gift/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                      张康
                    </a>
                    ，副导师{" "}
                    <a href="https://cma.hkust-gz.edu.cn/faculty-regular/chen-liang/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                      梁宸
                    </a>
                    。目前在阿姆斯特丹大学 MultiX 实验室担任访问研究员，与{" "}
                    <a href="https://nanne.github.io/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Nanne van Noord
                    </a>{" "}
                    合作。
                  </p>
                  <p>
                    我走到这里走了一条长路。本科在华南理工大学学习金融，然后在早稻田大学完成工程硕士。东京那两年的真正意义在别处。大部分周末我泡在东京的现当代美术馆与画廊里，那里看到的作品重塑了我对计算可以做什么的理解。回国开始计算媒体与艺术博士时，我选择中国书法作为研究对象，因为那是我最熟悉、也最希望被机器认真对待的文化实践。
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I&apos;m Tiancheng LIU, a Ph.D. candidate in Computational Media and Arts at HKUST (Guangzhou), supervised by{" "}
                    <a href="http://www.art4.gift/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Kang Zhang
                    </a>{" "}
                    and co-supervised by{" "}
                    <a href="https://cma.hkust-gz.edu.cn/faculty-regular/chen-liang/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Chen Liang
                    </a>
                    . I&apos;m currently a visiting researcher at the University of Amsterdam&apos;s MultiX Lab, working with{" "}
                    <a href="https://nanne.github.io/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Nanne van Noord
                    </a>
                    .
                  </p>
                  <p>
                    I came here through a long route. Finance at South China University of Technology, then engineering at Waseda University in Tokyo. The Tokyo years mattered for a different reason. I spent most of my free time in the city&apos;s contemporary art museums and galleries, and the work I saw there reshaped what I thought computation could be for. When I returned to start a PhD in Computational Media and Arts, I chose Chinese calligraphy as my subject, because it was the cultural practice I knew best and most wanted machines to take seriously.
                  </p>
                </>
              )}
            </div>
          </section>

          <section>
            <h2 className="font-body text-[1.25rem] font-semibold text-text-primary mb-4">
              {t("beyondTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">{t("beyond")}</p>
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
