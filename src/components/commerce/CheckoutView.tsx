"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes } from "@/lib/routes";
import { computeTotals } from "@/lib/format";
import { fill } from "@/lib/i18n/dictionary";
import { CUSTOMER, getProduct } from "@/lib/mock";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { CheckRow, RadioRow, TextField } from "@/components/ui/form";
import { Money, useMoney } from "@/components/ui/Money";
import { Wordmark } from "@/components/ui/primitives";

type StepId = 1 | 2 | 3 | 4;

const DELIVERY_WINDOWS = [
  { en: "Wed 21 Oct · morning", ar: "الأربعاء ٢١ أكتوبر · صباحاً" },
  { en: "Thu 22 Oct · afternoon", ar: "الخميس ٢٢ أكتوبر · بعد الظهر" },
  { en: "Sat 24 Oct · morning", ar: "السبت ٢٤ أكتوبر · صباحاً" },
];

const PAYMENT_METHODS = [
  { id: "card", en: "Card", ar: "بطاقة" },
  { id: "valu", en: "Valu · 6 instalments", ar: "فاليو · ٦ أقساط" },
  { id: "transfer", en: "Bank transfer", ar: "تحويل بنكي" },
  { id: "apple", en: "Apple Pay", ar: "Apple Pay" },
  { id: "cod", en: "Cash on delivery — Egypt only", ar: "الدفع عند الاستلام — مصر فقط" },
];

export function CheckoutView() {
  const { locale, d, t } = useLocale();
  const router = useRouter();
  const money = useMoney();
  const { bag, bagSubtotal, giftWrap, promoRate, hydrated, clearBag } = useStore();

  const [step, setStep] = useState<StepId>(2);
  const [whiteGlove, setWhiteGlove] = useState(true);
  const [windowIndex, setWindowIndex] = useState(0);
  const [payment, setPayment] = useState("card");
  const [postal, setPostal] = useState("");
  const [postalTouched, setPostalTouched] = useState(false);
  const [sameBilling, setSameBilling] = useState(true);
  const [companyInvoice, setCompanyInvoice] = useState(false);
  const [guest, setGuest] = useState(false);

  const totals = computeTotals({
    subtotal: bagSubtotal,
    giftWrap,
    delivery: whiteGlove ? 3500 : 1900,
    discountRate: promoRate,
  });

  const postalError = postalTouched && postal.trim() === "" ? d.checkout.postalError : undefined;

  const placeOrder = () => {
    clearBag();
    router.push(routes.confirmation(locale));
  };

  return (
    <div className="t-screen min-h-screen bg-ivory">
      {/* --------------------------------------------------------- step bar */}
      <div className="border-b border-ink/12">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-5 py-6 lg:px-10">
          <Link href={routes.home(locale)} className="text-ink no-underline">
            <Wordmark size="md" />
          </Link>
          <nav aria-label={d.checkout.reviewTitle} className="flex flex-wrap gap-6 sm:gap-8">
            {([1, 2, 3, 4] as StepId[]).map((n) => {
              const labels = [
                d.checkout.steps.bag,
                d.checkout.steps.delivery,
                d.checkout.steps.payment,
                d.checkout.steps.review,
              ];
              const active = step === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setStep(n)}
                  aria-current={active ? "step" : undefined}
                  className={`flex cursor-pointer items-center gap-2.5 border-0 border-b bg-transparent px-0 pb-3.5 text-[11px] uppercase tracking-[0.16em] ${
                    active ? "border-brass text-ink" : "border-transparent text-muted"
                  }`}
                >
                  <span style={{ fontFamily: "var(--font-mono)" }}>0{n}</span>
                  {labels[n - 1]}
                </button>
              );
            })}
          </nav>
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
            {d.checkout.secure}
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1240px] items-start gap-14 px-5 pb-28 pt-12 lg:grid-cols-[1fr_380px] lg:gap-16 lg:px-10 xl:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-12">
          {/* ------------------------------------------------------ step 01 */}
          {step === 1 ? (
            <section className="flex flex-col gap-5">
              <h2 className="t-display text-[28px] sm:text-[32px]">{d.checkout.steps.bag}</h2>
              {hydrated && bag.length > 0 ? (
                <div className="flex flex-col">
                  {bag.map((line) => {
                    const product = getProduct(line.slug);
                    return (
                      <div
                        key={line.key}
                        className="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-ink/10 py-4"
                      >
                        <div className="aspect-4/5 bg-surface-2">
                          <ShotSlot showLabel={false} tone={2} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[14px]">
                            {product ? t(product.title) : line.slug}
                          </span>
                          <span className="text-[11px] text-muted">
                            {t(line.variant)} · ×{line.qty}
                          </span>
                        </div>
                        <Money amount={line.unitPrice * line.qty} className="text-[13px]" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[13px] text-muted">{d.cart.emptyBody}</p>
              )}
              <div className="flex flex-wrap gap-3.5">
                <Link href={routes.cart(locale)} className="t-btn t-btn--outline">
                  {d.checkout.backToBag}
                </Link>
                <button type="button" onClick={() => setStep(2)} className="t-btn t-btn--primary">
                  {d.common.continue}
                </button>
              </div>
            </section>
          ) : null}

          {/* ------------------------------------------------------ step 02 */}
          {step === 2 ? (
            <>
              <section className="flex flex-col gap-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="t-display text-[28px] sm:text-[32px]">{d.checkout.contact}</h2>
                  <span className="text-[11.5px] text-muted">
                    {d.checkout.haveAccount}{" "}
                    <Link href={routes.signIn(locale)} className="text-brass no-underline">
                      {d.checkout.signIn}
                    </Link>
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextField label={d.common.email} defaultValue={CUSTOMER.email} type="email" />
                  <TextField label={d.common.phone} defaultValue={CUSTOMER.phone} type="tel" />
                </div>
                <CheckRow checked={guest} onChange={setGuest}>
                  {d.checkout.guest}
                </CheckRow>
              </section>

              <section className="flex flex-col gap-5">
                <h2 className="t-display text-[28px] sm:text-[32px]">{d.checkout.address}</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextField label={d.common.firstName} defaultValue="Layla" />
                  <TextField label={d.common.lastName} defaultValue="Hassan" />
                  <TextField
                    className="sm:col-span-2"
                    label={d.checkout.addressLine}
                    defaultValue="14 Shagaret El Dorr, Zamalek"
                  />
                  <TextField label={d.checkout.city} defaultValue="Cairo" />
                  <TextField
                    label={d.checkout.postal}
                    value={postal}
                    error={postalError}
                    onChange={(e) => setPostal(e.target.value)}
                    onBlur={() => setPostalTouched(true)}
                  />
                </div>
                <CheckRow checked={sameBilling} onChange={setSameBilling}>
                  {d.checkout.sameBilling}
                </CheckRow>
                <CheckRow checked={companyInvoice} onChange={setCompanyInvoice}>
                  {d.checkout.companyInvoice}
                </CheckRow>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="t-display text-[28px] sm:text-[32px]">{d.checkout.method}</h2>
                <div
                  className={`border p-5 ${whiteGlove ? "border-ink" : "border-ink/20"}`}
                >
                  <RadioRow checked={whiteGlove} onChange={() => setWhiteGlove(true)}>
                    <span className="flex flex-wrap items-center justify-between gap-4">
                      <span className="flex flex-col gap-1.5">
                        <span className="text-[13.5px]">{d.checkout.whiteGlove}</span>
                        <span className="text-[12px] text-muted">{d.checkout.whiteGloveNote}</span>
                      </span>
                      <Money amount={3500} className="text-[13px]" />
                    </span>
                  </RadioRow>
                </div>
                <div className={`border p-5 ${!whiteGlove ? "border-ink" : "border-ink/20"}`}>
                  <RadioRow checked={!whiteGlove} onChange={() => setWhiteGlove(false)}>
                    <span className="flex flex-wrap items-center justify-between gap-4">
                      <span className="flex flex-col gap-1.5">
                        <span className="text-[13.5px]">{d.checkout.courier}</span>
                        <span className="text-[12px] text-muted">{d.checkout.courierNote}</span>
                      </span>
                      <Money amount={1900} className="text-[13px]" />
                    </span>
                  </RadioRow>
                </div>
                <div className="mt-1.5 flex flex-col gap-2.5">
                  <span className="t-label">{d.checkout.window}</span>
                  <div className="flex flex-wrap gap-2.5">
                    {DELIVERY_WINDOWS.map((w, i) => (
                      <button
                        key={w.en}
                        type="button"
                        onClick={() => setWindowIndex(i)}
                        aria-pressed={windowIndex === i}
                        className={`cursor-pointer border px-4.5 py-3 text-[12px] ${
                          windowIndex === i
                            ? "border-brass bg-brass/12 text-ink"
                            : "border-ink/20 bg-transparent text-body"
                        }`}
                      >
                        {t(w)}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="t-btn t-btn--primary mt-3 self-start"
                >
                  {d.common.continue}
                </button>
              </section>
            </>
          ) : null}

          {/* ------------------------------------------------------ step 03 */}
          {step === 3 ? (
            <section className="flex flex-col gap-4">
              <h2 className="t-display text-[28px] sm:text-[32px]">{d.checkout.payment}</h2>
              <div className="flex flex-wrap gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayment(m.id)}
                    aria-pressed={payment === m.id}
                    className={`cursor-pointer border px-5 py-3 text-[11.5px] ${
                      payment === m.id ? "border-ink text-ink" : "border-ink/20 text-body"
                    }`}
                  >
                    {t(m)}
                  </button>
                ))}
              </div>

              {payment === "card" ? (
                <div className="mt-2 grid gap-6 sm:grid-cols-[2fr_1fr_1fr]">
                  <TextField label={d.checkout.cardNumber} placeholder="0000 0000 0000 0000" inputMode="numeric" />
                  <TextField label={d.checkout.expiry} placeholder="MM / YY" />
                  <TextField label={d.checkout.cvc} placeholder="000" inputMode="numeric" />
                </div>
              ) : (
                <p className="mt-2 max-w-[520px] text-[12.5px] leading-relaxed text-body">
                  {d.checkout.demoNote}
                </p>
              )}

              <div className="mt-2 flex flex-col gap-2.5">
                <label className="t-label" htmlFor="gift-message">
                  {d.checkout.giftMessage}
                </label>
                <textarea
                  id="gift-message"
                  placeholder={d.checkout.giftPlaceholder}
                  className="t-textarea min-h-[80px]"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="t-btn t-btn--primary mt-3 self-start"
              >
                {d.common.continue}
              </button>
              <p className="max-w-[440px] text-[11.5px] leading-relaxed text-muted">
                {d.checkout.payNote}
              </p>
            </section>
          ) : null}

          {/* ------------------------------------------------------ step 04 */}
          {step === 4 ? (
            <section className="flex flex-col gap-6">
              <h2 className="t-display text-[28px] sm:text-[32px]">{d.checkout.reviewTitle}</h2>
              <dl className="m-0 grid gap-4 sm:grid-cols-2">
                <ReviewRow label={d.checkout.contact} value={`${CUSTOMER.email} · ${CUSTOMER.phone}`} />
                <ReviewRow
                  label={d.checkout.address}
                  value="Layla Hassan, 14 Shagaret El Dorr, Zamalek, Cairo"
                />
                <ReviewRow
                  label={d.checkout.method}
                  value={whiteGlove ? d.checkout.whiteGlove : d.checkout.courier}
                />
                <ReviewRow label={d.checkout.window} value={t(DELIVERY_WINDOWS[windowIndex])} />
                <ReviewRow
                  label={d.checkout.payment}
                  value={t(PAYMENT_METHODS.find((m) => m.id === payment) ?? PAYMENT_METHODS[0])}
                />
                <ReviewRow label={d.common.total} value={money(totals.total)} />
              </dl>
              <button type="button" onClick={placeOrder} className="t-btn t-btn--primary self-start py-5">
                {fill(d.checkout.pay, { amount: money(totals.total) })}
              </button>
              <p className="max-w-[520px] text-[11.5px] leading-relaxed text-muted">
                {d.checkout.demoNote}
              </p>
            </section>
          ) : null}
        </div>

        {/* ---------------------------------------------------------- summary */}
        <aside className="flex flex-col gap-5 bg-onyx p-8 text-ivory lg:sticky lg:top-6">
          <span className="t-label text-brass">{d.common.summary}</span>
          {hydrated
            ? bag.map((line) => {
                const product = getProduct(line.slug);
                return (
                  <div
                    key={line.key}
                    className="grid grid-cols-[58px_1fr_auto] items-center gap-4 border-b border-ivory/10 pb-4"
                  >
                    <div className="aspect-4/5 bg-ivory/10">
                      <ShotSlot dark showLabel={false} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[12.5px]">{product ? t(product.title) : line.slug}</span>
                      <span className="text-[10.5px] text-ivory/50">
                        {t(line.variant)} · ×{line.qty}
                      </span>
                    </div>
                    <Money amount={line.unitPrice * line.qty} className="text-[12px]" />
                  </div>
                );
              })
            : null}

          <div className="flex flex-col gap-3 text-[12.5px]">
            <SummaryRow label={d.common.subtotal} value={<Money amount={totals.subtotal} />} />
            {totals.discount > 0 ? (
              <SummaryRow
                label={d.cart.promo}
                value={
                  <span className="text-brass">
                    −<Money amount={totals.discount} />
                  </span>
                }
              />
            ) : null}
            <SummaryRow label={d.common.delivery} value={<Money amount={totals.delivery} />} />
            <SummaryRow label={d.common.vat} value={<Money amount={totals.vat} />} />
          </div>
          <hr className="t-rule t-rule--dark" />
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em]">{d.common.total}</span>
            <Money amount={totals.total} className="text-[26px] sm:text-[29px]" />
          </div>
          <p className="text-[11.5px] leading-relaxed text-ivory/55">{d.checkout.questions}</p>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-ivory/55">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-ink/12 pt-3">
      <dt className="t-label">{label}</dt>
      <dd className="m-0 mt-1.5 text-[13px]">{value}</dd>
    </div>
  );
}
