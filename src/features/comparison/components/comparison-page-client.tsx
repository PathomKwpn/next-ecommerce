"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { useComparisonStore } from "@/store";

const comparisonRows = [
  { label: "Price", getValue: (item: ComparedItem) => `$${item.product.price}` },
  { label: "Category", getValue: (item: ComparedItem) => item.product.category },
  { label: "Gender", getValue: (item: ComparedItem) => item.product.gender },
  {
    label: "Colors",
    getValue: (item: ComparedItem) => item.product.colors.join(" / "),
  },
  {
    label: "Sizes",
    getValue: (item: ComparedItem) => item.product.sizes.join(" / "),
  },
  { label: "Rating", getValue: (item: ComparedItem) => String(item.product.rating) },
] as const;

type ComparedItem = ReturnType<typeof useComparisonStore.getState>["items"][number];

export function ComparisonPageClient() {
  const [mounted, setMounted] = useState(false);
  const items = useComparisonStore((state) => state.items);
  const removeItem = useComparisonStore((state) => state.removeItem);
  const clearComparison = useComparisonStore((state) => state.clearComparison);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ComparisonShell description="Loading persisted comparison state." />;
  }

  if (items.length === 0) {
    return (
      <ComparisonShell description="Compare saved product snapshots side by side.">
        <EmptyComparison />
      </ComparisonShell>
    );
  }

  return (
    <ComparisonShell description="Compare selected PATH models using local client state.">
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={clearComparison}
          className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Clear comparison
        </button>
      </div>
      <div className="overflow-x-auto border border-border bg-card">
        <table className="min-w-[720px] w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-36 border-b border-border p-4 text-left font-semibold">
                Product
              </th>
              {items.map((item) => (
                <th
                  key={item.productId}
                  className="border-b border-border p-4 text-left align-top"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="mt-2 block text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.label}>
                <th className="border-b border-border p-4 text-left font-semibold">
                  {row.label}
                </th>
                {items.map((item) => (
                  <td key={item.productId} className="border-b border-border p-4">
                    {row.getValue(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ComparisonShell>
  );
}

function ComparisonShell({
  description,
  children,
}: {
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-8">
        <h1 className="text-4xl font-semibold sm:text-6xl">Compare</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      {children ?? <div className="h-40 animate-pulse bg-muted" />}
    </div>
  );
}

function EmptyComparison() {
  return (
    <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold">No products selected</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Add products to comparison from any product detail page.
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

