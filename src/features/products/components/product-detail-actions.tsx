"use client";

import { useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  useCartStore,
  useComparisonStore,
  useWishlistStore,
} from "@/store";
import type { Product, ProductColor, ProductSize } from "@/types";

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0],
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [message, setMessage] = useState("");
  const addCartItem = useCartStore((state) => state.addItem);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const toggleComparisonItem = useComparisonStore((state) => state.toggleItem);
  const isCompared = useComparisonStore((state) => state.isCompared(product.id));

  function handleAddToCart() {
    if (!selectedSize) {
      setMessage("Choose a size before adding this product.");
      return;
    }

    addCartItem({
      product,
      color: selectedColor,
      size: selectedSize,
    });
    setMessage("Added to cart.");
  }

  function handleWishlistToggle() {
    toggleWishlistItem(product);
    setMessage(isWishlisted ? "Removed from wishlist." : "Saved to wishlist.");
  }

  function handleComparisonToggle() {
    toggleComparisonItem(product);
    setMessage(isCompared ? "Removed from comparison." : "Added to comparison.");
  }

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
          onClick={handleAddToCart}
          className={buttonVariants({
            size: "lg",
            className: "h-12 rounded-none",
          })}
        >
          Add To Cart / ${product.price}
        </button>
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 rounded-none",
            })}
          >
            {isWishlisted ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleComparisonToggle}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 rounded-none",
            })}
          >
            {isCompared ? "Comparing" : "Compare"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Selection: {selectedColor}
          {selectedSize ? ` / ${selectedSize}` : " / choose size"}
        </p>
        {message ? (
          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>{message}</span>
            <Link href="/cart" className="font-semibold text-foreground">
              View cart
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
