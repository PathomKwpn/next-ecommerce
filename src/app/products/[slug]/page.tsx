import { notFound } from "next/navigation";

import { ProductDetailView } from "@/features/products/components";
import {
  getProductBySlug,
  getRecommendedProducts,
} from "@/services/products";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const recommendedProducts = await getRecommendedProducts(product.slug, 3);

  return (
    <ProductDetailView
      product={product}
      recommendedProducts={recommendedProducts}
    />
  );
}
