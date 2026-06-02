"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ProductMediaFrame } from "./product-media-frame";
import { useRecentlyViewedStore } from "@/store";
import type { Product, RecentlyViewedItem } from "@/types";

export function RecentlyViewedSection() {
  const [mounted, setMounted] = useState(false);
  const recentlyViewedItems = useRecentlyViewedStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || recentlyViewedItems.length <= 1) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-border pt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Recently Viewed</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Local browsing history stored in the client state layer.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recentlyViewedItems.slice(1, 5).map((item) => (
          <Link key={item.productId} href={`/products/${item.slug}`}>
            <ProductMediaFrame product={toProductLike(item)} />
            <h3 className="mt-3 font-semibold">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">${item.product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function toProductLike(item: RecentlyViewedItem): Product {
  return {
    id: item.product.productId,
    slug: item.product.slug,
    name: item.product.name,
    brand: item.product.brand,
    description: "",
    price: item.product.price,
    compareAtPrice: item.product.compareAtPrice,
    category: item.product.category,
    gender: item.product.gender,
    colors: item.product.colors,
    sizes: item.product.sizes,
    images: [
      { id: item.product.productId, src: item.product.image, alt: item.product.name },
    ],
    variants: [],
    rating: item.product.rating,
    reviewCount: item.product.reviewCount,
    isNew: false,
    isTrending: false,
    isFeatured: false,
    materials: [],
    createdAt: item.viewedAt,
    updatedAt: item.viewedAt,
  };
}
