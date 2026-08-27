import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { SearchView } from "@/components/commerce/SearchView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.nav.search, robots: { index: false } };
}

/** Search takes over the viewport — no header, no footer, dark ground. */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <SearchView initialQuery={q ?? ""} />;
}
