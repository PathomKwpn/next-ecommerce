import type { CommerceProductSnapshot, Product } from "@/types";

export function createProductSnapshot(product: Product): CommerceProductSnapshot {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    image: product.images[0]?.src ?? "",
    category: product.category,
    gender: product.gender,
    colors: product.colors,
    sizes: product.sizes,
    rating: product.rating,
    reviewCount: product.reviewCount,
  };
}

