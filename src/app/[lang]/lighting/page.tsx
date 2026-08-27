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
  return { title: d.nav.lighting };
}

export default async function LightingPage({
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
      title={d.nav.lighting}
      intro={{
        en: "Sculptural light for every layer of a room — suspended, wall-mounted, standing and outdoor. Every fixture is made in the Cairo atelier and can be re-engineered for your ceiling.",
        ar: "إضاءة نحتية لكل طبقة في الغرفة — معلقة وحائطية وأرضية وخارجية. كل وحدة تُصنع في أتيليه القاهرة ويمكن إعادة هندستها لسقفك.",
      }}
      bannerShot={{
        en: "category banner — chandelier gallery wall, 2400x760",
        ar: "بانر الفئة — جدار عرض الثريات",
      }}
      crumbs={[
        { label: d.common.home, href: routes.home(locale) },
        { label: d.nav.lighting },
      ]}
      scope={{ family: "lighting" }}
      openGroup={open}
    />
  );
}
