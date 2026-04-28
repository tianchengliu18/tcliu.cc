export type NewsType =
  | "paper"
  | "milestone"
  | "conference"
  | "news"
  | "talk"
  | "exhibition"
  | "award";

export interface NewsLink {
  label: string;
  href: string;
  /** Set true for external URLs; defaults to internal route. */
  external?: boolean;
}

export interface NewsItem {
  id: string;
  /** ISO date used for sorting. Always YYYY-MM-DD. */
  date: string;
  /**
   * Display precision. `day` shows the full date (e.g. "Apr 13, 2026").
   * `month` shows month and year only (e.g. "Apr 2026").
   */
  precision: "day" | "month";
  type: NewsType;
  titleEn: string;
  titleZh: string;
  links?: NewsLink[];
  /**
   * If set, the item has its own detail page at /news/<slug> rendered from
   * an MDX file under src/content/news-posts/<slug>.mdx. Optional; omit for
   * short notices.
   */
  slug?: string;
}

export const news: NewsItem[] = [
  {
    id: "siggraph-26-acceptance",
    date: "2026-04-23",
    precision: "day",
    type: "paper",
    titleEn:
      "Two papers accepted to SIGGRAPH 2026 Art Papers: BruSHŪ and To Perform / To Live.",
    titleZh:
      "两篇论文被 SIGGRAPH 2026 Art Papers 录用：BruSHŪ 与 To Perform / To Live。",
    links: [
      { label: "BruSHŪ", href: "/publications/brushu" },
      { label: "To Perform / To Live", href: "/publications/to-perform-to-live" },
    ],
  },
  {
    id: "uva-arrival",
    date: "2026-04-13",
    precision: "day",
    type: "news",
    titleEn:
      "Arrived at the University of Amsterdam as a visiting researcher at MultiX Lab.",
    titleZh: "抵达阿姆斯特丹大学，担任 MultiX 实验室访问研究员。",
  },
  {
    id: "phd-proposal-defense",
    date: "2026-03-16",
    precision: "day",
    type: "milestone",
    titleEn: "Passed my PhD final proposal defense.",
    titleZh: "通过博士最终开题答辩。",
  },
  {
    id: "siggraph-asia-2025",
    date: "2025-12-18",
    precision: "month",
    type: "conference",
    titleEn: "Attended SIGGRAPH Asia 2025 in Hong Kong.",
    titleZh: "参加 SIGGRAPH Asia 2025（香港）。",
  },
  {
    id: "acmmm-2025",
    date: "2025-10-31",
    precision: "month",
    type: "conference",
    titleEn: "Attended ACM Multimedia 2025 in Dublin, Ireland.",
    titleZh: "参加 ACM Multimedia 2025（爱尔兰，都柏林）。",
  },
];

/** Sorted newest to oldest. */
export function sortedNews(): NewsItem[] {
  return [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Top N items, newest first. */
export function latestNews(n: number): NewsItem[] {
  return sortedNews().slice(0, n);
}

const monthsEn = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatNewsDate(item: NewsItem, locale: string): string {
  const d = new Date(item.date + "T00:00:00");
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  if (locale === "zh") {
    if (item.precision === "day") return `${year} 年 ${month + 1} 月 ${day} 日`;
    return `${year} 年 ${month + 1} 月`;
  }
  if (item.precision === "day") return `${monthsEn[month]} ${day}, ${year}`;
  return `${monthsEn[month]} ${year}`;
}

const typeLabelsEn: Record<NewsType, string> = {
  paper: "Paper",
  milestone: "Milestone",
  conference: "Conference",
  news: "News",
  talk: "Talk",
  exhibition: "Exhibition",
  award: "Award",
};

const typeLabelsZh: Record<NewsType, string> = {
  paper: "论文",
  milestone: "里程碑",
  conference: "会议",
  news: "动态",
  talk: "讲座",
  exhibition: "展览",
  award: "奖项",
};

export function newsTypeLabel(type: NewsType, locale: string): string {
  return locale === "zh" ? typeLabelsZh[type] : typeLabelsEn[type];
}
