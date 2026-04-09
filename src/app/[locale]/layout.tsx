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

export const metadata = {
  title: "Tiancheng LIU | Creative AI & Calligraphy",
  description:
    "Personal website of Tiancheng LIU — researcher in Creative AI, computational calligraphy, and multimodal interaction.",
};

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
