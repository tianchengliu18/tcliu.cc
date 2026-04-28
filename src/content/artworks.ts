export interface Artwork {
  id: string;
  title: string;
  year: number;
  role: "lead" | "collaborator";
  exhibitions: string[];
  paperVenue?: string;
  statementEn: string;
  statementZh: string;
  links: { label: string; url: string }[];
  image?: string;
  video?: string;
}

export const artworks: Artwork[] = [
  // ── Lead Artist ──
  {
    id: "brushu",
    title: "BruSH\u00da",
    year: 2025,
    role: "lead",
    exhibitions: [
      "\"Symbiotic Signals: Entangled Perceptions and Algorithms\", Shaw Auditorium, HKUST, 2026",
    ],
    paperVenue: "SIGGRAPH '25 Art Papers",
    statementEn:
      "Artworks are often encountered as finished artifacts; the implicit micro-actions that shape a calligraphic trace\u2014boundaries, transitions, timing\u2014are fleeting and underdetermined by the final work. BruSH\u00da is a perceptual lens that translates these writing-process cues into interpretable cross-modal signals, supporting in-the-moment noticing and post-hoc reflection for expert calligraphers without turning practice into instruction or assessment.",
    statementZh:
      "\u4e66\u6cd5\u4f5c\u54c1\u5f80\u5f80\u4ee5\u6210\u54c1\u5f62\u6001\u88ab\u89c2\u770b\uff0c\u800c\u4e66\u5199\u8fc7\u7a0b\u4e2d\u7684\u9690\u6027\u5fae\u52a8\u4f5c\u2014\u2014\u8fb9\u754c\u3001\u8f6c\u6362\u3001\u65f6\u5e8f\u2014\u2014\u7a0d\u7eb5\u5373\u901d\u3002BruSH\u00da \u662f\u4e00\u4e2a\u611f\u77e5\u900f\u955c\uff0c\u5c06\u8fd9\u4e9b\u4e66\u5199\u8fc7\u7a0b\u7ebf\u7d22\u8f6c\u5316\u4e3a\u53ef\u89e3\u8bfb\u7684\u8de8\u6a21\u6001\u4fe1\u53f7\uff0c\u652f\u6301\u4e13\u4e1a\u4e66\u6cd5\u5bb6\u7684\u5373\u65f6\u611f\u77e5\u4e0e\u4e8b\u540e\u53cd\u601d\uff0c\u800c\u975e\u5c06\u7ec3\u4e60\u8f6c\u5316\u4e3a\u6559\u5b66\u6216\u8bc4\u4f30\u3002",
    links: [],
    image: "/artwork/images/brushu.png",
  },
  {
    id: "poemotion",
    title: "PoeMotion",
    year: 2024,
    role: "lead",
    exhibitions: [
      "Campus Exhibition, HKUST(GZ), 2024",
    ],
    paperVenue: "ISEA '24",
    statementEn:
      "Can AI utilize Chinese calligraphy to express the emotion within poems? PoeMotion is a co-creative system that bridges poetry and calligraphy\u2014translating the emotional arc of a poem into expressive calligraphic forms, exploring how generative AI can participate in culturally-grounded artistic creation.",
    statementZh:
      "AI\u80fd\u5426\u7528\u4e2d\u56fd\u4e66\u6cd5\u6765\u8868\u8fbe\u8bd7\u6b4c\u4e2d\u7684\u60c5\u611f\uff1fPoeMotion \u662f\u4e00\u4e2a\u8fde\u63a5\u8bd7\u6b4c\u4e0e\u4e66\u6cd5\u7684\u5171\u521b\u7cfb\u7edf\uff0c\u5c06\u8bd7\u6b4c\u7684\u60c5\u611f\u5f27\u7ebf\u8f6c\u5316\u4e3a\u5bcc\u6709\u8868\u73b0\u529b\u7684\u4e66\u6cd5\u5f62\u6001\uff0c\u63a2\u7d22\u751f\u6210\u5f0f AI \u5982\u4f55\u53c2\u4e0e\u690d\u6839\u6587\u5316\u7684\u827a\u672f\u521b\u4f5c\u3002",
    links: [
      { label: "DOI", url: "https://doi.org/10.5204/book.eprints.256296" },
    ],
    image: "/artwork/images/poemotion.png",
  },
  {
    id: "narrastone",
    title: "NarraStone",
    year: 2024,
    role: "lead",
    exhibitions: [
      "Campus Exhibition, HKUST(GZ), 2024",
    ],
    statementEn:
      "NarraStone reimagines the ancient medium of stone steles through human-AI collaboration. A tangible, twistable cube inspired by Chinese stone steles allows participants to form characters that seed emergent narratives via LLM, visualized as dynamic inscription calligraphy projections. The work highlights how collective interaction shapes stories and invites audiences to co-author the narrative landscape.",
    statementZh:
      "NarraStone \u901a\u8fc7\u4eba\u673a\u534f\u4f5c\u91cd\u65b0\u60f3\u8c61\u53e4\u8001\u7684\u77f3\u7891\u5a92\u4ecb\u3002\u4e00\u4e2a\u53d7\u4e2d\u56fd\u77f3\u7891\u542f\u53d1\u7684\u53ef\u65cb\u8f6c\u7acb\u65b9\u4f53\uff0c\u8ba9\u53c2\u4e0e\u8005\u7ec4\u5efa\u6c49\u5b57\uff0c\u901a\u8fc7\u5927\u8bed\u8a00\u6a21\u578b\u751f\u6210\u6d8c\u73b0\u53d9\u4e8b\uff0c\u5e76\u4ee5\u52a8\u6001\u7891\u523b\u4e66\u6cd5\u6295\u5f71\u5448\u73b0\u3002\u4f5c\u54c1\u63ed\u793a\u4e86\u96c6\u4f53\u4e92\u52a8\u5982\u4f55\u5851\u9020\u53d9\u4e8b\uff0c\u9080\u8bf7\u89c2\u4f17\u5171\u540c\u4e66\u5199\u53d9\u4e8b\u666f\u89c2\u3002",
    links: [],
    image: "/artwork/images/narrastone.jpg",
  },

  // ── Collaborative ──
  {
    id: "to-perform-to-live",
    title: "To Perform/To Live",
    year: 2025,
    role: "collaborator",
    exhibitions: [
      "Campus Performance, HKUST(GZ), 2025",
      "\"Symbiotic Signals: Entangled Perceptions and Algorithms\", Shaw Auditorium, HKUST, 2026",
    ],
    paperVenue: "SIGGRAPH '25 Art Papers",
    statementEn:
      "A decolonial approach to interactive music performance that repurposes Chinese women\u2019s everyday objects\u2014an abacus, a washing basin, a soup pot, a fan, a massage hammer\u2014as digital musical instruments. Performers transform domestic gestures into musical control, rendering gendered labor audible. After each performance, human-AI co-creation extends the work into 3D-printed tactile artifacts.",
    statementZh:
      "\u4e00\u79cd\u53bb\u6b96\u6c11\u5316\u7684\u4ea4\u4e92\u97f3\u4e50\u8868\u6f14\u65b9\u6cd5\uff0c\u5c06\u4e2d\u56fd\u5973\u6027\u7684\u65e5\u5e38\u7269\u54c1\u2014\u2014\u7b97\u76d8\u3001\u6d17\u83dc\u76c6\u3001\u6c64\u9505\u3001\u6247\u5b50\u3001\u6309\u6469\u9524\u2014\u2014\u8f6c\u5316\u4e3a\u6570\u5b57\u4e50\u5668\u3002\u8868\u6f14\u8005\u5c06\u5bb6\u52a1\u52a8\u4f5c\u8f6c\u5316\u4e3a\u97f3\u4e50\u63a7\u5236\uff0c\u8ba9\u6027\u522b\u5316\u52b3\u52a8\u53d8\u5f97\u53ef\u542c\u3002\u6bcf\u6b21\u8868\u6f14\u540e\uff0c\u4eba\u673a\u5171\u521b\u5c06\u4f5c\u54c1\u5ef6\u4f38\u4e3a 3D \u6253\u5370\u7684\u89e6\u89c9\u5236\u54c1\u3002",
    links: [],
    image: "/artwork/images/to-perform-to-live.jpg",
  },
  {
    id: "finhertip",
    title: "FinHertip",
    year: 2025,
    role: "collaborator",
    exhibitions: [
      "Huiling Farm Performance, Guangzhou, 2025",
    ],
    paperVenue: "SIGGRAPH Asia '25 Art Papers",
    statementEn:
      "FinHertip explores embodied identity and human-AI co-creation in accessible musical performance. Performed at Huiling Farm\u2014a therapeutic farm supporting people with intellectual disabilities in gaining life skills and reintegrating into society\u2014the work designs interfaces that enable expressive music-making through embodied interaction.",
    statementZh:
      "FinHertip \u63a2\u7d22\u5177\u8eab\u8eab\u4efd\u4e0e\u4eba\u673a\u5171\u521b\u5728\u65e0\u969c\u788d\u97f3\u4e50\u8868\u6f14\u4e2d\u7684\u5e94\u7528\u3002\u4f5c\u54c1\u5728\u6167\u7075\u519c\u573a\u6f14\u51fa\u2014\u2014\u8fd9\u662f\u4e00\u4e2a\u5e2e\u52a9\u5fc3\u667a\u969c\u788d\u4eba\u58eb\u638c\u63e1\u751f\u6d3b\u548c\u5de5\u4f5c\u6280\u80fd\u3001\u91cd\u65b0\u878d\u5165\u793e\u4f1a\u7684\u751f\u6001\u519c\u7597\u6108\u519c\u573a\u2014\u2014\u8bbe\u8ba1\u901a\u8fc7\u5177\u8eab\u4ea4\u4e92\u5b9e\u73b0\u5bcc\u6709\u8868\u73b0\u529b\u7684\u97f3\u4e50\u521b\u4f5c\u7684\u754c\u9762\u3002",
    links: [
      { label: "DOI", url: "https://doi.org/10.1145/3757369.3767621" },
    ],
    image: "/artwork/images/finhertip.jpg",
  },
  {
    id: "body-movements",
    title: "Archiving Body Movements",
    year: 2024,
    role: "collaborator",
    exhibitions: [
      "Campus Exhibition, HKUST(GZ), 2024",
    ],
    paperVenue: "ISEA '24",
    statementEn:
      "Collective generation of Chinese calligraphy through archiving and interpreting body movements\u2014exploring how group embodied actions can be translated into calligraphic expression.",
    statementZh:
      "\u901a\u8fc7\u5f52\u6863\u548c\u89e3\u8bfb\u8eab\u4f53\u8fd0\u52a8\u6765\u96c6\u4f53\u751f\u6210\u4e2d\u56fd\u4e66\u6cd5\uff0c\u63a2\u7d22\u7fa4\u4f53\u5177\u8eab\u52a8\u4f5c\u5982\u4f55\u8f6c\u5316\u4e3a\u4e66\u6cd5\u8868\u8fbe\u3002",
    links: [
      { label: "DOI", url: "https://doi.org/10.5204/book.eprints.256296" },
    ],
    image: "/artwork/images/body-movements.jpg",
  },
];
