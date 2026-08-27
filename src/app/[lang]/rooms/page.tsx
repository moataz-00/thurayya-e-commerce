import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { ROOMS } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.room.indexTitle, description: d.room.indexLede };
}

export default async function RoomsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <PageShell>
      <section className="t-shell pb-12 pt-10">
        <Breadcrumbs
          items={[{ label: d.common.home, href: routes.home(locale) }, { label: d.nav.rooms }]}
        />
        <div className="mt-10 flex max-w-[680px] flex-col gap-5">
          <Eyebrow>{d.room.kicker}</Eyebrow>
          <h1 className="t-display text-[40px] leading-[1.04] sm:text-[56px]">
            {d.room.indexTitle}
          </h1>
          <p className="text-[14.5px] leading-[1.9] text-body">{d.room.indexLede}</p>
        </div>
      </section>

      <section className="t-shell grid gap-5 pb-28 sm:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((room) => (
          <Link
            key={room.slug}
            href={routes.room(locale, room.slug)}
            className="relative block aspect-16/11 overflow-hidden bg-surface-3 text-ivory no-underline"
          >
            <ShotSlot label={room.tileShot} tone={3} showLabel={false} />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgb(22 24 25 / 0.62), transparent 60%)" }}
            />
            <span
              className="absolute bottom-6 start-6 text-[25px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {room.name[locale]}
            </span>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
