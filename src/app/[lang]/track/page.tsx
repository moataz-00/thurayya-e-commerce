import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageShell } from "@/components/layout/PageShell";
import { TrackOrderView } from "@/components/commerce/TrackOrderView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.support.trackTitle, robots: { index: false } };
}

export default function TrackPage() {
  return (
    <PageShell>
      <TrackOrderView />
    </PageShell>
  );
}
