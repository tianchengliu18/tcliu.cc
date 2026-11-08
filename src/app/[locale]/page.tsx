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
import HomeExperience from "@/components/HomeExperience";
import { publications } from "@/content/publications";
import PublicationItem from "@/components/PublicationItem";
import { artworks } from "@/content/artworks";
import EmailButton from "@/components/EmailButton";
import { HomeSubscribeModal, SubscribeCard } from "@/components/Subscribe";

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
  const subscribeAction = process.env.NEWSLETTER_FORM_ACTION;

  return (
    <HomeExperience isZh={isZh}>
      {subscribeAction && <HomeSubscribeModal action={subscribeAction} />}
      <div className="home-story max-w-4xl mx-auto px-6 py-16 md:py-24">
        <section id="intro" aria-label={isZh ? "介绍" : "Introduction"} className="story-section">
        <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Text */}
        <div className="flex-1 space-y-6">
          <div>
            <p data-build="write" className="text-base text-text-secondary mb-2">{t("greeting")}</p>
            {/* Name: EN uses Cormorant Garamond, CN uses ShiMenSong */}
            {isZh ? (
              <h1 data-build="write"
                className="text-[2.75rem] md:text-[3.25rem] font-normal text-text-primary tracking-wide leading-tight"
                style={{ fontFamily: "'ShiMenSong', serif" }}
              >
                刘天成
              </h1>
            ) : (
              <h1 data-build="write"
                className="text-[2.75rem] md:text-[3.25rem] font-semibold text-text-primary tracking-tight leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Tiancheng LIU
              </h1>
            )}
            <ul data-build="write" className="mt-3 space-y-1 text-[1.25rem] text-accent font-medium tracking-wide list-disc list-inside marker:text-accent/60">
              <li>{isZh ? "计算艺术与文化" : "Computational Arts and Culture"}</li>
              <li>{isZh ? "具身交互" : "Embodied Interaction"}</li>
              <li>{isZh ? "创意 AI" : "Creative AI"}</li>
            </ul>
          </div>

          <p data-build="write" className="text-base text-text-primary font-medium leading-relaxed text-balance">
            {t("roleLine")}
          </p>

          <p data-build="write" className="text-base text-text-secondary leading-relaxed">
            {t("bio")}
          </p>

          {/* Social links */}
          <div data-build="place" className="flex flex-wrap gap-3 pt-2">
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
          <div data-build="place" className="relative w-48 h-56 md:w-56 md:h-64 rounded-lg overflow-hidden border border-border-light bg-bg-secondary">
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

        </section>

        <AvatarBreak image="04-explain" caption={isZh ? "从书法出发，探索计算与创作。" : "Starting with calligraphy, exploring computation and creation."} />

        <section id="research" className="story-section" aria-labelledby="research-title">
          <SectionHeading id="research-title" title={isZh ? "研究" : "Research"} href="/research" link={isZh ? "了解研究" : "Explore research"} />
          <p data-build="write" className="story-lead">{isZh ? "我探索机器如何理解并参与有深厚文化根基的创作实践，以中国书法为主要研究对象。" : "I explore how machines can understand and participate in culturally grounded creative practices, with Chinese calligraphy as my primary focus."}</p>
          <div className="research-thread">
            {(["aesthetics", "embodied", "performance"] as const).map(key => <ResearchThread key={key} theme={key} />)}
          </div>
        </section>

        <section id="publications" className="story-section" aria-labelledby="publications-title">
          <SectionHeading id="publications-title" title={isZh ? "代表论文" : "Selected publications"} href="/publications" link={isZh ? "全部论文" : "All publications"} />
          {publications.filter(pub => ["brushu", "narrastone", "kai-shu-aesthetics"].includes(pub.slug)).map(pub => (
            <div key={pub.id} data-build="draw" data-build-group="publication"><PublicationItem pub={pub} /></div>
          ))}
        </section>

        <AvatarBreak image="05-confident" caption={isZh ? "研究也在展览与表演中展开。" : "Research also takes shape in exhibitions and performance."} />

        <section id="artwork" className="story-section" aria-labelledby="artwork-title">
          <SectionHeading id="artwork-title" title={isZh ? "艺术实践" : "Artistic practice"} href="/artwork" link={isZh ? "全部作品" : "All artworks"} />
          {artworks.filter(work => ["brushu", "poemotion"].includes(work.id)).map(work => (
            <article key={work.id} className="story-artwork">
              {work.image && <div data-build="place" className="story-artwork-image"><Image src={work.image} alt={work.title} width={1200} height={800} sizes="(min-width: 1100px) 800px, 100vw" className="w-full h-auto" /></div>}
              <h3 data-build="write">{work.title}</h3>
              <p data-build="write" className="text-text-secondary">{isZh ? work.statementZh : work.statementEn}</p>
              <p data-build="write" className="story-caption">{work.exhibitions[0]}</p>
            </article>
          ))}
        </section>

        <section id="news" className="story-section" aria-labelledby="news-title">
          {subscribeAction && <SubscribeCard action={subscribeAction} />}
          <SectionHeading id="news-title" title={t("latest")} href="/news" link={t("viewAll")} />
          <div className="space-y-4">{latestNews(3).map(item => <div key={item.id} data-build="draw" data-build-group="news"><LatestCard item={item} locale={locale} /></div>)}</div>
        </section>

        <AvatarBreak image="06-job-market" caption={isZh ? "关于研究之外的我，以及下一段旅程。" : "A little beyond research, and the next chapter."} />

        <section id="about" className="story-section" aria-labelledby="about-title">
          <SectionHeading id="about-title" title={isZh ? "关于我" : "Beyond research"} href="/about" link={isZh ? "更多关于我" : "More about me"} />
          <AboutExcerpt />
          <Link data-build="write" href="/cv" className="story-link">{isZh ? "查看简历" : "Read my CV"}</Link>
        </section>

        <section id="contact" className="story-section story-contact" aria-labelledby="contact-title">
          <h2 data-build="write" id="contact-title">{isZh ? "保持联系" : "Get in touch"}</h2>
          <p data-build="write" className="story-lead">{isZh ? "欢迎交流研究、艺术实践与合作想法。" : "I’m always open to conversations about research, artistic practice, and collaboration."}</p>
          <div data-build="place"><EmailButton label={isZh ? "给我写信" : "Write to me"} email="tcliu767@connect.hkust-gz.edu.cn" /></div>
        </section>
      </div>
    </HomeExperience>
  );
}

function SectionHeading({ id, title, href, link }: { id: string; title: string; href: string; link: string }) {
  return <div className="story-heading"><h2 data-build="write" id={id}>{title}</h2><Link data-build="write" href={href} className="story-link">{link}</Link></div>;
}

function ResearchThread({ theme }: { theme: "aesthetics" | "embodied" | "performance" }) {
  const t = useTranslations("research");
  return <article className="research-thread-item"><h3 data-build="write">{t(`${theme}.title`)}</h3><p data-build="write">{t(`${theme}.description`)}</p></article>;
}

function AboutExcerpt() {
  const t = useTranslations("about");
  return <p data-build="write" className="story-lead">{t("beyond")}</p>;
}

function AvatarBreak({ image, caption }: { image: string; caption: string }) {
  return <div className="avatar-break"><span data-build="draw" className="avatar-rule" /><figure><Image data-build="place" src={`/avatar/tiancheng/${image}.png`} alt="" width={100} height={240} sizes="100px" className="avatar-guide" /><figcaption data-build="write">{caption}</figcaption></figure><span data-build="draw" className="avatar-rule" /></div>;
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
