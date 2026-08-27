import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { SHOWROOMS, SUPPORT_ARTICLES } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { ContactForm } from "@/components/forms/ProjectForms";
import { Breadcrumbs, Eyebrow, SectionHead } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.showrooms.kicker, description: d.showrooms.lede };
}

export default async function ShowroomsPage({
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
          items={[
            { label: d.common.home, href: routes.home(locale) },
            { label: d.showrooms.kicker },
          ]}
        />
        <div className="mt-10 flex max-w-[680px] flex-col gap-5">
          <Eyebrow>{d.showrooms.kicker}</Eyebrow>
          <h1 className="t-display text-[40px] leading-[1.04] sm:text-[54px]">
            {d.showrooms.title}
          </h1>
          <p className="text-[14.5px] leading-[1.9] text-body">{d.showrooms.lede}</p>
        </div>
      </section>

      <section className="t-shell grid gap-8 pb-20 lg:grid-cols-3">
        {SHOWROOMS.map((showroom) => (
          <div key={showroom.slug} className="flex flex-col gap-4">
            <div className="aspect-4/3 bg-surface-3">
              <ShotSlot tone={3} label={showroom.shot} />
            </div>
            <span className="text-[24px]" style={{ fontFamily: "var(--font-display)" }}>
              {showroom.city[locale]}
            </span>
            <p className="text-[13px] leading-[1.8] text-body">{showroom.address[locale]}</p>
            <dl className="m-0 flex flex-col gap-2 text-[12.5px]">
              <div className="flex gap-3">
                <dt className="t-label w-[70px] flex-none">{d.showrooms.hours}</dt>
                <dd className="m-0 text-body">{showroom.hours[locale]}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="t-label w-[70px] flex-none">{d.showrooms.call}</dt>
                <dd className="m-0 text-body">{showroom.phone}</dd>
              </div>
            </dl>
            <p className="text-[12.5px] leading-[1.8] text-muted">{showroom.note[locale]}</p>
            <Link href={routes.consultation(locale)} className="t-link self-start">
              {d.showrooms.bookVisit}
            </Link>
          </div>
        ))}
      </section>

      <section className="t-shell grid items-start gap-14 pb-28 lg:grid-cols-2 lg:gap-18">
        <div className="flex flex-col gap-5">
          <SectionHead size="sm" title={d.showrooms.contactTitle} className="mb-0" />
          <p className="max-w-[440px] text-[14px] leading-[1.9] text-body">
            {d.showrooms.contactLede}
          </p>
          <ContactForm />
        </div>
        <div className="t-panel flex flex-col gap-4 p-8">
          <Eyebrow>{d.support.kicker}</Eyebrow>
          <p className="text-[13px] leading-[1.85] text-body">{d.support.lede}</p>
          <div className="mt-2 flex flex-col gap-2.5">
            {SUPPORT_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={routes.support(locale, article.slug)}
                className="border-b border-ink/10 pb-2.5 text-[13px] text-ink no-underline hover:text-brass"
              >
                {article.title[locale]}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
