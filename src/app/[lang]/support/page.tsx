import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { SUPPORT_ARTICLES } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.support.kicker, description: d.support.lede };
}

export default async function SupportIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <PageShell>
      <section className="t-shell pb-12 pt-10">
        <Breadcrumbs
          items={[{ label: d.common.home, href: routes.home(locale) }, { label: d.support.kicker }]}
        />
        <div className="mt-10 flex max-w-[680px] flex-col gap-5">
          <Eyebrow>{d.support.kicker}</Eyebrow>
          <h1 className="t-display text-[40px] leading-[1.04] sm:text-[54px]">{d.support.title}</h1>
          <p className="text-[14.5px] leading-[1.9] text-body">{d.support.lede}</p>
        </div>
      </section>

      <section className="t-shell grid gap-8 pb-28 sm:grid-cols-2 lg:grid-cols-3">
        {SUPPORT_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={routes.support(locale, article.slug)}
            className="flex flex-col gap-3 border-t border-brass/60 pt-5 text-inherit no-underline"
          >
            <span className="text-[25px]" style={{ fontFamily: "var(--font-display)" }}>
              {article.title[locale]}
            </span>
            <span className="text-[12.5px] leading-[1.85] text-body">{article.lede[locale]}</span>
          </Link>
        ))}
        <Link
          href={routes.track(locale)}
          className="flex flex-col gap-3 border-t border-brass/60 pt-5 text-inherit no-underline"
        >
          <span className="text-[25px]" style={{ fontFamily: "var(--font-display)" }}>
            {d.support.trackTitle}
          </span>
          <span className="text-[12.5px] leading-[1.85] text-body">{d.support.trackLede}</span>
        </Link>
      </section>
    </PageShell>
  );
}
