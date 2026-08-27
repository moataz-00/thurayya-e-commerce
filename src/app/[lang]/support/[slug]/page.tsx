import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { SUPPORT_ARTICLES, getSupportArticle } from "@/lib/mock";
import { DocumentPage } from "@/components/layout/DocumentPage";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => SUPPORT_ARTICLES.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const article = getSupportArticle(slug);
  if (!article) return {};
  return { title: article.title[locale], description: article.lede[locale] };
}

export default async function SupportArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const article = getSupportArticle(slug);
  if (!article) notFound();

  return (
    <DocumentPage
      locale={locale}
      article={article}
      kicker={d.support.kicker}
      crumbs={[
        { label: d.common.home, href: routes.home(locale) },
        { label: d.support.kicker, href: routes.support(locale) },
        { label: article.title[locale] },
      ]}
    />
  );
}
