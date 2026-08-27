import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";

import type { Locale } from "@/lib/types";
import { DIRECTION, LOCALES, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { LocaleProvider } from "@/lib/i18n/provider";
import { StoreProvider } from "@/lib/store/store";
import { Toast } from "@/components/ui/Toast";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { SkipLink } from "@/components/layout/SkipLink";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#161819",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const d = getDictionary(locale);
  return {
    title: {
      default: `${d.brand.name} — ${d.brand.tagline}`,
      template: `%s · ${d.meta.titleSuffix}`,
    },
    description: d.meta.description,
    applicationName: "Thurayya",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: `${d.brand.name} — ${d.brand.tagline}`,
      description: d.meta.description,
      locale: locale === "ar" ? "ar_EG" : "en_EG",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <html lang={locale} dir={DIRECTION[locale]}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@200;300;400;500;600&family=Reem+Kufi:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@200;300;400;500&family=IBM+Plex+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <StoreProvider>
            <SkipLink />
            <div id="main">{children}</div>
            <Toast />
            <CookieBanner />
          </StoreProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
