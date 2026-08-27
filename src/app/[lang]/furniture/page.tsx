import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { ListingPage } from "@/components/commerce/ListingPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.nav.furniture };
}

export default async function FurniturePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ open?: string }>;
}) {
  const { lang } = await params;
  const { open } = await searchParams;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <ListingPage
      locale={locale}
      title={d.nav.furniture}
      intro={{
        en: "Walnut, travertine and patinated brass, proportioned to the fixtures above them. Short lines, made to order, cut to your room when the standard sizes miss.",
        ar: "جوز وترافرتين ونحاس معتّق، بنسب مشتقة من الوحدات المعلقة فوقها. خطوط قصيرة تُصنع حسب الطلب، وتُقصّ على مقاس غرفتك إن لم تناسبك المقاسات القياسية.",
      }}
      bannerShot={{
        en: "category banner — travertine console, side light",
        ar: "بانر الفئة — كونسول ترافرتين",
      }}
      crumbs={[
        { label: d.common.home, href: routes.home(locale) },
        { label: d.nav.furniture },
      ]}
      scope={{ family: "furniture" }}
      openGroup={open}
    />
  );
}
