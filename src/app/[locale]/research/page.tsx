import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import ProjectCard from "@/components/ProjectCard";
import {
  calligraphyProjects,
  cocreationProjects,
  visualizationProjects,
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
      <h1 className="font-body text-[2.5rem] font-bold text-text-primary mb-3">
        {t("title")}
      </h1>
      <p className="text-text-secondary leading-relaxed mb-16 max-w-2xl">
        {t("subtitle")}
      </p>

      {/* Computational Calligraphy */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-0.5 bg-accent" />
          <h2 className="font-body text-[1.25rem] font-semibold text-text-primary">
            {t("calligraphy.title")}
          </h2>
        </div>
        <p className="text-base text-text-secondary leading-relaxed mb-6 ml-6">
          {t("calligraphy.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
          {calligraphyProjects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* Human-AI Co-Creativity */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-0.5 bg-accent" />
          <h2 className="font-body text-[1.25rem] font-semibold text-text-primary">
            {t("cocreation.title")}
          </h2>
        </div>
        <p className="text-base text-text-secondary leading-relaxed mb-6 ml-6">
          {t("cocreation.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
          {cocreationProjects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* Visualization & Authoring */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-0.5 bg-accent" />
          <h2 className="font-body text-[1.25rem] font-semibold text-text-primary">
            {t("visualization.title")}
          </h2>
        </div>
        <p className="text-base text-text-secondary leading-relaxed mb-6 ml-6">
          {t("visualization.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
          {visualizationProjects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
