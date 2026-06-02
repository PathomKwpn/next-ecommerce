"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { useCartStore, useWishlistStore } from "@/store";

export function WishlistPageClient() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addSnapshotItem = useCartStore((state) => state.addSnapshotItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <WishlistShell description="Loading persisted wishlist state." />;
  }

  if (items.length === 0) {
    return (
      <WishlistShell description="Saved products will appear here.">
        <EmptyWishlist />
      </WishlistShell>
    );
  }

  return (
    <WishlistShell description="Saved products are stored locally and can sync to a server later.">
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={clearWishlist}
          className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Clear wishlist
        </button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.productId} className="border border-border bg-card p-4">
            <div className="grid aspect-[4/5] place-items-center bg-muted text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Asset frame
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/products/${item.slug}`}
                  className="font-semibold underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm capitalize text-muted-foreground">
                  {item.category}
                </p>
              </div>
              <p className="font-semibold">${item.price}</p>
            </div>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={() => {
                  const snapshot = toCommerceSnapshot(item);
                  addSnapshotItem({
                    product: snapshot,
                    color: snapshot.colors[0],
                    size: snapshot.sizes[0],
                  });
                  removeItem(item.productId);
                }}
                className={buttonVariants({
                  size: "lg",
                  className: "h-11 rounded-none",
                })}
              >
                Move To Cart
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="h-10 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </WishlistShell>
  );
}

function toCommerceSnapshot(
  item: ReturnType<typeof useWishlistStore.getState>["items"][number],
) {
  return item.product;
}

function WishlistShell({
  description,
  children,
}: {
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-8">
        <h1 className="text-4xl font-semibold sm:text-6xl">Wishlist</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      {children ?? <div className="h-40 animate-pulse bg-muted" />}
    </div>
  );
}

function EmptyWishlist() {
  return (
    <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold">No saved products</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Save products from a product detail page to build a wishlist.
      </p>
      <Link
        href="/products"
        className={buttonVariants({
          size: "lg",
          className: "mt-6 h-12 rounded-none px-7",
        })}
      >
        Browse products
      </Link>
    </div>
  );
}
