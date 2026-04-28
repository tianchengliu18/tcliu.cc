"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "./ThemeProvider";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

const navItems = [
  { key: "research", href: "/research" },
  { key: "publications", href: "/publications" },
  { key: "artwork", href: "/artwork" },
  { key: "news", href: "/news" },
  { key: "about", href: "/about" },
  { key: "cv", href: "/cv" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLocale = (params.locale as string) || "en";
  const otherLocale = currentLocale === "en" ? "zh" : "en";

  const switchLocale = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg-primary/80 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[1.25rem] font-semibold tracking-tight text-text-primary hover:text-accent transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.svg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 rounded-sm"
          />
          T. LIU
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-base transition-colors ${
                  isActive
                    ? "text-accent font-medium"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}

          {/* Language switch */}
          <button
            onClick={switchLocale}
            className="text-[13px] px-2 py-1 border border-border rounded-md text-text-secondary hover:text-text-primary hover:border-text-tertiary transition-colors"
          >
            {currentLocale === "en" ? "\u4e2d" : "EN"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary hover:text-text-primary"
          aria-label="Menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-light bg-bg-primary/95 backdrop-blur-md">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-base ${
                    isActive
                      ? "text-accent font-medium"
                      : "text-text-secondary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="flex gap-3 pt-2 border-t border-border-light">
              <button
                onClick={switchLocale}
                className="text-[13px] px-2 py-1 border border-border rounded-md text-text-secondary"
              >
                {currentLocale === "en" ? "\u4e2d" : "EN"}
              </button>
              <button
                onClick={toggleTheme}
                className="text-[13px] px-2 py-1 border border-border rounded-md text-text-secondary"
              >
                {theme === "light" ? "Dark" : "Light"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
