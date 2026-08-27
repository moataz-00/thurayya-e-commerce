"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/provider";
import { CheckRow, QuantityStepper, RadioRow, SelectField, TextField } from "@/components/ui/form";
import { MonoLabel, StatusPill } from "@/components/ui/primitives";

/**
 * The interactive half of the style guide: buttons, fields, controls and
 * feedback surfaces, all rendered from the same classes production uses.
 */
export function StyleGuideControls() {
  const { d, isRtl } = useLocale();
  const [qty, setQty] = useState(1);
  const [ready, setReady] = useState(true);
  const [dimmable, setDimmable] = useState(false);
  const [virtual, setVirtual] = useState(true);
  const [ship, setShip] = useState(isRtl ? "الشحن إلى مصر" : "Ship to Egypt");
  const [chips, setChips] = useState(
    isRtl ? ["نحاس", "غرفة الطعام"] : ["Brass", "Dining Room"],
  );

  return (
    <>
      {/* ========================================================== buttons */}
      <section className="flex flex-col gap-6">
        <MonoLabel className="text-brass">{d.styleGuide.buttons}</MonoLabel>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="t-panel flex flex-col gap-4 p-8">
            <MonoLabel className="text-muted">PRIMARY / SECONDARY</MonoLabel>
            <button type="button" className="t-btn t-btn--primary">
              {d.common.addToBag}
            </button>
            <button type="button" className="t-btn t-btn--outline">
              {d.common.addToWishlist}
            </button>
            <button type="button" className="t-btn" disabled>
              {isRtl ? "غير متاح" : "Disabled"}
            </button>
          </div>

          <div className="flex flex-col gap-4 bg-onyx p-8">
            <MonoLabel className="text-ivory/40">ON DARK / BRASS / LOADING</MonoLabel>
            <button type="button" className="t-btn t-btn--brass">
              {d.common.bookConsultation}
            </button>
            <button type="button" className="t-btn t-btn--ghost">
              {d.home.heroCta1}
            </button>
            <button
              type="button"
              className="t-btn border-ivory/20 bg-transparent text-ivory/60"
              aria-busy="true"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full border border-brass border-t-transparent"
                style={{ animation: "tSpin 1.1s linear infinite" }}
              />
              {isRtl ? "جارٍ المعالجة" : "Processing"}
            </button>
          </div>

          <div className="t-panel flex flex-col gap-3.5 p-8">
            <MonoLabel className="text-muted">TEXT LINK / STATUS PILLS</MonoLabel>
            <span className="t-link self-start">{d.common.shopAll}</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              <StatusPill availability="ready-to-ship" />
              <StatusPill availability="made-to-order" />
              <StatusPill availability="limited-edition" />
              <StatusPill availability="pre-order" />
            </div>
            <div className="mt-3.5 flex flex-col gap-2">
              <MonoLabel className="text-muted">FOCUS RING</MonoLabel>
              <button
                type="button"
                className="t-btn t-btn--primary self-start"
                style={{ outline: "2px solid var(--color-brass)", outlineOffset: "3px" }}
              >
                {isRtl ? "تركيز لوحة المفاتيح" : "Keyboard focus"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ forms */}
      <section className="flex flex-col gap-6">
        <MonoLabel className="text-brass">{d.styleGuide.forms}</MonoLabel>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <TextField
            label={d.common.fullName}
            placeholder="Layla Hassan"
            hint={isRtl ? "الحالة الافتراضية" : "Default"}
          />
          <TextField label={d.common.email} defaultValue="layla@studio.eg" hint="Focused" />
          <TextField
            label={d.common.phone}
            defaultValue="+20 1"
            error={isRtl ? "أدخل رقم هاتف صحيح" : "Enter a valid mobile number"}
          />
          <TextField label={d.common.company} defaultValue="—" disabled hint="Disabled" />
        </div>

        <div className="mt-2 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3.5">
            <MonoLabel className="text-muted">CHECKBOX / RADIO</MonoLabel>
            <CheckRow checked={ready} onChange={setReady}>
              {d.availability["ready-to-ship"]}
            </CheckRow>
            <CheckRow checked={dimmable} onChange={setDimmable}>
              {isRtl ? "قابل للتعتيم" : "Dimmable"}
            </CheckRow>
            <RadioRow checked={virtual} onChange={() => setVirtual(!virtual)}>
              <span className="text-[13px]">{isRtl ? "موعد افتراضي" : "Virtual appointment"}</span>
            </RadioRow>
          </div>

          <div className="flex flex-col gap-3.5">
            <MonoLabel className="text-muted">QUANTITY / SELECT</MonoLabel>
            <QuantityStepper value={qty} onChange={setQty} />
            <SelectField
              label={d.common.delivery}
              value={ship}
              onChange={setShip}
              options={
                isRtl
                  ? ["الشحن إلى مصر", "الشحن إلى الإمارات", "الشحن إلى السعودية"]
                  : ["Ship to Egypt", "Ship to UAE", "Ship to Saudi Arabia"]
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <MonoLabel className="text-muted">FILTER CHIPS</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setChips((c) => c.filter((x) => x !== chip))}
                  className="flex cursor-pointer items-center gap-2.5 border border-ink bg-transparent px-3 py-2 text-[11px]"
                >
                  {chip}
                  <span aria-hidden className="text-brass">
                    ×
                  </span>
                </button>
              ))}
              <span className="border border-ink/20 px-3 py-2 text-[11px] text-muted">
                + {d.pdp.finish}
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-2.5">
              <MonoLabel className="text-muted">SKELETON</MonoLabel>
              <span className="t-skeleton block h-2.5 w-full" />
              <span className="t-skeleton block h-2.5 w-[70%]" />
              <span className="t-skeleton block h-2.5 w-[40%]" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <MonoLabel className="text-muted">TOAST / COOKIE / EMPTY</MonoLabel>
            <div className="flex items-center gap-3 bg-onyx px-4 py-3.5 text-[12px] text-ivory">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass" />
              {d.common.added}
            </div>
            <div className="border border-ink/15 px-4 py-3.5 text-[11.5px] leading-[1.7] text-body">
              {isRtl
                ? "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. "
                : "We use cookies to refine your experience. "}
              <span className="text-brass">{isRtl ? "قبول" : "Accept"}</span> ·{" "}
              <span>{isRtl ? "إدارة" : "Manage"}</span>
            </div>
            <div
              className="border border-dashed border-ink/20 p-5 text-center text-[18px] text-muted"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {d.common.empty}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
