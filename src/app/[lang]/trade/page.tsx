import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { TRADE_BENEFITS, TRADE_DOWNLOADS } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { TradeApplicationForm } from "@/components/forms/ProjectForms";
import { Eyebrow } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.trade.kicker, description: d.trade.lede };
}

export default async function TradePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <PageShell>
      {/* ============================================================== hero */}
      <section className="bg-emerald text-ivory">
        <div className="t-shell grid items-center gap-12 py-20 lg:grid-cols-[1fr_420px] lg:gap-18 lg:py-24">
          <div className="flex flex-col gap-5">
            <Eyebrow>{d.trade.kicker}</Eyebrow>
            <h1 className="t-display text-[38px] leading-[1.04] sm:text-[52px] lg:text-[62px]">
              {d.trade.title}
            </h1>
            <p className="max-w-[520px] text-[15px] leading-[1.9] text-ivory/75">{d.trade.lede}</p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <a href="#trade-application" className="t-btn t-btn--brass">
                {d.common.applyForTrade}
              </a>
              <Link href={routes.consultation(locale)} className="t-btn t-btn--ghost">
                {d.trade.requestMeeting}
              </Link>
            </div>
          </div>
          <div className="aspect-4/3 bg-ivory/10">
            <ShotSlot
              dark
              label={{
                en: "trade — finish samples and drawings on a table",
                ar: "المحترفون — عينات تشطيب ورسومات على طاولة",
              }}
            />
          </div>
        </div>
      </section>

      {/* ========================================================== benefits */}
      <section className="t-shell py-20 lg:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TRADE_BENEFITS.map((benefit) => (
            <div key={benefit.title.en} className="flex flex-col gap-3 border-t border-brass/60 pt-5">
              <span className="text-[25px]" style={{ fontFamily: "var(--font-display)" }}>
                {benefit.title[locale]}
              </span>
              <span className="text-[12.5px] leading-[1.85] text-body">
                {benefit.body[locale]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =============================================== application + files */}
      <section
        id="trade-application"
        className="t-shell grid items-start gap-14 pb-28 lg:grid-cols-2 lg:gap-18"
      >
        <TradeApplicationForm />

        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-4">
            <Eyebrow>{d.trade.downloads}</Eyebrow>
            <div className="flex flex-col">
              {TRADE_DOWNLOADS.map((item) => (
                <div
                  key={item.title.en}
                  className="flex items-center justify-between gap-4 border-b border-ink/12 py-4 text-[13px]"
                >
                  {item.title[locale]}
                  <span
                    className="text-[10px] text-brass"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="aspect-square bg-surface-2">
              <ShotSlot
                tone={2}
                label={{ en: "hospitality project — 42 fixtures", ar: "مشروع ضيافة — ٤٢ وحدة" }}
              />
            </div>
            <div className="aspect-square bg-surface-3">
              <ShotSlot
                tone={3}
                label={{
                  en: "developer show unit — Sheikh Zayed",
                  ar: "وحدة عرض لمطوّر — الشيخ زايد",
                }}
              />
            </div>
          </div>

          <figure className="m-0 flex flex-col gap-3 border-t border-ink/14 pt-6">
            <blockquote
              className="m-0 text-[21px] italic leading-[1.5] sm:text-[23px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {locale === "ar"
                ? "«عروض أسعار في يوم، وملفات IES تطابق الواقع، ومدد تنفيذ نستطيع أن نبني عليها موعد التسليم.»"
                : "“Quotations in a day, IES files that match reality, and lead times we could hold a handover date to.”"}
            </blockquote>
            <figcaption className="text-[10.5px] uppercase tracking-[0.14em] text-muted">
              {locale === "ar"
                ? "مسؤول المشتريات — مجموعة ضيافة، دبي"
                : "Procurement Lead — Hospitality Group, Dubai"}
            </figcaption>
          </figure>
        </div>
      </section>
    </PageShell>
  );
}
