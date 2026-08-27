import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { relatedProducts } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { CartView } from "@/components/commerce/CartView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.cart.title, robots: { index: false } };
}

export default function CartPage() {
  return (
    <PageShell>
      <CartView crossSell={relatedProducts("thurayya-seven-chandelier", 4)} />
    </PageShell>
  );
}
