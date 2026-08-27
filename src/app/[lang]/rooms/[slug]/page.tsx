import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { POSTS, ROOMS, getProducts, getRoom } from "@/lib/mock";
import { formatMoney } from "@/lib/format";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { AddRoomToBag } from "@/components/commerce/AddRoomToBag";
import { Eyebrow, SectionHead } from "@/components/ui/primitives";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => ROOMS.map((r) => ({ lang, slug: r.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const room = getRoom(slug);
  if (!room) return {};
  return { title: room.name[locale], description: room.lede[locale] };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const room = getRoom(slug);
  if (!room) notFound();

  const products = getProducts(room.productSlugs);
  const total = products.reduce((sum, p) => sum + p.price, 0);
  const related = POSTS.slice(0, 2);

  return (
    <PageShell>
      {/* ============================================================== hero */}
      <section className="relative h-[440px] overflow-hidden bg-surface-3 lg:h-[640px]">
        <ShotSlot label={room.heroShot} tone={3} showLabel={false} />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgb(22 24 25 / 0.6), transparent 55%)" }}
        />
        <div className="absolute inset-x-5 bottom-10 flex max-w-[620px] flex-col gap-4 text-ivory lg:inset-x-10">
          <Eyebrow>{d.room.kicker}</Eyebrow>
          <h1 className="t-display text-[36px] leading-[1.04] sm:text-[48px] lg:text-[62px]">
            {room.name[locale]}
          </h1>
          <p className="max-w-[480px] text-[14px] leading-[1.85] text-ivory/80 sm:text-[15px]">
            {room.lede[locale]}
          </p>
        </div>

        {room.hotspots.map((spot) => (
          <Link
            key={spot.slug}
            href={routes.product(locale, spot.slug)}
            aria-label={spot.slug}
            className="absolute flex h-[30px] w-[30px] items-center justify-center rounded-full border border-ivory bg-onyx/35 text-[12px] text-ivory no-underline hover:border-brass hover:bg-brass hover:text-onyx"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            +
          </Link>
        ))}
      </section>

      {/* ====================================================== shop the look */}
      <section className="t-shell grid items-start gap-12 py-20 lg:grid-cols-[1fr_320px] lg:gap-18">
        <div>
          <SectionHead
            title={d.room.shopLook}
            size="md"
            action={
              <span className="text-[11.5px] text-muted">
                {products.length} {d.common.pieces} · {formatMoney(total, "EGP", locale)}{" "}
                {d.room.totalLabel}
              </span>
            }
          />
          <ProductGrid products={products} columns={4} compact />
          <AddRoomToBag products={products} />
        </div>

        <aside className="t-panel flex flex-col gap-6 p-8">
          <Eyebrow>{d.room.tips}</Eyebrow>
          <div className="flex flex-col gap-4.5 text-[13px] leading-[1.85] text-body">
            {room.tips.map((tip) => (
              <span key={tip.en}>{tip[locale]}</span>
            ))}
          </div>
          <hr className="t-rule" />
          <div className="flex flex-col gap-3">
            <Eyebrow>{d.room.relatedReading}</Eyebrow>
            {related.map((post) => (
              <Link
                key={post.slug}
                href={routes.post(locale, post.slug)}
                className="text-[19px] leading-[1.35] text-ink no-underline hover:text-brass"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {post.title[locale]}
              </Link>
            ))}
          </div>
        </aside>
      </section>

      {/* ======================================================= other rooms */}
      <section className="t-shell pb-28">
        <SectionHead title={d.room.otherRooms} size="md" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.filter((r) => r.slug !== room.slug)
            .slice(0, 6)
            .map((other) => (
              <Link
                key={other.slug}
                href={routes.room(locale, other.slug)}
                className="relative block aspect-16/11 overflow-hidden bg-surface-3 text-ivory no-underline"
              >
                <ShotSlot label={other.tileShot} tone={3} showLabel={false} />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgb(22 24 25 / 0.6), transparent 60%)",
                  }}
                />
                <span
                  className="absolute bottom-5 start-5 text-[25px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {other.name[locale]}
                </span>
              </Link>
            ))}
        </div>
      </section>
    </PageShell>
  );
}
