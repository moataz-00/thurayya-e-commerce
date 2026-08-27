import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageShell } from "@/components/layout/PageShell";
import { AccountView } from "@/components/account/AccountView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.nav.account, robots: { index: false } };
}

export default function AccountPage() {
  return (
    <PageShell>
      <AccountView section="dashboard" />
    </PageShell>
  );
}
