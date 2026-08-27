import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageShell } from "@/components/layout/PageShell";
import { AccountView } from "@/components/account/AccountView";
import { ACCOUNT_SECTIONS, type AccountSection } from "@/lib/account-sections";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => ACCOUNT_SECTIONS.map((section) => ({ lang, section })));
}

function isSection(value: string): value is AccountSection {
  return (ACCOUNT_SECTIONS as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}): Promise<Metadata> {
  const { lang, section } = await params;
  const d = getDictionary(coerceLocale(lang));
  const title = isSection(section) ? d.account.nav[section] : d.nav.account;
  return { title, robots: { index: false } };
}

export default async function AccountSectionPage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  return (
    <PageShell>
      <AccountView section={section} />
    </PageShell>
  );
}
