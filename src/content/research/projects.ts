export interface ResearchProject {
  id: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  venue?: string;
  year: number;
  tags: string[];
  links: { label: string; url: string }[];
  image?: string; // placeholder for now
}

export const calligraphyProjects: ResearchProject[] = [
  {
    id: "kaishu-aesthetics",
    titleEn: "Kai Shu Calligraphy Aesthetics & Personality",
    titleZh: "\u6977\u4e66\u7f8e\u5b66\u7279\u5f81\u4e0e\u4eba\u683c\u504f\u597d",
    descriptionEn:
      "Quantifying structural aesthetic features in Kai Shu calligraphy and their correlation with personality traits.",
    descriptionZh:
      "\u91cf\u5316\u6977\u4e66\u4e66\u6cd5\u7684\u7ed3\u6784\u7f8e\u5b66\u7279\u5f81\u53ca\u5176\u4e0e\u4eba\u683c\u7279\u8d28\u7684\u5173\u8054\u3002",
    venue: "ACM MM '25",
    year: 2025,
    tags: ["calligraphy", "computational-aesthetics"],
    links: [{ label: "DOI", url: "https://doi.org/10.1145/3746027.3754816" }],
  },
  {
    id: "calligraphy-layout",
    titleEn: "Calligraphy Layout Interpretation",
    titleZh: "\u4e66\u6cd5\u7ae0\u6cd5\u8ba1\u7b97\u89e3\u8bfb",
    descriptionEn:
      "Computational interpretation of Chinese calligraphy layout via graph-based modeling and language models.",
    descriptionZh:
      "\u901a\u8fc7\u56fe\u5efa\u6a21\u548c\u8bed\u8a00\u6a21\u578b\u5bf9\u4e2d\u56fd\u4e66\u6cd5\u7ae0\u6cd5\u8fdb\u884c\u8ba1\u7b97\u89e3\u8bfb\u3002",
    year: 2025,
    tags: ["calligraphy", "computational-aesthetics"],
    links: [],
  },
  {
    id: "seal-carving",
    titleEn: "Chinese Seal Carving Aesthetic Evaluation",
    titleZh: "\u4e2d\u56fd\u7bc6\u523b\u7f8e\u5b66\u8bc4\u4ef7",
    descriptionEn:
      "Evaluating the aesthetics of Chinese seal carving through computational methods.",
    descriptionZh:
      "\u901a\u8fc7\u8ba1\u7b97\u65b9\u6cd5\u8bc4\u4ef7\u4e2d\u56fd\u7bc6\u523b\u7684\u7f8e\u5b66\u4ef7\u503c\u3002",
    venue: "VINCI '24",
    year: 2024,
    tags: ["calligraphy", "computational-aesthetics"],
    links: [{ label: "DOI", url: "https://doi.org/10.1145/3678698.3687175" }],
  },
];

export const cocreationProjects: ResearchProject[] = [
  {
    id: "poemotion",
    titleEn: "PoeMotion",
    titleZh: "PoeMotion \u8bd7\u610f\u4e66\u6cd5",
    descriptionEn:
      "Can AI utilize Chinese calligraphy to express emotion from poems? A co-creative system bridging poetry and calligraphy.",
    descriptionZh:
      "AI\u80fd\u5426\u7528\u4e2d\u56fd\u4e66\u6cd5\u8868\u8fbe\u8bd7\u6b4c\u4e2d\u7684\u60c5\u611f\uff1f\u4e00\u4e2a\u8fde\u63a5\u8bd7\u6b4c\u4e0e\u4e66\u6cd5\u7684\u5171\u521b\u7cfb\u7edf\u3002",
    venue: "ISEA '24",
    year: 2024,
    tags: ["co-creation", "calligraphy"],
    links: [
      { label: "DOI", url: "https://doi.org/10.5204/book.eprints.256296" },
    ],
  },
  {
    id: "finhertip",
    titleEn: "FinHertip",
    titleZh: "FinHertip \u6307\u5c16\u4e50\u97f3",
    descriptionEn:
      "Embodied identity and human-AI co-creation in accessible musical performance.",
    descriptionZh:
      "\u5177\u8eab\u8eab\u4efd\u4e0e\u4eba\u673a\u5171\u521b\u5728\u65e0\u969c\u788d\u97f3\u4e50\u8868\u6f14\u4e2d\u7684\u5e94\u7528\u3002",
    venue: "SIGGRAPH Asia '25 Art Papers",
    year: 2025,
    tags: ["co-creation", "embodied-interaction"],
    links: [
      { label: "DOI", url: "https://doi.org/10.1145/3757369.3767621" },
    ],
  },
];

export const visualizationProjects: ResearchProject[] = [
  {
    id: "charteditor",
    titleEn: "ChartEditor",
    titleZh: "ChartEditor \u56fe\u8868\u7f16\u8f91\u5668",
    descriptionEn:
      "A human-AI paired tool for authoring pictorial charts, integrating narrative design with generative techniques.",
    descriptionZh:
      "\u4e00\u4e2a\u4eba\u673a\u914d\u5bf9\u7684\u56fe\u8868\u521b\u4f5c\u5de5\u5177\uff0c\u878d\u5408\u53d9\u4e8b\u8bbe\u8ba1\u4e0e\u751f\u6210\u6280\u672f\u3002",
    venue: "IEEE TVCG (Under Review)",
    year: 2025,
    tags: ["visualization", "co-creation"],
    links: [],
  },
];
