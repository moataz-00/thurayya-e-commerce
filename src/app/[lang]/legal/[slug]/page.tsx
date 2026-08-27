import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { LEGAL_DOCS, getLegalDoc } from "@/lib/mock";
import { DocumentPage } from "@/components/layout/DocumentPage";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => LEGAL_DOCS.map((doc) => ({ lang, slug: doc.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return { title: doc.title[locale], description: doc.lede[locale] };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <DocumentPage
      showUpdated
      locale={locale}
      article={doc}
      kicker={d.footer.terms}
      crumbs={[
        { label: d.common.home, href: routes.home(locale) },
        { label: doc.title[locale] },
      ]}
    />
  );
}
