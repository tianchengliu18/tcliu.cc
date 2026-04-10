export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  url?: string;
  isFirstAuthor: boolean;
  status: "published";
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: 1,
    title:
      "BruSH\u00da: Cross-modal translation of implicit micro-actions in Chinese calligraphy",
    authors: "T. Liu et al.",
    venue: "SIGGRAPH '25 Art Papers",
    year: 2025,
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "embodied-interaction"],
  },
  {
    id: 2,
    title:
      "To Perform/To Live: Decolonizing digital music instruments and feminism through human-AI co-created embodied experiences of everyday objects",
    authors: "S. Zhang, T. Liu, and M. Fan",
    venue: "SIGGRAPH '25 Art Papers",
    year: 2025,
    isFirstAuthor: false,
    status: "published",
    tags: ["co-creation", "embodied-interaction"],
  },
  {
    id: 3,
    title:
      "Finhertip: Embodied identity and human-AI co-creation in accessible musical performance",
    authors: "S. Zhang, T. Liu, and M. Fan",
    venue: "SIGGRAPH Asia '25 Art Papers",
    year: 2025,
    doi: "10.1145/3757369.3767621",
    isFirstAuthor: false,
    status: "published",
    tags: ["co-creation", "embodied-interaction"],
  },
  {
    id: 4,
    title:
      "Quantifying structural aesthetic features and personality trait preferences in kai shu calligraphy",
    authors: "T. Liu, J. Ye, S. Zhang, K. Zhang, and C. Liang",
    venue: "ACM Multimedia 2025 (MM '25), pp. 6730-6739",
    year: 2025,
    doi: "10.1145/3746027.3754816",
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "computational-aesthetics"],
  },
  {
    id: 5,
    title:
      "Computational interpretation of chinese calligraphy layout via graph-based modeling and language models",
    authors: "T. Liu, S. Yan, S. Zhang, C. Liang, and K. Zhang",
    venue:
      "POLYU COMP - HKUST(GZ) INFH Research Student Conference, Poster",
    year: 2025,
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "computational-aesthetics"],
  },
  {
    id: 6,
    title:
      "A deep-learning model for edition identification of premodern chinese rare books",
    authors: "Y. Wei, Y. Fu, S. Wang, S. Gao, T. Liu, Z. Wang, and X. Tong",
    venue: "Digital Humanities, no. 03, pp. 1-10",
    year: 2025,
    isFirstAuthor: false,
    status: "published",
    tags: ["deep-learning", "cultural-heritage"],
  },
  {
    id: 7,
    title: "Chinese seal carving aesthetic evaluation",
    authors: "T. Liu, L. Li, and M. Yang",
    venue: "VINCI '24",
    year: 2024,
    doi: "10.1145/3678698.3687175",
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "computational-aesthetics"],
  },
  {
    id: 8,
    title:
      "Poemotion: Can AI utilize chinese calligraphy to express emotion from poems?",
    authors:
      "T. Liu, A. Wang, X. Chen, J. Yan, Y. Li, P. Hui, and K. Zhang",
    venue: "ISEA2024 Everywhen Proceedings, pp. 476-483",
    year: 2024,
    doi: "10.5204/book.eprints.256296",
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "co-creation"],
  },
  {
    id: 9,
    title:
      "Archiving body movements: Collective generation of chinese calligraphy",
    authors: "A. L. Zhou, J. Ye, T. Liu, and K. Zhang",
    venue: "ISEA2024 Everywhen Proceedings, pp. 862-870",
    year: 2024,
    doi: "10.5204/book.eprints.256296",
    isFirstAuthor: false,
    status: "published",
    tags: ["calligraphy", "embodied-interaction"],
  },
];
