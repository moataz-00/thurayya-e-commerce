import Link from "next/link";
import type { Locale, SupportArticle } from "@/lib/types";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { PageShell } from "./PageShell";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";

/**
 * Long-form policy and support copy — one column, generous measure, no images.
 * Shared by /support/[slug] and /legal/[slug].
 */
export function DocumentPage({
  locale,
  article,
  kicker,
  crumbs,
  showUpdated = false,
}: {
  locale: Locale;
  article: SupportArticle;
  kicker: string;
  crumbs: { label: string; href?: string }[];
  showUpdated?: boolean;
}) {
  const d = getDictionary(locale);

  return (
    <PageShell>
      <article className="mx-auto w-full max-w-[820px] px-5 pb-28 pt-10 lg:px-10">
        <Breadcrumbs items={crumbs} />

        <header className="mt-10 flex flex-col gap-5 border-b border-ink/12 pb-10">
          <Eyebrow>{kicker}</Eyebrow>
          <h1 className="t-display text-[34px] leading-[1.06] sm:text-[46px]">
            {article.title[locale]}
          </h1>
          <p className="max-w-[600px] text-[14.5px] leading-[1.9] text-body">
            {article.lede[locale]}
          </p>
          {showUpdated ? (
            <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
              {d.legal.updated}
            </span>
          ) : null}
        </header>

        <div className="t-prose mt-10">
          {article.sections.map((section) => (
            <section key={section.heading.en} className="mb-10">
              <h2 className="t-display text-[24px] sm:text-[30px]">{section.heading[locale]}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph[locale]}</p>
              ))}
            </section>
          ))}
        </div>

        {article.faqs && article.faqs.length > 0 ? (
          <section className="mt-6 border-t border-ink/12 pt-8">
            <h2 className="t-display mb-6 text-[24px] sm:text-[30px]">{d.support.faqTitle}</h2>
            <dl className="m-0 flex flex-col">
              {article.faqs.map((faq) => (
                <div key={faq.q.en} className="flex flex-col gap-2.5 border-b border-ink/10 py-5">
                  <dt className="text-[14px]">{faq.q[locale]}</dt>
                  <dd className="m-0 text-[13px] leading-[1.9] text-body">{faq.a[locale]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-3.5 border-t border-ink/12 pt-8">
          <Link href={routes.showrooms(locale)} className="t-btn t-btn--outline">
            {d.support.contactCta}
          </Link>
          <Link href={routes.consultation(locale)} className="t-btn t-btn--outline">
            {d.common.bookConsultation}
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
