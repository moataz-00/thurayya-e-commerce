import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { CUSTOMER } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { TextField } from "@/components/ui/form";
import { Eyebrow } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.checkout.signIn, robots: { index: false } };
}

export default async function SignInPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <PageShell>
      <section className="t-shell grid items-stretch gap-14 pb-28 pt-14 lg:grid-cols-2 lg:gap-18">
        <div className="flex max-w-[440px] flex-col gap-6">
          <Eyebrow>{d.nav.account}</Eyebrow>
          <h1 className="t-display text-[34px] leading-[1.06] sm:text-[44px]">
            {d.account.signInTitle}
          </h1>

          <div className="flex flex-col gap-5">
            <TextField label={d.common.email} type="email" defaultValue={CUSTOMER.email} />
            <TextField label={d.account.password} type="password" defaultValue="••••••••••" />
          </div>

          <div className="flex flex-wrap gap-3.5">
            <Link href={routes.account(locale)} className="t-btn t-btn--primary">
              {d.checkout.signIn}
            </Link>
            <Link href={routes.account(locale)} className="t-btn t-btn--outline">
              {d.account.createAccount}
            </Link>
          </div>

          <span className="text-[11.5px] text-brass">{d.account.forgot}</span>
          <p className="mt-2 text-[11.5px] leading-relaxed text-muted">{d.common.mockNotice}</p>
        </div>

        <div className="relative min-h-[360px] bg-onyx">
          <div className="absolute inset-0 opacity-25">
            <ShotSlot
              dark
              showLabel={false}
              label={{
                en: "account — chandelier detail at dusk",
                ar: "الحساب — تفصيل ثريا عند الغروب",
              }}
            />
          </div>
          <div className="t-glow left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2" />
          <div className="absolute inset-x-8 bottom-8 flex flex-col gap-2.5 text-ivory">
            <span className="t-label text-brass">{d.brand.name}</span>
            <span className="text-[26px]" style={{ fontFamily: "var(--font-display)" }}>
              {d.home.newsTitle}
            </span>
            <span className="max-w-[360px] text-[12.5px] leading-relaxed text-ivory/60">
              {d.home.newsBody}
            </span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
