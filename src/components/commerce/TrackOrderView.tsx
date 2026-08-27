"use client";

import { useState } from "react";
import type { Order } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { ORDERS, getOrder } from "@/lib/mock";
import { Money } from "@/components/ui/Money";
import { TrackOrderForm } from "@/components/forms/ProjectForms";
import { Eyebrow } from "@/components/ui/primitives";

export function TrackOrderView() {
  const { d, t } = useLocale();
  const [order, setOrder] = useState<Order | null>(ORDERS[0]);
  const [error, setError] = useState(false);

  return (
    <section className="t-shell grid items-start gap-14 pb-28 pt-12 lg:grid-cols-[380px_1fr] lg:gap-18">
      <div className="flex flex-col gap-5">
        <Eyebrow>{d.support.kicker}</Eyebrow>
        <h1 className="t-display text-[34px] leading-[1.06] sm:text-[44px]">
          {d.support.trackTitle}
        </h1>
        <p className="max-w-[400px] text-[14px] leading-[1.9] text-body">{d.support.trackLede}</p>
        <TrackOrderForm
          onLookup={(reference) => {
            const found = getOrder(reference);
            setOrder(found ?? null);
            setError(!found);
          }}
        />
        {error ? <p className="text-[12.5px] text-danger">{d.support.trackNotFound}</p> : null}
      </div>

      {order ? (
        <div className="flex flex-col gap-6 border border-ink/14 p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-[26px]" style={{ fontFamily: "var(--font-display)" }}>
              {order.reference}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-brass">
              {t(order.statusLabel)}
            </span>
          </div>

          <div className="flex flex-col gap-3 border-t border-ink/12 pt-5">
            {order.lines.map((line) => (
              <div key={line.title.en} className="flex flex-wrap justify-between gap-4 text-[13px]">
                <span>
                  {t(line.title)}
                  <span className="text-muted"> · {t(line.variant)} · ×{line.qty}</span>
                </span>
                <Money amount={line.price * line.qty} />
              </div>
            ))}
          </div>

          <ol className="m-0 flex list-none flex-col gap-4 border-t border-ink/12 p-0 pt-5">
            {order.timeline.map((step) => (
              <li key={step.label.en} className="flex items-center gap-4 text-[13px]">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 flex-none rotate-45 border border-brass ${
                    step.done ? "bg-brass" : ""
                  }`}
                />
                <span className={step.done ? "text-ink" : "text-muted"}>{t(step.label)}</span>
                <span className="ms-auto text-[11.5px] text-muted">{t(step.date)}</span>
              </li>
            ))}
          </ol>

          <p className="text-[11.5px] text-muted">{d.common.mockNotice}</p>
        </div>
      ) : null}
    </section>
  );
}
