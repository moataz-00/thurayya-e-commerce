import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { COLLECTIONS } from "@/lib/mock";
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
  return { title: d.nav.collections, description: d.collection.indexLede };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <PageShell>
      <section className="t-shell pb-14 pt-10">
        <Breadcrumbs
          items={[
            { label: d.common.home, href: routes.home(locale) },
            { label: d.nav.collections },
          ]}
        />
        <div className="mt-10 flex max-w-[720px] flex-col gap-5">
          <Eyebrow>{d.collection.indexKicker}</Eyebrow>
          <h1 className="t-display text-[40px] leading-[1.04] sm:text-[56px]">
            {d.collection.indexTitle}
          </h1>
          <p className="text-[14.5px] leading-[1.9] text-body">{d.collection.indexLede}</p>
        </div>
      </section>

      <section className="t-shell grid gap-10 pb-28 md:grid-cols-2">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={routes.collection(locale, collection.slug)}
            className="group flex flex-col gap-5 text-inherit no-underline"
          >
            <div
              className={`relative aspect-16/11 overflow-hidden ${
                collection.accent === "emerald" ? "bg-emerald" : "bg-onyx"
              }`}
            >
              <div className="absolute inset-0 opacity-[0.55]">
                <ShotSlot dark showLabel={false} label={collection.heroShot} src={collection.heroSrc} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="t-glow left-[55%] top-[-30%] h-[420px] w-[420px]" />
              <div className="absolute inset-x-8 bottom-8 flex flex-col gap-2 text-ivory">
                <span className="t-label text-brass">{collection.kicker[locale]}</span>
                <span className="text-[28px]" style={{ fontFamily: "var(--font-display)" }}>
                  {collection.name[locale]}
                </span>
              </div>
            </div>
            <p className="max-w-[480px] text-[13.5px] leading-[1.9] text-body">
              {collection.lede[locale]}
            </p>
            <span className="t-link self-start">{d.common.explore}</span>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
