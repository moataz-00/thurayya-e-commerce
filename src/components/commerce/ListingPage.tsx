import Link from "next/link";
import type { Locale, Localized } from "@/lib/types";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import type { ListOptions, SortKey } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { Breadcrumbs } from "@/components/ui/primitives";
import { ProductListing } from "./ProductListing";

/**
 * The PLP frame. `lighting`, `furniture`, each category and New Arrivals all
 * render through here so the banner, breadcrumb and filter behaviour stay
 * identical across every listing route.
 */
export function ListingPage({
  locale,
  title,
  intro,
  bannerShot,
  bannerSrc,
  crumbs,
  scope,
  openGroup,
  defaultSort,
}: {
  locale: Locale;
  title: string;
  intro: Localized | string;
  bannerShot: Localized | string;
  bannerSrc?: string;
  crumbs: { label: string; href?: string }[];
  scope: ListOptions;
  openGroup?: string;
  defaultSort?: SortKey;
}) {
  const d = getDictionary(locale);
  const introText = typeof intro === "string" ? intro : intro[locale];

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-onyx text-ivory">
        <div className="absolute inset-0 opacity-[0.4]">
          <ShotSlot dark showLabel={false} label={bannerShot} src={bannerSrc} priority sizes="100vw" />
        </div>
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgb(22 24 25 / 0.55), rgb(22 24 25 / 0.75))" }}
        />
        <div className="t-shell relative pb-16 pt-8 lg:pb-19">
          <div className="mb-12 lg:mb-15">
            <Breadcrumbs dark items={crumbs} />
          </div>
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_380px] lg:gap-18">
            <div className="flex flex-col gap-5">
              <h1 className="t-display text-[40px] leading-[1.02] sm:text-[52px] lg:text-[64px]">
                {title}
              </h1>
              <p className="max-w-[540px] text-[14.5px] leading-[1.9] text-ivory/70">{introText}</p>
            </div>
            <div className="flex flex-col gap-3 border-s border-brass/50 ps-6 text-[11.5px] leading-[1.9] text-ivory/60">
              <span>{d.plp.leadTime}</span>
              <span>{d.plp.freePlan}</span>
              <Link
                href={routes.consultation(locale)}
                className="self-start border-b border-brass/40 pb-1 text-brass no-underline"
              >
                {d.plp.speakToDesigner}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductListing scope={scope} openGroup={openGroup} defaultSort={defaultSort} />
    </PageShell>
  );
}
