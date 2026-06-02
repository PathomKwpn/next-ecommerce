import { ProductCard } from "./product-card";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Try removing a filter or searching for a different model.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

