"use client";

import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { Product, ProductColor, ProductSize } from "@/types";

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0],
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  return (
    <div className="grid gap-6">
      <fieldset>
        <legend className="text-sm font-semibold">Color</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((variant) => {
            const isSelected = variant.color === selectedColor;

            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedColor(variant.color)}
                aria-pressed={isSelected}
                className="flex h-11 items-center gap-3 border border-border px-3 text-sm capitalize transition-colors hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
              >
                <span
                  className="size-4 border border-border"
                  style={{ backgroundColor: variant.colorHex }}
                  aria-hidden="true"
                />
                {variant.color}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold">Size</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {product.sizes.map((size) => {
            const isSelected = size === selectedSize;

            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={isSelected}
                className="h-11 border border-border text-sm font-semibold transition-colors hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
              >
                {size}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="sticky bottom-20 z-20 grid gap-3 border border-border bg-background/92 p-3 backdrop-blur md:bottom-4">
        <button
          type="button"
          className={buttonVariants({
            size: "lg",
            className: "h-12 rounded-none",
          })}
        >
          Add To Cart / ${product.price}
        </button>
        <p className="text-xs text-muted-foreground">
          Selection: {selectedColor}
          {selectedSize ? ` / ${selectedSize}` : " / choose size"}
        </p>
      </div>
    </div>
  );
}

