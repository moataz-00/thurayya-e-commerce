import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { CUSTOMER, ORDERS } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { Diamond, Eyebrow } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.checkout.reviewTitle, robots: { index: false } };
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const order = ORDERS[0];
  const name = locale === "ar" ? CUSTOMER.nameAr : CUSTOMER.name;

  return (
    <PageShell>
      <section className="t-shell py-24 lg:py-28">
        <div className="mx-auto flex max-w-[720px] flex-col gap-5">
          <Eyebrow>{d.checkout.steps.review}</Eyebrow>
          <span aria-hidden className="my-2 h-[28px] w-[28px] rotate-45 border border-brass" />
          <h1 className="t-display text-[36px] sm:text-[48px]">
            {fill(d.checkout.thanks, { name })}
          </h1>
          <p className="max-w-[520px] text-[14px] leading-[1.9] text-body">
            {fill(d.checkout.confirmedBody, { ref: order.reference })}
          </p>

          <div className="mt-4 flex flex-wrap gap-3.5">
            <Link href={routes.track(locale)} className="t-btn t-btn--primary">
              {d.checkout.trackOrder}
            </Link>
            <Link href={routes.support(locale, "care")} className="t-btn t-btn--outline">
              {d.checkout.careGuide}
            </Link>
            <Link href={routes.consultation(locale)} className="t-btn t-btn--outline">
              {d.checkout.bookWalkthrough}
            </Link>
          </div>

          <ol className="m-0 mt-10 flex list-none flex-col gap-4 border-t border-ink/12 p-0 pt-8">
            {order.timeline.map((step) => (
              <li key={step.label.en} className="flex items-center gap-4 text-[13px]">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 flex-none rotate-45 border border-brass ${
                    step.done ? "bg-brass" : ""
                  }`}
                />
                <span className={step.done ? "text-ink" : "text-muted"}>{step.label[locale]}</span>
                <span className="ms-auto text-[11.5px] text-muted">{step.date[locale]}</span>
              </li>
            ))}
          </ol>

          <p className="mt-8 flex items-center gap-3 text-[11.5px] text-muted">
            <Diamond />
            {d.checkout.demoNote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
