import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === "zh";
  const dir = isZh ? "/favicons/zh" : "/favicons/en";
  return {
    title: isZh
      ? "刘天成 | 计算艺术与文化"
      : "Tiancheng LIU | Creative AI & Calligraphy",
    description: isZh
      ? "刘天成的个人网站。研究方向：计算艺术与文化、具身交互、创意 AI。"
      : "Personal website of Tiancheng LIU. Research areas: computational arts and culture, embodied interaction, and creative AI.",
    icons: {
      icon: [
        { url: `${dir}/favicon.ico`, sizes: "48x48", type: "image/x-icon" },
        ...(isZh
          ? [{ url: `${dir}/icon-512.png`, sizes: "512x512", type: "image/png" }]
          : [{ url: `${dir}/icon.svg`, type: "image/svg+xml" }]),
        { url: `${dir}/icon-192.png`, sizes: "192x192", type: "image/png" },
      ],
      apple: { url: `${dir}/apple-touch-icon.png`, sizes: "180x180" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Sans+SC:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'ShiMenSong';
                src: url('/fonts/shimensong-subset.woff2') format('woff2');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Nav />
            <main className="flex-1 pt-14">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
