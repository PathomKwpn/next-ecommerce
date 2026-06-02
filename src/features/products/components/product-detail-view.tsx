import Link from "next/link";

import { ProductDetailActions } from "./product-detail-actions";
import { ProductGrid } from "./product-grid";
import { ProductMediaFrame } from "./product-media-frame";
import { RecentlyViewedSection } from "./recently-viewed-section";
import { RecentlyViewedTracker } from "./recently-viewed-tracker";
import type { Product } from "@/types";

interface ProductDetailViewProps {
  product: Product;
  recommendedProducts: Product[];
}

export function ProductDetailView({
  product,
  recommendedProducts,
}: ProductDetailViewProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <RecentlyViewedTracker product={product} />
      <Link
        href="/products"
        className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Back to products
      </Link>

      <section className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ProductMediaFrame product={product} />
          </div>
          <ProductMediaFrame product={product} />
          <ProductMediaFrame product={product} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl font-semibold">${product.price}</p>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-3 border-y border-border py-4 text-sm">
            <div>
              <p className="font-semibold">{product.rating}</p>
              <p className="text-muted-foreground">Rating</p>
            </div>
            <div>
              <p className="font-semibold">{product.reviewCount}</p>
              <p className="text-muted-foreground">Reviews</p>
            </div>
            <div>
              <p className="font-semibold capitalize">{product.category}</p>
              <p className="text-muted-foreground">Category</p>
            </div>
          </div>

          <div className="mt-6">
            <ProductDetailActions product={product} />
          </div>

          <section className="mt-8">
            <h2 className="font-semibold">Product Information</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {product.materials.map((material) => (
                <li key={material}>- {material}</li>
              ))}
            </ul>
          </section>
        </aside>
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Recommended Products</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Related picks based on catalog signals.
            </p>
          </div>
        </div>
        <ProductGrid products={recommendedProducts} />
      </section>
      <RecentlyViewedSection />
    </div>
  );
}
