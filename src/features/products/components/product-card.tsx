import Link from "next/link";

import { ProductMediaFrame } from "./product-media-frame";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ProductMediaFrame product={product} />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold leading-6 group-hover:underline group-hover:underline-offset-4">
              {product.name}
            </h3>
            <p className="mt-1 text-sm capitalize text-muted-foreground">
              {product.category} / {product.gender}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">${product.price}</p>
            {product.compareAtPrice ? (
              <p className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}

