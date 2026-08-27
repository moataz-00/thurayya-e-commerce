import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageShell } from "@/components/layout/PageShell";
import { ConsultationBooking } from "@/components/forms/ConsultationBooking";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.consultation.title, description: d.consultation.lede };
}

export default function ConsultationPage() {
  return (
    <PageShell>
      <ConsultationBooking />
    </PageShell>
  );
}
