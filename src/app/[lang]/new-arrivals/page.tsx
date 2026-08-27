import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { ListingPage } from "@/components/commerce/ListingPage";
import { SITE_IMAGES } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.nav.new };
}

export default async function NewArrivalsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <ListingPage
      locale={locale}
      title={d.nav.new}
      intro={{
        en: "Everything released in the last two seasons, newest first. Pieces are added to a collection only when the collection is still open.",
        ar: "كل ما صدر في الموسمين الأخيرين، الأحدث أولاً. ولا تُضاف القطع إلى مجموعة إلا وهي ما تزال مفتوحة.",
      }}
      bannerSrc={SITE_IMAGES.newArrivalsBanner}
      bannerShot={{
        en: "new arrivals banner — studio shelf, latest pieces",
        ar: "بانر الوصول الحديث — رف الاستوديو، أحدث القطع",
      }}
      crumbs={[{ label: d.common.home, href: routes.home(locale) }, { label: d.nav.new }]}
      scope={{}}
      defaultSort="newest"
    />
  );
}
