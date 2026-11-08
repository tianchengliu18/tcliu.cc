"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localePrefixFor } from "@/i18n/routing";
import { useTheme } from "./ThemeProvider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = ["research", "publications", "artwork", "news", "about"] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [section, setSection] = useState("intro");
  const currentLocale = (params.locale as string) || "en";
  const isZh = currentLocale === "zh";
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".story-section[id]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const current = atEnd ? sections.at(-1) : sections.filter(item => item.getBoundingClientRect().top <= window.innerHeight * 0.38).at(-1);
      setSection(current?.id || "intro");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [isHome]);

  const switchLocale = () => {
    let barePath = window.location.pathname.replace(/^\/(en|zh)(?=\/|$)/, "");
    if (!barePath) barePath = "/";
    const prefix = localePrefixFor(isZh ? "en" : "zh");
    window.location.href = (barePath === "/" ? `${prefix}/` : `${prefix}${barePath}`) + window.location.hash;
  };

  const homeActive = isHome && section === "intro";
  return (
    <nav className={`site-nav ${mobileOpen ? "is-open" : ""}`} aria-label={isZh ? "主导航" : "Main navigation"}>
      <div className="nav-top">
        <Link href={isHome ? "/#intro" : "/"} className="nav-brand" onClick={() => setMobileOpen(false)} aria-label={isZh ? "首页" : "Home"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={isZh ? "/favicons/zh/icon-192.png" : "/favicons/en/icon.svg"} alt="" width={28} height={28} />
          <span>T. LIU</span>
        </Link>
        <div className="nav-tools">
          <button onClick={switchLocale} aria-label={isZh ? "Switch to English" : "切换为中文"}>{isZh ? "EN" : "中"}</button>
          <button onClick={toggleTheme} aria-label={isZh ? "切换明暗主题" : "Toggle color theme"}>{theme === "light" ? (isZh ? "夜间" : "Dark") : (isZh ? "日间" : "Light")}</button>
        </div>
        <button className="nav-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="site-navigation">{mobileOpen ? (isZh ? "关闭" : "Close") : (isZh ? "目录" : "Menu")}</button>
      </div>
      <div className="nav-body" id="site-navigation">
        <div className="nav-links">
          <Link href={isHome ? "/#intro" : "/"} onClick={() => setMobileOpen(false)} className={homeActive ? "is-active" : ""} aria-current={homeActive ? "location" : undefined}>{t("home")}</Link>
          {navItems.map(key => {
            const active = isHome ? section === key : pathname === `/${key}` || pathname.startsWith(`/${key}/`);
            return <Link key={key} href={isHome ? `/#${key}` : `/${key}`} onClick={() => setMobileOpen(false)} className={active ? "is-active" : ""} aria-current={active ? (isHome ? "location" : "page") : undefined}>{t(key)}</Link>;
          })}
          <Link href="/cv" onClick={() => setMobileOpen(false)} className={pathname === "/cv" ? "is-active" : ""} aria-current={pathname === "/cv" ? "page" : undefined}>{t("cv")}</Link>
          {isHome && <Link href="/#contact" onClick={() => setMobileOpen(false)} className={section === "contact" ? "is-active" : ""} aria-current={section === "contact" ? "location" : undefined}>{isZh ? "联系" : "Contact"}</Link>}
        </div>
      </div>
    </nav>
  );
}
