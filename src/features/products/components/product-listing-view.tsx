import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ProductPagination } from "./product-pagination";
import type { PaginatedResult, Product, ProductFilters as Filters } from "@/types";

interface ProductListingViewProps {
  products: PaginatedResult<Product>;
  filters: Filters;
}

export function ProductListingView({ products, filters }: ProductListingViewProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Product catalog
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">
            Shop PATH
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Search, filter, and sort products through the same service layer that
            will later connect to a production database.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {products.total} products / page {products.page} of {products.totalPages}
        </p>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-border bg-card p-4">
            <ProductFilters filters={filters} />
          </div>
        </aside>

        <section>
          <details className="mb-6 border border-border bg-card p-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold">
              Filters and sorting
            </summary>
            <div className="mt-4">
              <ProductFilters filters={filters} />
            </div>
          </details>

          <ProductGrid products={products.items} />
          <ProductPagination
            filters={filters}
            page={products.page}
            totalPages={products.totalPages}
          />
        </section>
      </div>
    </div>
  );
}

