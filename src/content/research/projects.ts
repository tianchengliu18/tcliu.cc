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
  image?: string;
}

// Theme 1: Computational Calligraphy Aesthetics
export const aestheticsProjects: ResearchProject[] = [
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
  {
    id: "rare-books",
    titleEn: "Edition Identification of Premodern Chinese Rare Books",
    titleZh: "\u53e4\u7c4d\u7248\u672c\u6df1\u5ea6\u5b66\u4e60\u8bc6\u522b",
    descriptionEn:
      "A deep-learning model for identifying editions of premodern Chinese rare books.",
    descriptionZh:
      "\u57fa\u4e8e\u6df1\u5ea6\u5b66\u4e60\u7684\u4e2d\u56fd\u53e4\u7c4d\u7248\u672c\u8bc6\u522b\u6a21\u578b\u3002",
    venue: "Digital Humanities '25",
    year: 2025,
    tags: ["deep-learning", "cultural-heritage"],
    links: [],
  },
];

// Theme 2: Embodied Calligraphy & Reflective Practice
export const embodiedProjects: ResearchProject[] = [
  {
    id: "brushu",
    titleEn: "BruSH\u00da",
    titleZh: "BruSH\u00da \u7b14\u672f",
    descriptionEn:
      "A perceptual lens that translates implicit micro-actions in calligraphy writing into cross-modal cues, supporting in-the-moment noticing and post-hoc reflection for expert calligraphers.",
    descriptionZh:
      "\u4e00\u4e2a\u5c06\u4e66\u6cd5\u4e66\u5199\u8fc7\u7a0b\u4e2d\u7684\u9690\u6027\u5fae\u52a8\u4f5c\u8f6c\u5316\u4e3a\u8de8\u6a21\u6001\u7ebf\u7d22\u7684\u611f\u77e5\u900f\u955c\uff0c\u652f\u6301\u4e13\u4e1a\u4e66\u6cd5\u5bb6\u7684\u5373\u65f6\u611f\u77e5\u548c\u4e8b\u540e\u53cd\u601d\u3002",
    venue: "SIGGRAPH '25 Art Papers",
    year: 2025,
    tags: ["calligraphy", "embodied-interaction"],
    links: [],
  },
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
    id: "body-movements",
    titleEn: "Archiving Body Movements",
    titleZh: "\u8eab\u4f53\u8fd0\u52a8\u5f52\u6863",
    descriptionEn:
      "Collective generation of Chinese calligraphy through archiving and interpreting body movements.",
    descriptionZh:
      "\u901a\u8fc7\u5f52\u6863\u548c\u89e3\u8bfb\u8eab\u4f53\u8fd0\u52a8\u6765\u96c6\u4f53\u751f\u6210\u4e2d\u56fd\u4e66\u6cd5\u3002",
    venue: "ISEA '24",
    year: 2024,
    tags: ["calligraphy", "embodied-interaction"],
    links: [
      { label: "DOI", url: "https://doi.org/10.5204/book.eprints.256296" },
    ],
  },
];

// Theme 3: Human-AI Co-Creative Performance
export const performanceProjects: ResearchProject[] = [
  {
    id: "to-perform-to-live",
    titleEn: "To Perform/To Live",
    titleZh: "To Perform/To Live \u5973\u6027\u65e5\u5e38\u4e50\u5668",
    descriptionEn:
      "A decolonial approach to interactive music performance, repurposing Chinese women\u2019s everyday objects as digital musical instruments through embodied gestures and human-AI co-creation.",
    descriptionZh:
      "\u4e00\u79cd\u53bb\u6b96\u6c11\u5316\u7684\u4ea4\u4e92\u97f3\u4e50\u8868\u6f14\u65b9\u6cd5\uff0c\u5c06\u4e2d\u56fd\u5973\u6027\u65e5\u5e38\u7269\u54c1\u901a\u8fc7\u5177\u8eab\u624b\u52bf\u548c\u4eba\u673a\u5171\u521b\u8f6c\u5316\u4e3a\u6570\u5b57\u4e50\u5668\u3002",
    venue: "SIGGRAPH '25 Art Papers",
    year: 2025,
    tags: ["co-creation", "embodied-interaction"],
    links: [],
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
