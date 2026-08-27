import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { CheckoutView } from "@/components/commerce/CheckoutView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.common.checkout, robots: { index: false } };
}

/** Checkout deliberately drops the header, footer and every exit link but one. */
export default function CheckoutPage() {
  return <CheckoutView />;
}
