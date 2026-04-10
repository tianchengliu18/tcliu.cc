import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import ProjectCard from "@/components/ProjectCard";
import {
  aestheticsProjects,
  embodiedProjects,
  performanceProjects,
} from "@/content/research/projects";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ResearchContent locale={locale} />;
}

function ResearchContent({ locale }: { locale: string }) {
  const t = useTranslations("research");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-[2.5rem] font-semibold text-text-primary mb-3">
        {t("title")}
      </h1>
      <p className="text-base text-text-secondary leading-relaxed mb-16 max-w-2xl">
        {t("subtitle")}
      </p>

      {/* Theme 1: Computational Calligraphy Aesthetics */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-0.5 bg-accent" />
          <h2 className="text-[1.25rem] font-semibold text-text-primary">
            {t("aesthetics.title")}
          </h2>
        </div>
        <p className="text-base text-text-secondary leading-relaxed mb-6 ml-6">
          {t("aesthetics.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
          {aestheticsProjects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* Theme 2: Embodied Calligraphy & Reflective Practice */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-0.5 bg-accent" />
          <h2 className="text-[1.25rem] font-semibold text-text-primary">
            {t("embodied.title")}
          </h2>
        </div>
        <p className="text-base text-text-secondary leading-relaxed mb-6 ml-6">
          {t("embodied.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
          {embodiedProjects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* Theme 3: Human-AI Co-Creative Performance */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-0.5 bg-accent" />
          <h2 className="text-[1.25rem] font-semibold text-text-primary">
            {t("performance.title")}
          </h2>
        </div>
        <p className="text-base text-text-secondary leading-relaxed mb-6 ml-6">
          {t("performance.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
          {performanceProjects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
