import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { JOURNAL_CATEGORIES, POSTS, postsByCategory } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { Eyebrow } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.journal.kicker, description: d.journal.title };
}

export default async function JournalPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  const { category } = await searchParams;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  const active = category ?? "all";
  const posts = postsByCategory(active);
  const featured = posts.find((p) => p.featured) ?? posts[0] ?? POSTS[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <PageShell>
      <section className="t-shell pt-14">
        <div className="flex max-w-[640px] flex-col gap-5">
          <Eyebrow>{d.journal.kicker}</Eyebrow>
          <h1 className="t-display text-[38px] leading-[1.04] sm:text-[52px] lg:text-[60px]">
            {d.journal.title}
          </h1>
        </div>

        <nav
          aria-label={d.journal.kicker}
          className="mt-11 flex flex-wrap gap-6 border-b border-ink/12 pb-5 text-[11px] uppercase tracking-[0.14em]"
        >
          <Link
            href={routes.journal(locale)}
            className={`no-underline ${
              active === "all" ? "border-b border-brass pb-1.5 text-ink" : "text-muted"
            }`}
          >
            {d.journal.all}
          </Link>
          {JOURNAL_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`${routes.journal(locale)}?category=${c.slug}`}
              className={`no-underline ${
                active === c.slug ? "border-b border-brass pb-1.5 text-ink" : "text-muted"
              }`}
            >
              {c.label[locale]}
            </Link>
          ))}
        </nav>
      </section>

      <section className="t-shell grid items-start gap-14 pt-12 lg:grid-cols-[1.3fr_1fr]">
        {featured ? (
          <Link
            href={routes.post(locale, featured.slug)}
            className="flex flex-col gap-5 text-inherit no-underline"
          >
            <div className="aspect-16/10 bg-surface-3">
              <ShotSlot tone={3} label={featured.heroShot} src={featured.heroSrc} priority sizes="(max-width: 1024px) 100vw, 55vw" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-brass">
              {featured.category[locale]} · {featured.readingTime[locale]} · {featured.date[locale]}
            </span>
            <h2 className="t-display max-w-[600px] text-[32px] leading-[1.1] sm:text-[44px]">
              {featured.title[locale]}
            </h2>
            <p className="max-w-[560px] text-[14.5px] leading-[1.9] text-body">
              {featured.excerpt[locale]}
            </p>
          </Link>
        ) : null}

        <div className="flex flex-col gap-7">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={routes.post(locale, post.slug)}
              className="grid grid-cols-[110px_1fr] items-start gap-5 border-t border-ink/12 pt-5 text-inherit no-underline sm:grid-cols-[132px_1fr]"
            >
              <div className="aspect-4/3 bg-surface-2">
                <ShotSlot tone={2} showLabel={false} label={post.heroShot} src={post.heroSrc} sizes="140px" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9.5px] uppercase tracking-[0.16em] text-brass">
                  {post.category[locale]} · {post.readingTime[locale]}
                </span>
                <span className="text-[19px] leading-[1.3] sm:text-[21px]" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title[locale]}
                </span>
                <span className="text-[11px] text-muted">{post.date[locale]}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-28" />
    </PageShell>
  );
}
