import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { categoriesFor, getCategory } from "@/lib/mock";
import { ListingPage } from "@/components/commerce/ListingPage";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    categoriesFor("lighting").map((c) => ({ lang, category: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}): Promise<Metadata> {
  const { lang, category } = await params;
  const locale = coerceLocale(lang);
  const found = getCategory(category);
  if (!found) return {};
  return { title: found.plural[locale], description: found.intro[locale] };
}

export default async function LightingCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; category: string }>;
  searchParams: Promise<{ open?: string }>;
}) {
  const { lang, category } = await params;
  const { open } = await searchParams;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const found = getCategory(category);

  if (!found || found.family !== "lighting") notFound();

  return (
    <ListingPage
      locale={locale}
      title={found.plural[locale]}
      intro={found.intro}
      bannerShot={found.bannerShot}
      crumbs={[
        { label: d.common.home, href: routes.home(locale) },
        { label: d.nav.lighting, href: routes.lighting(locale) },
        { label: found.plural[locale] },
      ]}
      scope={{ family: "lighting", category: found.slug }}
      openGroup={open}
    />
  );
}
