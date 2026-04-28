import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublicationBySlug } from "@/content/publications";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isZh = locale === "zh";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-[2.5rem] font-semibold text-text-primary mb-6">
        {isZh ? "研究" : "Research"}
      </h1>

      {/* Manifesto */}
      <section className="mb-16 max-w-2xl">
        {isZh ? (
          <p className="text-base text-text-secondary leading-relaxed">
            我研究机器如何参与有文化根基的创作实践。博士阶段以中国书法为主要对象。我提三个问题。机器能否量化作品的视觉特征？机器能否感知创作时身体的细微动作？机器能否成为创作的伙伴？有些项目我主导。有些来自合作，跨越音乐、无障碍设计与文化遗产。
          </p>
        ) : (
          <p className="text-base text-text-secondary leading-relaxed">
            I study how machines can take part in creative practice with cultural roots. My PhD uses Chinese calligraphy as its main subject. I ask three questions. Can a machine quantify the visual features of a work? Can it sense the small moves a body makes while writing? Can it join the work as a partner? Some projects I lead. Others I share with collaborators in music, accessibility, and cultural heritage.
          </p>
        )}
      </section>

      <Theme
        title={isZh ? "量化美学" : "Computing the Aesthetics"}
        question={
          isZh
            ? "机器能否量化一件作品的视觉特征？"
            : "Can a machine quantify the visual features of a work?"
        }
        body={
          isZh
            ? "书法承载视觉结构。笔画、章法、留白、平衡。这些特征可以被测量。我构建管线，提取这些特征，并将其与人对作品的反应关联。目标不是判断哪件作品更美。目标是让作品的结构对计算可读，并验证哪些结构维度真正影响人的感知。"
            : "A work holds visual structure. Strokes, layout, white space, balance. These features can be measured. I build pipelines that extract them and link them to the way people read the work. The goal is not to decide what is beautiful. The goal is to make the structure of a work legible to computation, and to test which parts of that structure track human response."
        }
        slugs={["kai-shu-aesthetics", "calligraphy-layout-llm", "seal-carving"]}
        isZh={isZh}
      />

      <Theme
        title={isZh ? "感知过程" : "Sensing the Process"}
        question={
          isZh
            ? "机器能否感知一个身体在书写时的细微动作？"
            : "Can a machine sense the small moves a body makes while writing?"
        }
        body={
          isZh
            ? "塑造一根线条的大部分东西从未抵达成品。笔的轻重、起笔前的停顿、手腕的转折。我构建工具，让这些动作可见，并将其反馈给书写者。工具不教学。工具不评分。它只让书写者看见原本就存在的东西。"
            : "Most of what shapes a calligraphic line never reaches the finished page. The press of the brush. The pause before a stroke. The shift in the wrist. I build tools that notice these moves and reflect them back. The tools do not teach. They do not grade. They show the practitioner what was there."
        }
        slugs={["brushu", "archiving-body-movements"]}
        isZh={isZh}
      />

      <Theme
        title={isZh ? "加入实践" : "Joining the Practice"}
        question={
          isZh
            ? "机器能否作为伙伴而非工具加入创作？"
            : "Can a machine join a creative practice as a partner rather than a tool?"
        }
        body={
          isZh
            ? "创作实践承载身份。它承载性别、能力、文化记忆、个人历史。AI 可以扁平化这些东西，也可以尊重它们。我与音乐、表演、无障碍领域的合作者一起，设计让机器站在创作者旁边的系统。创作者仍是作者。"
            : "A creative practice carries identity. It carries gender, ability, cultural memory, and personal history. AI can flatten these things or honor them. I work with collaborators in music, performance, and accessibility to design systems where the machine takes a position alongside the maker. The maker stays the author."
        }
        slugs={["poemotion", "to-perform-to-live", "finhertip"]}
        isZh={isZh}
      />

      {/* Adjacent */}
      <Theme
        title={isZh ? "邻近工作" : "Adjacent Work"}
        body={
          isZh
            ? "我也参与计算文化遗产的应用研究。与香港科技大学（广州）的同事一起，我协助构建了一个深度学习系统，从扫描页识别中文古籍善本的版本、年代与产地。同一双观察视觉结构的眼睛，从书法延伸到其他文化遗产。"
            : "I also contribute to applied work in computational cultural heritage. With colleagues at HKUST Guangzhou, I helped build a deep learning system that identifies the edition, period, and region of premodern Chinese rare books from scanned pages. The same eye for visual structure that serves calligraphy serves other heritage materials."
        }
        slugs={["rare-books-edition"]}
        isZh={isZh}
      />

      {/* Earlier */}
      <Theme
        title={isZh ? "早期工作" : "Earlier Work"}
        body={
          isZh
            ? "博士之前，我学的是金融与工程。我的第一篇论文用非对称指数幂分布建模中国金融体系的系统性风险。那是另一个学生的工作。把它留在这里，是因为路径本身有意义。"
            : "Before my PhD I trained in finance and engineering. My first paper modeled systemic risk in the Chinese financial system. It is the work of a different student. I leave it on the page because the path matters."
        }
        slugs={["icdsba-financial-risk"]}
        isZh={isZh}
      />
    </div>
  );
}

interface ThemeProps {
  title: string;
  question?: string;
  body: string;
  slugs: string[];
  isZh: boolean;
}

function Theme({ title, question, body, slugs }: ThemeProps) {
  return (
    <section className="mb-16">
      <h2 className="text-[1.5rem] font-semibold text-text-primary mb-3">
        {title}
      </h2>
      {question && (
        <p className="text-base text-accent italic mb-3 max-w-2xl">{question}</p>
      )}
      <p className="text-base text-text-secondary leading-relaxed mb-6 max-w-2xl">
        {body}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slugs.map((slug) => (
          <PubChip key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}

function PubChip({ slug }: { slug: string }) {
  const pub = getPublicationBySlug(slug);
  if (!pub) return null;

  return (
    <Link
      href={`/publications/${slug}`}
      className="group flex items-start gap-3 p-3 border border-border-light rounded-lg bg-bg-card hover:border-accent transition-colors"
    >
      <div className="relative w-20 h-16 shrink-0 rounded overflow-hidden bg-bg-secondary border border-border-light">
        {pub.teaser ? (
          <Image
            src={pub.teaser}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-tertiary text-[10px]">
            No teaser
          </div>
        )}
        <span className="absolute top-0.5 left-0.5 px-1 py-0 rounded bg-accent/90 text-white text-[8px] font-semibold tracking-wide uppercase leading-tight">
          {pub.venueShort}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[13px] font-medium text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-3">
          {pub.title}
        </h4>
      </div>
    </Link>
  );
}
