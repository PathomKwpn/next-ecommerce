import Link from "next/link";

import type { ProductFilters } from "@/types";

interface ProductPaginationProps {
  filters: ProductFilters;
  page: number;
  totalPages: number;
}

export function ProductPagination({
  filters,
  page,
  totalPages,
}: ProductPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, index) => {
        const nextPage = index + 1;
        const isActive = nextPage === page;

        return (
          <Link
            key={nextPage}
            href={`/products?${createProductSearchParams(filters, nextPage)}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "grid size-10 place-items-center bg-foreground text-sm font-semibold text-background"
                : "grid size-10 place-items-center border border-border text-sm font-semibold hover:bg-muted"
            }
          >
            {nextPage}
          </Link>
        );
      })}
    </nav>
  );
}

function createProductSearchParams(filters: ProductFilters, page: number) {
  const params = new URLSearchParams();

  Object.entries({ ...filters, page }).forEach(([key, value]) => {
    if (value) {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

