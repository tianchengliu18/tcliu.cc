import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  // Default locale is served from the URL root (tcliu.cc/), other locales
  // get a prefix (tcliu.cc/zh/).
  localePrefix: "as-needed",
});
