import { defineRouting } from "next-intl/routing";

// The production site is a static export. The `postbuild` rsync in
// package.json moves out/en/* to the site root, so on the live site the
// default locale (en) is served WITHOUT a prefix (tcliu.cc/) and Chinese
// gets /zh. The dev server performs no such move and has no middleware to
// rewrite paths, so in development every locale must carry its own prefix
// (/en, /zh) or English-side navigation 404s.
//
// We therefore pick the prefix strategy per environment so dev navigation
// matches what the built site serves. localePrefixFor() exposes the same
// rule for code that builds locale URLs by hand (the language switcher).
const isDev = process.env.NODE_ENV === "development";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  // Dev: prefix every locale. Production: default locale lives at the root.
  localePrefix: isDev ? "always" : "as-needed",
});

/** URL prefix for a locale, honoring the dev-vs-production rule above. */
export function localePrefixFor(locale: string): string {
  if (isDev) return `/${locale}`;
  return locale === routing.defaultLocale ? "" : `/${locale}`;
}
