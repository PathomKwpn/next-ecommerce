import Link from "next/link";

import { ProductGrid } from "@/features/products/components";
import type { Product } from "@/types";

interface ProductRailSectionProps {
  title: string;
  description: string;
  href: string;
  products: Product[];
}

export function ProductRailSection({
  title,
  description,
  href,
  products,
}: ProductRailSectionProps) {
  return (
    <section className="py-12">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <Link
          href={href}
          className="text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View all
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}

