"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/provider";
import { routes } from "@/lib/routes";
import { PageShell } from "@/components/layout/PageShell";
import { Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  const { locale, d } = useLocale();

  return (
    <PageShell>
      <section className="t-shell flex min-h-[52vh] flex-col items-start justify-center gap-6 py-28">
        <Eyebrow>404</Eyebrow>
        <h1 className="t-display max-w-[620px] text-[38px] leading-[1.06] sm:text-[52px]">
          {d.notFound.title}
        </h1>
        <p className="max-w-[480px] text-[14.5px] leading-[1.9] text-body">{d.notFound.body}</p>
        <div className="mt-2 flex flex-wrap gap-3.5">
          <Link href={routes.home(locale)} className="t-btn t-btn--primary">
            {d.notFound.cta}
          </Link>
          <Link href={routes.lighting(locale)} className="t-btn t-btn--outline">
            {d.common.shopAll}
          </Link>
          <Link href={routes.consultation(locale)} className="t-btn t-btn--outline">
            {d.common.askExpert}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
