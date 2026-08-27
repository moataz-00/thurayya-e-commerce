import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Localized } from "@/lib/types";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { POSTS, getPost, getProducts } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Breadcrumbs, Eyebrow, SectionHead } from "@/components/ui/primitives";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => POSTS.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    openGraph: { type: "article", publishedTime: post.isoDate },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const products = getProducts(post.productSlugs);
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="mx-auto w-full max-w-[820px] px-5 pt-10 lg:px-10">
        <Breadcrumbs
          items={[
            { label: d.common.home, href: routes.home(locale) },
            { label: d.journal.kicker, href: routes.journal(locale) },
            { label: post.category[locale] },
          ]}
        />

        <header className="mt-10 flex flex-col gap-5">
          <Eyebrow>{post.category[locale]}</Eyebrow>
          <h1 className="t-display text-[34px] leading-[1.1] sm:text-[46px]">
            {post.title[locale]}
          </h1>
          <div className="flex flex-wrap gap-4 border-b border-ink/12 pb-7 text-[11px] uppercase tracking-[0.12em] text-muted">
            <span>
              {d.journal.by} {post.author[locale]}
            </span>
            <span aria-hidden>·</span>
            <span>
              {post.readingTime[locale]} {d.journal.readingTime}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.isoDate}>{post.date[locale]}</time>
          </div>
        </header>

        <div className="aspect-16/10 bg-surface-3" style={{ margin: "34px 0" }}>
          <ShotSlot tone={3} label={post.heroShot} src={post.heroSrc} priority sizes="(max-width: 900px) 100vw, 820px" />
        </div>

        <p
          className="my-8 text-[22px] leading-[1.6] text-ink sm:text-[25px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.standfirst[locale]}
        </p>

        <div className="t-prose">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="t-display text-[26px] sm:text-[32px]">
                  {(block.value as Localized)[locale]}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-10 border-s-2 border-brass ps-6 text-[21px] italic leading-[1.55] text-ink sm:text-[24px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {(block.value as Localized)[locale]}
                </blockquote>
              );
            }
            if (block.type === "shot") {
              return (
                <div key={i} className="my-10 aspect-16/9 bg-surface-2">
                  <ShotSlot tone={2} label={block.value as Localized} src={block.src} sizes="(max-width: 900px) 100vw, 820px" />
                </div>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i}>
                  {(block.value as Localized[]).map((item) => (
                    <li key={item.en}>{item[locale]}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{(block.value as Localized)[locale]}</p>;
          })}
        </div>

        {products.length > 0 ? (
          <section className="mt-14 border-t border-ink/12 pt-8">
            <Eyebrow>{d.journal.piecesInArticle}</Eyebrow>
            <div className="mt-6">
              <ProductGrid products={products} columns={3} compact />
            </div>
          </section>
        ) : null}
      </article>

      <section className="t-shell pb-28 pt-24">
        <SectionHead
          title={d.journal.moreReading}
          size="sm"
          rule
          action={
            <Link href={routes.journal(locale)} className="t-link">
              {d.journal.backToJournal}
            </Link>
          }
        />
        <div className="grid gap-7 md:grid-cols-3">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={routes.post(locale, p.slug)}
              className="flex flex-col gap-4 text-inherit no-underline"
            >
              <div className="aspect-3/2 bg-surface-2">
                <ShotSlot tone={2} label={p.heroShot} src={p.heroSrc} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-brass">
                {p.category[locale]} · {p.readingTime[locale]}
              </span>
              <span
                className="max-w-[380px] text-[22px] leading-[1.25]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title[locale]}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
