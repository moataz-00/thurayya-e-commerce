import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { PRODUCTS, alsoLike, getProduct, relatedProducts } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ProductDetail } from "@/components/commerce/ProductDetail";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => PRODUCTS.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.title[locale],
    description: product.summary[locale],
    openGraph: {
      title: product.title[locale],
      description: product.summary[locale],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <ProductDetail
        product={product}
        crossSell={relatedProducts(slug, 4)}
        alsoLike={alsoLike(slug, 4)}
      />
    </PageShell>
  );
}
