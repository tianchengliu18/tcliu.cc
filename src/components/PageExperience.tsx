"use client";

import { usePathname } from "@/i18n/navigation";
import HomeExperience from "./HomeExperience";

const animatedPages = new Set(["/research", "/publications", "/artwork", "/news", "/about", "/cv"]);

export default function PageExperience({ children, isZh }: { children: React.ReactNode; isZh: boolean }) {
  const pathname = usePathname().replace(/\/$/, "");
  // The homepage already has its own curated construction sequence.
  if (!animatedPages.has(pathname)) return children;
  // Shared layouts persist across navigation; each page needs a fresh task graph.
  return <HomeExperience key={`${isZh ? "zh" : "en"}:${pathname}`} isZh={isZh} autoDetect>{children}</HomeExperience>;
}
