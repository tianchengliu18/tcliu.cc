export interface Author {
  name: string;
  /** Mark this author as the site owner — rendered with bold + underline. */
  isMe?: boolean;
  /** 1-based indices into the surrounding `affiliations` array. */
  affiliations?: number[];
}

export interface Publication {
  id: number;
  /** URL-safe identifier; used for the detail page route. */
  slug: string;
  title: string;
  /** Structured author list. Names matching the site owner should set `isMe: true`. */
  authorList: Author[];
  /** Optional list of affiliations referenced by `Author.affiliations` (1-based). */
  affiliations?: string[];
  /** Full venue string for the list (e.g. "ACM Multimedia 2025 (MM '25), pp. 6730-6739"). */
  venue: string;
  /** Short venue badge shown in the top-left of the teaser (e.g. "ACM MM 25"). */
  venueShort: string;
  year: number;
  isFirstAuthor: boolean;
  status: "published";
  tags: string[];
  /** Path under /public, e.g. "/publications/teasers/brushu.jpg". */
  teaser?: string;
  /** Abstract shown on the detail page. */
  abstract?: string;
  /** Self-hosted PDF, e.g. "/publications/pdfs/brushu.pdf". */
  pdfUrl?: string;
  doi?: string;
  arxivUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  /** BibTeX entry shown on the detail page (kept as a raw string). */
  bibtex?: string;
}

export const publications: Publication[] = [
  {
    id: 1,
    slug: "brushu",
    title:
      "BruSHÚ: Cross-modal translation of implicit micro-actions in Chinese calligraphy",
    authorList: [{ name: "T. Liu", isMe: true }, { name: "et al." }],
    venue: "SIGGRAPH '25 Art Papers",
    venueShort: "SIGGRAPH 25",
    year: 2025,
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "embodied-interaction"],
  },
  {
    id: 2,
    slug: "to-perform-to-live",
    title:
      "To Perform/To Live: Decolonizing digital music instruments and feminism through human-AI co-created embodied experiences of everyday objects",
    authorList: [
      { name: "S. Zhang" },
      { name: "T. Liu", isMe: true },
      { name: "M. Fan" },
    ],
    venue: "SIGGRAPH '25 Art Papers",
    venueShort: "SIGGRAPH 25",
    year: 2025,
    isFirstAuthor: false,
    status: "published",
    tags: ["co-creation", "embodied-interaction"],
  },
  {
    id: 3,
    slug: "finhertip",
    title:
      "Finhertip: Embodied identity and human-AI co-creation in accessible musical performance",
    authorList: [
      { name: "S. Zhang" },
      { name: "T. Liu", isMe: true },
      { name: "M. Fan" },
    ],
    venue: "SIGGRAPH Asia '25 Art Papers",
    venueShort: "SIGGRAPH Asia 25",
    year: 2025,
    doi: "10.1145/3757369.3767621",
    isFirstAuthor: false,
    status: "published",
    tags: ["co-creation", "embodied-interaction"],
    teaser: "/publications/teasers/finhertip.png",
    pdfUrl: "/publications/pdfs/finhertip.pdf",
  },
  {
    id: 4,
    slug: "kai-shu-aesthetics",
    title:
      "Quantifying structural aesthetic features and personality trait preferences in kai shu calligraphy",
    authorList: [
      { name: "T. Liu", isMe: true },
      { name: "J. Ye" },
      { name: "S. Zhang" },
      { name: "K. Zhang" },
      { name: "C. Liang" },
    ],
    venue: "ACM Multimedia 2025 (MM '25), pp. 6730-6739",
    venueShort: "ACM MM 25",
    year: 2025,
    doi: "10.1145/3746027.3754816",
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "computational-aesthetics"],
    teaser: "/publications/teasers/kai-shu-aesthetics.png",
    pdfUrl: "/publications/pdfs/kai-shu-aesthetics.pdf",
  },
  {
    id: 5,
    slug: "calligraphy-layout-llm",
    title:
      "Computational interpretation of chinese calligraphy layout via graph-based modeling and language models",
    authorList: [
      { name: "T. Liu", isMe: true },
      { name: "S. Yan" },
      { name: "S. Zhang" },
      { name: "C. Liang" },
      { name: "K. Zhang" },
    ],
    venue: "POLYU COMP - HKUST(GZ) INFH Research Student Conference, Poster",
    venueShort: "Poster 25",
    year: 2025,
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "computational-aesthetics"],
    teaser: "/publications/teasers/calligraphy-layout-llm.png",
    pdfUrl: "/publications/pdfs/calligraphy-layout-llm.pdf",
  },
  {
    id: 6,
    slug: "rare-books-edition",
    title:
      "A deep-learning model for edition identification of premodern chinese rare books",
    authorList: [
      { name: "Y. Wei" },
      { name: "Y. Fu" },
      { name: "S. Wang" },
      { name: "S. Gao" },
      { name: "T. Liu", isMe: true },
      { name: "Z. Wang" },
      { name: "X. Tong" },
    ],
    venue: "Digital Humanities, no. 03, pp. 1-10",
    venueShort: "DH 25",
    year: 2025,
    isFirstAuthor: false,
    status: "published",
    tags: ["deep-learning", "cultural-heritage"],
    teaser: "/publications/teasers/rare-books-edition.png",
    pdfUrl: "/publications/pdfs/rare-books-edition.pdf",
  },
  {
    id: 7,
    slug: "seal-carving",
    title: "Chinese seal carving aesthetic evaluation",
    authorList: [
      { name: "T. Liu", isMe: true },
      { name: "L. Li" },
      { name: "M. Yang" },
    ],
    venue: "VINCI '24",
    venueShort: "VINCI 24",
    year: 2024,
    doi: "10.1145/3678698.3687175",
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "computational-aesthetics"],
    teaser: "/publications/teasers/seal-carving.jpg",
    pdfUrl: "/publications/pdfs/seal-carving.pdf",
  },
  {
    id: 8,
    slug: "poemotion",
    title:
      "Poemotion: Can AI utilize chinese calligraphy to express emotion from poems?",
    authorList: [
      { name: "T. Liu", isMe: true },
      { name: "A. Wang" },
      { name: "X. Chen" },
      { name: "J. Yan" },
      { name: "Y. Li" },
      { name: "P. Hui" },
      { name: "K. Zhang" },
    ],
    venue: "ISEA2024 Everywhen Proceedings, pp. 476-483",
    venueShort: "ISEA 24",
    year: 2024,
    doi: "10.5204/book.eprints.256296",
    isFirstAuthor: true,
    status: "published",
    tags: ["calligraphy", "co-creation"],
    teaser: "/publications/teasers/poemotion.png",
    pdfUrl: "/publications/pdfs/poemotion.pdf",
  },
  {
    id: 9,
    slug: "archiving-body-movements",
    title:
      "Archiving body movements: Collective generation of chinese calligraphy",
    authorList: [
      { name: "A. L. Zhou" },
      { name: "J. Ye" },
      { name: "T. Liu", isMe: true },
      { name: "K. Zhang" },
    ],
    venue: "ISEA2024 Everywhen Proceedings, pp. 862-870",
    venueShort: "ISEA 24",
    year: 2024,
    doi: "10.5204/book.eprints.256296",
    isFirstAuthor: false,
    status: "published",
    tags: ["calligraphy", "embodied-interaction"],
    teaser: "/publications/teasers/archiving-body-movements.jpg",
    pdfUrl: "/publications/pdfs/archiving-body-movements.pdf",
  },
  {
    id: 10,
    slug: "icdsba-financial-risk",
    title:
      "Measuring Systemic Risk in the Chinese Financial System Based on Asymmetric Exponential Power Distribution",
    authorList: [
      { name: "H. Li" },
      { name: "T. Luo" },
      { name: "L. Li" },
      { name: "T. Liu", isMe: true },
    ],
    venue:
      "Recent Developments in Data Science and Business Analytics (Springer Proceedings in Business and Economics), pp. 225-232",
    venueShort: "ICDSBA 18",
    year: 2018,
    doi: "10.1007/978-3-319-72745-5_24",
    isFirstAuthor: false,
    status: "published",
    tags: ["financial-risk"],
    teaser: "/publications/teasers/icdsba-financial-risk.png",
    pdfUrl: "/publications/pdfs/icdsba-financial-risk.pdf",
    abstract:
      "We propose an extension of CoVaR approach by employing the Asymmetric Exponential Power Distribution (AEPD) to capture the properties of financial data series such as fat-tailedness and skewness. We prove the new model with AEPD has better goodness-of-fit than traditional model with Gaussian distribution, which means a higher precision. Basing on the Chinese stock market data and the new model, we measure the contribution of 29 financial institutions in bank, security, insurance and other industries.",
    bibtex: `@InProceedings{Li2018SystemicRisk,
  author    = {Li, Helong and Luo, Tianqi and Li, Liuling and Liu, Tiancheng},
  editor    = {Tavana, Madjid and Patnaik, Srikanta},
  title     = {Measuring Systemic Risk in the Chinese Financial System Based on Asymmetric Exponential Power Distribution},
  booktitle = {Recent Developments in Data Science and Business Analytics},
  year      = {2018},
  publisher = {Springer International Publishing},
  address   = {Cham},
  pages     = {225--232},
  isbn      = {978-3-319-72745-5},
  doi       = {10.1007/978-3-319-72745-5_24}
}`,
  },
];

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}
