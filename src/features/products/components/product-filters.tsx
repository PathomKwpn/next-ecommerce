import Link from "next/link";

import {
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_GENDERS,
  PRODUCT_SIZES,
  PRODUCT_SORT_OPTIONS,
} from "@/constants/catalog";
import type { ProductFilters } from "@/types";

interface ProductFiltersProps {
  filters: ProductFilters;
}

export function ProductFilters({ filters }: ProductFiltersProps) {
  return (
    <form action="/products" className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium">
        Search
        <input
          name="search"
          defaultValue={filters.search}
          placeholder="Aero, Court, Pulse..."
          className="h-11 border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
        />
      </label>

      <FilterSelect
        label="Category"
        name="category"
        value={filters.category}
        options={PRODUCT_CATEGORIES}
      />
      <FilterSelect
        label="Gender"
        name="gender"
        value={filters.gender}
        options={PRODUCT_GENDERS}
      />
      <FilterSelect
        label="Size"
        name="size"
        value={filters.size}
        options={PRODUCT_SIZES}
      />
      <FilterSelect
        label="Color"
        name="color"
        value={filters.color}
        options={PRODUCT_COLORS}
      />
      <FilterSelect
        label="Sort"
        name="sort"
        value={filters.sort}
        options={PRODUCT_SORT_OPTIONS}
      />

      <input type="hidden" name="page" value="1" />
      <button className="h-11 bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-foreground/85">
        Apply Filters
      </button>
      <Link
        href="/products"
        className="text-center text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Reset
      </Link>
    </form>
  );
}

interface FilterSelectProps {
  label: string;
  name: string;
  value?: string;
  options: readonly string[];
}

function FilterSelect({ label, name, value, options }: FilterSelectProps) {
  return (
    <label className="grid gap-2 text-sm font-medium capitalize">
      {label}
      <select
        name={name}
        defaultValue={value ?? ""}
        className="h-11 border border-input bg-background px-3 text-sm capitalize outline-none transition-colors focus:border-ring"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
