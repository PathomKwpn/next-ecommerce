import { ProductListingView } from "@/features/products/components";
import { productFiltersSchema } from "@/lib/validations/products";
import { getProducts } from "@/services/products";

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = productFiltersSchema.parse(normalizeSearchParams(resolvedSearchParams));
  const products = await getProducts(filters);

  return <ProductListingView filters={filters} products={products} />;
}

function normalizeSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
) {
  return Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
}

